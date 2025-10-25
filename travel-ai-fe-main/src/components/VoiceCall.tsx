import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Phone, PhoneOff, Volume2, VolumeX, X, Loader2 } from 'lucide-react';
import { vapiService } from '@/lib/vapi';
import { useToast } from "@/hooks/use-toast";

interface VoiceCallProps {
  onMessage?: (message: string, isUser: boolean) => void;
  className?: string;
}

export const VoiceCall: React.FC<VoiceCallProps> = ({ onMessage, className }) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isStartingCall, setIsStartingCall] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [callStartTime, setCallStartTime] = useState<Date | null>(null);
  const [showCallOverlay, setShowCallOverlay] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Create unique callback functions to avoid duplicates
    const handleCallStart = () => {
      setIsCallActive(true);
      setIsStartingCall(false); // Reset starting state when call actually starts
      setShowCallOverlay(true);
      setCallStartTime(new Date());
      toast({
        title: "Call Started",
        description: "Voice conversation has begun. You can speak now!",
      });
    };

    const handleCallEnd = () => {
      // Check if this was an unexpected ending
      if (isCallActive && callStartTime) {
        const callDuration = Date.now() - callStartTime.getTime();
        if (callDuration < 10000) { // Less than 10 seconds
          console.warn('⚠️ Call ended very quickly - this might be an issue');
          toast({
            title: "Call Ended Unexpectedly",
            description: "The call ended very quickly. Please try again.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Call Ended",
            description: "Voice conversation has ended.",
          });
        }
      }
      
      setIsCallActive(false);
      setIsStartingCall(false); // Reset starting state if call ends unexpectedly
      setShowCallOverlay(false);
      setIsUserSpeaking(false);
      setCallStartTime(null);
      setCallDuration(0);
    };

    const handleSpeechStart = () => {
      setIsUserSpeaking(true);
      
      // Ensure call stays active when user speaks
      if (!vapiService.isActive()) {
        console.warn('⚠️ Call became inactive during speech - this is a problem!');
      }
    };

    const handleSpeechEnd = () => {
      setIsUserSpeaking(false);
      
      // Double-check call is still active after speech
      setTimeout(() => {
        if (!vapiService.isActive() && isCallActive) {
          console.error('🚨 Call ended after user speech - this should not happen!');
          toast({
            title: "Problem Detected",
            description: "The call ended after you spoke. Please try starting a new call.",
            variant: "destructive"
          });
        }
      }, 1000); // Check after 1 second
    };

    const handleVolumeLevel = (volume: number) => {
      setVolumeLevel(volume);
    };

    const handleMessage = (message: any) => {
      if (onMessage) {
        // Handle different message types
        if (message.type === 'transcript' && message.transcript) {
          onMessage(message.transcript, message.role === 'user');
        } else if (message.type === 'function-call' && message.functionCall) {
          // Handle function calls if needed
        } else if (message.type === 'conversation-update' && message.conversation) {
          // Handle conversation updates
          const lastMessage = message.conversation[message.conversation.length - 1];
          if (lastMessage && lastMessage.content) {
            onMessage(lastMessage.content, lastMessage.role === 'user');
          }
        }
      }
    };

    const handleError = (error: any) => {
      console.error('💥 VoiceCall: Error received:', error);
      toast({
        title: "Call Error",
        description: error.message || "An error occurred during the voice call.",
        variant: "destructive"
      });
    };

    // Set up event listeners
    vapiService.onCallStart(handleCallStart);
    vapiService.onCallEnd(handleCallEnd);
    vapiService.onSpeechStart(handleSpeechStart);
    vapiService.onSpeechEnd(handleSpeechEnd);
    vapiService.onVolumeLevel(handleVolumeLevel);
    vapiService.onMessage(handleMessage);
    vapiService.onError(handleError);

    return () => {
      // Only cleanup if component is actually unmounting, not just re-rendering
      // We'll check if there's an active call and if the component is really being destroyed
    };
  }, []); // Remove dependencies to prevent re-execution

  // Separate useEffect for managing body scroll when overlay is active
  useEffect(() => {
    if (showCallOverlay) {
      // Prevent body scroll when overlay is active and eliminate gaps
      document.body.classList.add('call-overlay-active');
      document.documentElement.style.margin = '0';
      document.documentElement.style.padding = '0';
      document.documentElement.style.overflow = 'hidden';
    } else {
      // Restore body scroll when overlay is closed
      document.body.classList.remove('call-overlay-active');
      document.documentElement.style.margin = '';
      document.documentElement.style.padding = '';
      document.documentElement.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('call-overlay-active');
      document.documentElement.style.margin = '';
      document.documentElement.style.padding = '';
      document.documentElement.style.overflow = '';
    };
  }, [showCallOverlay]);

  // Separate useEffect for call stability monitoring
  useEffect(() => {
    let keepAliveInterval: NodeJS.Timeout;
    
    if (isCallActive) {
      // Set up a keep-alive mechanism to prevent automatic call ending
      keepAliveInterval = setInterval(() => {
        if (vapiService.isActive()) {
          vapiService.preventAutoEnd();
        } else {
          console.warn('⚠️ Call is no longer active, clearing keep-alive');
          clearInterval(keepAliveInterval);
        }
      }, 30000); // Check every 30 seconds
    }
    
    return () => {
      if (keepAliveInterval) {
        clearInterval(keepAliveInterval);
      }
    };
  }, [isCallActive]);

  // Separate useEffect for cleanup on unmount only
  useEffect(() => {
    return () => {
      // This will only run when component actually unmounts
      if (vapiService.isActive()) {
        vapiService.endCall();
      }
    };
  }, []); // Empty dependency array ensures this only runs on mount/unmount

  // Update call duration
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive && callStartTime) {
      interval = setInterval(() => {
        const now = new Date();
        const duration = Math.floor((now.getTime() - callStartTime.getTime()) / 1000);
        setCallDuration(duration);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCallActive, callStartTime]);

  const handleStartCall = async () => {
    if (isStartingCall || isCallActive) {
      return; // Prevent multiple calls
    }

    setIsStartingCall(true);
    
    // Set a timeout to reset isStartingCall if call doesn't start within 10 seconds
    const startTimeout = setTimeout(() => {
      if (isStartingCall && !isCallActive) {
        setIsStartingCall(false);
        toast({
          title: "Connection Timeout",
          description: "Failed to connect to the AI assistant. Please try again.",
          variant: "destructive"
        });
      }
    }, 10000);
    
    try {
      // Test microphone access first
      const microphoneWorking = await vapiService.testMicrophone();
      if (!microphoneWorking) {
        clearTimeout(startTimeout);
        toast({
          title: "Permission Required",
          description: "Please allow access to your microphone to start the voice call.",
          variant: "destructive"
        });
        setIsStartingCall(false);
        return;
      }

      await vapiService.startCall();
      // Note: isStartingCall will be set to false in handleCallStart callback
      // Clear timeout since call started successfully
      clearTimeout(startTimeout);
    } catch (error) {
      clearTimeout(startTimeout);
      console.error('💥 VoiceCall: Failed to start call:', error);
      setIsStartingCall(false);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to start the voice call. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleEndCall = async () => {
    try {
      await vapiService.endCall();
    } catch (error) {
      console.error('💥 VoiceCall: Failed to end call:', error);
      toast({
        title: "Error",
        description: "Failed to end the voice call.",
        variant: "destructive"
      });
    }
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    vapiService.setMuted(newMutedState);
    
    toast({
      title: newMutedState ? "Microphone Deactivated" : "Microphone Activated",
      description: newMutedState ? "Microphone has been deactivated" : "Microphone has been activated",
    });
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getVolumeIcon = () => {
    if (isMuted || volumeLevel === 0) return <VolumeX className="w-4 h-4" />;
    return <Volume2 className="w-4 h-4" />;
  };

  // Sound wave animation component
  const SoundWave = ({ isActive, volume }: { isActive: boolean, volume: number }) => {
    const bars = Array.from({ length: 5 }, (_, i) => i);
    
    return (
      <div className="flex items-center justify-center space-x-1 h-12">
        {bars.map((bar) => (
          <div
            key={bar}
            className={`bg-gradient-to-t from-blue-500 to-purple-500 rounded-full transition-all duration-200 ${
              isActive ? 'speaking-wave' : 'sound-wave-bar'
            }`}
            style={{
              width: '4px',
              height: isActive 
                ? `${16 + (volume * 20) + (Math.sin(Date.now() / 200 + bar) * 8)}px` 
                : '8px',
              animationDelay: `${bar * 100}ms`,
              minHeight: '8px',
              maxHeight: '40px'
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <Card className={`${className} border-2 ${isCallActive ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
        <CardContent className="p-4">
          <div className="flex flex-col items-center space-y-4">
            {/* Call Status */}
            <div className="text-center">
              <h3 className="font-semibold text-lg">
                {isCallActive ? 'Call Active' : 'Voice Call'}
              </h3>
              {isCallActive && (
                <p className="text-sm text-gray-600">
                  Duration: {formatDuration(callDuration)}
                </p>
              )}
            </div>

            {/* Visual Feedback */}
            {isCallActive && (
              <div className="flex items-center space-x-4">
                {/* Microphone Status */}
                <div className={`p-3 rounded-full ${isUserSpeaking ? 'bg-red-100 border-red-300' : 'bg-gray-100 border-gray-300'} border-2`}>
                  {isUserSpeaking ? (
                    <Mic className="w-6 h-6 text-red-600" />
                  ) : (
                    <MicOff className="w-6 h-6 text-gray-600" />
                  )}
                </div>

                {/* Volume Level Indicator */}
                <div className="flex items-center space-x-1">
                  {getVolumeIcon()}
                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-150"
                      style={{ width: `${Math.min(volumeLevel * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Call Controls */}
            <div className="flex space-x-3">
              {!isCallActive ? (
                <Button
                  onClick={handleStartCall}
                  disabled={isStartingCall}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-full flex items-center space-x-2 transition-all duration-200"
                >
                  {isStartingCall ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <Phone className="w-5 h-5" />
                      <span>Start Call</span>
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleEndCall}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full flex items-center space-x-2"
                >
                  <PhoneOff className="w-5 h-5" />
                  <span>End Call</span>
                </Button>
              )}
            </div>

            {/* Instructions */}
            {!isCallActive && !isStartingCall && (
              <p className="text-sm text-gray-600 text-center max-w-xs">
                Tap to start a voice conversation with the AI assistant for trip planning.
              </p>
            )}

            {isStartingCall && (
              <div className="text-center">
                <p className="text-sm text-blue-600 font-medium animate-pulse">
                  🔄 Connecting to AI Assistant...
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Please wait while we establish the connection
                </p>
              </div>
            )}

            {isCallActive && (
              <div className="text-center">
                <p className="text-sm text-green-600 font-medium">
                  🎤 Speak with the AI Assistant
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  The AI assistant can help you plan the perfect trip
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Call Overlay Animation - Full Screen Blur */}
      {showCallOverlay && (
        <div 
          className="fixed bg-black/70 backdrop-blur-lg z-[9999] flex items-center justify-center call-overlay-enter overflow-hidden"
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            margin: 0,
            padding: 0
          }}
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl max-w-sm w-full mx-4 text-center relative border border-white/20 shadow-black/20 max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setShowCallOverlay(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100/80 transition-all duration-200 z-10 backdrop-blur-sm border border-gray-200/50"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Avatar/Profile */}
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 relative voice-pulse shadow-lg">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-inner">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    AI
                  </span>
                </div>
                
                {/* Pulsing ring animations */}
                <div className="absolute inset-0 rounded-full border-4 border-blue-400/60 voice-ring-1"></div>
                <div className="absolute inset-2 rounded-full border-2 border-purple-400/60 voice-ring-2"></div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                Trajecta AI Assistant
              </h3>
              <p className="text-sm text-gray-600">
                Call Active • {formatDuration(callDuration)}
              </p>
            </div>

            {/* Sound Wave Animation */}
            <div className="mb-8">
              <SoundWave isActive={isUserSpeaking} volume={volumeLevel} />
              <p className="text-sm text-gray-600 mt-3 transition-all duration-300">
                {isUserSpeaking ? (
                  <span className="text-red-600 font-medium animate-pulse">🎤 Speaking...</span>
                ) : (
                  <span className="text-blue-600">👂 Listening...</span>
                )}
              </p>
            </div>

            {/* Status indicator */}
            <div className="mt-6 flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
              <span className="text-xs text-gray-600 font-medium">Connected and Functional</span>
            </div>

            {/* Volume indicator */}
            {volumeLevel > 0 && (
              <div className="mt-4 flex items-center justify-center space-x-2">
                <Volume2 className="w-4 h-4 text-blue-500" />
                <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-150 rounded-full"
                    style={{ width: `${Math.min(volumeLevel * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}; 