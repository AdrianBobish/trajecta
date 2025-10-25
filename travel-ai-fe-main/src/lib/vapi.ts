import Vapi from "@vapi-ai/web";

// Vapi configuration
const VAPI_PUBLIC_KEY = "6c74a9b2-a9a9-48a5-a9cf-635cea420fca";
const ASSISTANT_ID = "8cca1dbc-2b80-46dd-ba11-e7284a8e2156";

export class VapiService {
  private vapi: Vapi;
  private isCallActive: boolean = false;
  private currentCall: any = null;
  private eventListenersSetup: boolean = false;
  private callStartCallbacks: (() => void)[] = [];
  private callEndCallbacks: (() => void)[] = [];
  private messageCallbacks: ((message: any) => void)[] = [];
  private errorCallbacks: ((error: any) => void)[] = [];
  private speechStartCallbacks: (() => void)[] = [];
  private speechEndCallbacks: (() => void)[] = [];
  private volumeLevelCallbacks: ((volume: number) => void)[] = [];

  constructor() {
    this.vapi = new Vapi(VAPI_PUBLIC_KEY);
    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (this.eventListenersSetup) {
      return;
    }

    // Call started
    this.vapi.on('call-start', () => {
      this.isCallActive = true;
      this.callStartCallbacks.forEach(callback => callback());
    });

    // Call ended - with better debugging
    this.vapi.on('call-end', (data?: any) => {
      // Check if this was an unexpected ending
      if (data && data.reason) {
        // If the call ended due to user speech detection issues, log it
        if (data.reason === 'customer-ended-call' && this.isCallActive) {
          console.warn('⚠️ Call ended unexpectedly - this might be a speech detection issue');
        }
      }
      
      this.isCallActive = false;
      this.currentCall = null;
      this.callEndCallbacks.forEach(callback => callback());
    });

    // Speech started (user started speaking) - with better handling
    this.vapi.on('speech-start', () => {
      this.speechStartCallbacks.forEach(callback => callback());
    });

    // Speech ended (user stopped speaking) - with better handling
    this.vapi.on('speech-end', () => {
      this.speechEndCallbacks.forEach(callback => callback());
    });

    // Message received from assistant - with filtering
    this.vapi.on('message', (message: any) => {
      // Check for error messages that might cause call to end
      if (message.type === 'error') {
        console.error('🚨 Error message received:', message);
        
        // Don't automatically end call on certain errors
        if (message.error && message.error.includes('speech')) {
          console.warn('⚠️ Speech-related error detected, but keeping call active');
        }
      }
      
      this.messageCallbacks.forEach(callback => callback(message));
    });

    // Error handling - improved
    this.vapi.on('error', (error: any) => {
      console.error('❌ Vapi error:', error);
      
      // Don't automatically end call on certain errors
      if (error.message) {
        if (error.message.includes('microphone') || error.message.includes('audio')) {
          console.warn('⚠️ Audio/microphone error detected, but keeping call active');
        } else if (error.message.includes('network') || error.message.includes('connection')) {
          console.warn('⚠️ Network error detected, but keeping call active');
        } else {
          console.error('🚨 Serious error that might affect call:', error);
        }
      }
      
      this.errorCallbacks.forEach(callback => callback(error));
    });

    // Volume level updates - with throttling
    let lastVolumeUpdate = 0;
    this.vapi.on('volume-level', (volume: number) => {
      // Throttle volume updates to prevent spam
      const now = Date.now();
      if (now - lastVolumeUpdate > 100) { // Update max every 100ms
        this.volumeLevelCallbacks.forEach(callback => callback(volume));
        lastVolumeUpdate = now;
      }
    });

    this.eventListenersSetup = true;
  }

  async startCall(): Promise<any> {
    try {
      if (this.isCallActive) {
        console.warn('⚠️ Call is already active');
        return this.currentCall;
      }

      // Check if browser supports required features
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Browser does not support microphone access');
      }

      try {
        // First try with the provided assistant ID
        this.currentCall = await this.vapi.start(ASSISTANT_ID);
      } catch (assistantError) {
        console.warn('⚠️ Failed to start call with assistant ID, trying inline assistant configuration...');
        console.error('Assistant ID error:', assistantError);
        
        // Fallback: try with inline assistant configuration
        const inlineAssistant = {
          model: {
            provider: "openai" as const,
            model: "gpt-3.5-turbo" as const,
            messages: [
              {
                role: "system" as const,
                content: "You are a helpful travel planning assistant. Help users plan their trips and answer travel-related questions in English."
              }
            ]
          },
          voice: {
            provider: "11labs" as const,
            voiceId: "paula"
          },
          firstMessage: "Hello! I'm your AI travel planning assistant. How can I help you today?"
        };
        
        this.currentCall = await this.vapi.start(inlineAssistant);
      }
      
      // Wait a bit to ensure call is properly established
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!this.isCallActive) {
        console.warn('⚠️ Call may not have started properly, checking status...');
      }
      
      return this.currentCall;
    } catch (error) {
      console.error('💥 Failed to start call:', error);
      
      // Provide more specific error information
      if (error instanceof Error) {
        if (error.message.includes('Permission denied')) {
          throw new Error('Microphone permission denied. Please allow microphone access and try again.');
        } else if (error.message.includes('assistant')) {
          throw new Error('Assistant configuration error. Please check the assistant ID.');
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          throw new Error('Network error. Please check your internet connection.');
        } else if (error.message.includes('400')) {
          throw new Error('Invalid request. Please check your Vapi configuration.');
        }
      }
      
      throw error;
    }
  }

  async endCall(): Promise<void> {
    try {
      if (!this.isCallActive) {
        console.warn('⚠️ No active call to end');
        return;
      }

      await this.vapi.stop();
    } catch (error) {
      console.error('💥 Failed to end call:', error);
      throw error;
    }
  }

  isActive(): boolean {
    return this.isCallActive;
  }

  getCurrentCall(): any {
    return this.currentCall;
  }

  // Method to send a message during the call
  sendMessage(message: string): void {
    if (this.isCallActive && this.vapi) {
      this.vapi.send({
        type: 'add-message',
        message: {
          role: 'user',
          content: message
        }
      });
    } else {
      console.warn('⚠️ Cannot send message: call not active');
    }
  }

  // Method to check if microphone is muted
  isMuted(): boolean {
    if (this.vapi && typeof this.vapi.isMuted === 'function') {
      return this.vapi.isMuted();
    }
    return false;
  }

  // Method to mute/unmute microphone
  setMuted(muted: boolean): void {
    if (this.vapi && typeof this.vapi.setMuted === 'function') {
      this.vapi.setMuted(muted);
    } else {
      console.warn('⚠️ Mute functionality not available');
    }
  }

  // Method to set call status callbacks
  onCallStart(callback: () => void): void {
    this.callStartCallbacks.push(callback);
  }

  onCallEnd(callback: () => void): void {
    this.callEndCallbacks.push(callback);
  }

  onMessage(callback: (message: any) => void): void {
    this.messageCallbacks.push(callback);
  }

  onError(callback: (error: any) => void): void {
    this.errorCallbacks.push(callback);
  }

  onSpeechStart(callback: () => void): void {
    this.speechStartCallbacks.push(callback);
  }

  onSpeechEnd(callback: () => void): void {
    this.speechEndCallbacks.push(callback);
  }

  onVolumeLevel(callback: (volume: number) => void): void {
    this.volumeLevelCallbacks.push(callback);
  }

  // Methods to remove callbacks
  removeCallStartCallback(callback: () => void): void {
    this.callStartCallbacks = this.callStartCallbacks.filter(cb => cb !== callback);
  }

  removeCallEndCallback(callback: () => void): void {
    this.callEndCallbacks = this.callEndCallbacks.filter(cb => cb !== callback);
  }

  removeMessageCallback(callback: (message: any) => void): void {
    this.messageCallbacks = this.messageCallbacks.filter(cb => cb !== callback);
  }

  removeErrorCallback(callback: (error: any) => void): void {
    this.errorCallbacks = this.errorCallbacks.filter(cb => cb !== callback);
  }

  removeSpeechStartCallback(callback: () => void): void {
    this.speechStartCallbacks = this.speechStartCallbacks.filter(cb => cb !== callback);
  }

  removeSpeechEndCallback(callback: () => void): void {
    this.speechEndCallbacks = this.speechEndCallbacks.filter(cb => cb !== callback);
  }

  removeVolumeLevelCallback(callback: (volume: number) => void): void {
    this.volumeLevelCallbacks = this.volumeLevelCallbacks.filter(cb => cb !== callback);
  }

  // Clear all callbacks
  clearAllCallbacks(): void {
    this.callStartCallbacks = [];
    this.callEndCallbacks = [];
    this.messageCallbacks = [];
    this.errorCallbacks = [];
    this.speechStartCallbacks = [];
    this.speechEndCallbacks = [];
    this.volumeLevelCallbacks = [];
  }

  // Debug method to check Vapi status
  getDebugInfo(): any {
    return {
      isCallActive: this.isCallActive,
      currentCall: this.currentCall,
      eventListenersSetup: this.eventListenersSetup,
      vapiInstance: !!this.vapi,
      isMuted: this.isMuted(),
      publicKey: VAPI_PUBLIC_KEY.substring(0, 8) + '...',
      assistantId: ASSISTANT_ID
    };
  }

  // Method to test microphone access
  async testMicrophone(): Promise<boolean> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (error) {
      return false;
    }
  }

  // Method to prevent automatic call ending
  preventAutoEnd(): void {
    if (this.vapi && this.isCallActive) {
      // Send a keep-alive message to maintain the call
      try {
        this.vapi.send({
          type: 'add-message',
          message: {
            role: 'system',
            content: 'Keep call active - user is present'
          }
        });
      } catch (error) {
        console.warn('⚠️ Could not send keep-alive message:', error);
      }
    }
  }

  // Method to check if call is stable
  isCallStable(): boolean {
    return this.isCallActive && this.currentCall !== null;
  }

  // Method to get call duration
  getCallDuration(): number {
    if (this.currentCall && this.currentCall.startTime) {
      return Date.now() - this.currentCall.startTime;
    }
    return 0;
  }
}

// Export a singleton instance
export const vapiService = new VapiService(); 