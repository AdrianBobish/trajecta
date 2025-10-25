import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Send, LogOut, MapPin, Calendar, DollarSign, Users, Plane, Clock, Star } from 'lucide-react';
import { getUser, logout, isAuthenticated, sendChatMessage } from '@/lib/auth';
import { VoiceCall } from '@/components/VoiceCall';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  data?: any;
  isTyping?: boolean;
}

interface Trip {
  id: number;
  destination: string;
  country: string;
  duration: string;
  budget: string;
  type: string;
  status: 'completed' | 'planned' | 'wishlist';
  rating?: number;
  description: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Trajecta, your AI travel planning assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatKey, setChatKey] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const user = getUser();

  // Hardcoded trips
  const trips: Trip[] = [
    {
      id: 1,
      destination: "Paris",
      country: "France",
      duration: "5 days",
      budget: "€1,200",
      type: "Cultural",
      status: "completed",
      rating: 4.8,
      description: "I want to plan a 5-day cultural trip to Paris, France with a budget of €1,200. I'm interested in visiting museums, historic sites, trying local cuisine, and experiencing the romantic atmosphere of the city."
    },
    {
      id: 2,
      destination: "Tokyo",
      country: "Japan",
      duration: "7 days",
      budget: "€2,500",
      type: "Adventure",
      status: "planned",
      description: "I'm planning a 7-day adventure trip to Tokyo, Japan with a budget of €2,500. I want to experience modern Japanese culture, visit temples, try authentic sushi, explore neighborhoods like Shibuya and Harajuku, and maybe take a day trip to Mount Fuji."
    },
    {
      id: 3,
      destination: "Santorini",
      country: "Greece",
      duration: "4 days",
      budget: "€800",
      type: "Relaxation",
      status: "wishlist",
      description: "I'm dreaming of a 4-day relaxing getaway to Santorini, Greece with a budget of €800. I want to enjoy beautiful sunsets, stay in a traditional white-washed hotel, visit local wineries, and spend time on the beautiful beaches."
    },
    {
      id: 4,
      destination: "New York",
      country: "USA",
      duration: "6 days",
      budget: "€2,000",
      type: "Urban",
      status: "completed",
      rating: 4.6,
      description: "I want to plan a 6-day urban adventure in New York, USA with a budget of €2,000. I'm interested in Broadway shows, visiting Central Park, exploring different neighborhoods, trying diverse food scenes, and seeing iconic landmarks like the Statue of Liberty."
    },
    {
      id: 5,
      destination: "Bali",
      country: "Indonesia",
      duration: "10 days",
      budget: "€1,500",
      type: "Tropical",
      status: "planned",
      description: "I'm planning a 10-day tropical paradise trip to Bali, Indonesia with a budget of €1,500. I want to experience beautiful beaches, visit ancient temples, try local Indonesian cuisine, enjoy spa treatments, and explore rice terraces and volcanic landscapes."
    },
    {
      id: 6,
      destination: "Barcelona",
      country: "Spain",
      duration: "5 days",
      budget: "€900",
      type: "Cultural",
      status: "wishlist",
      description: "I'm considering a 5-day cultural trip to Barcelona, Spain with a budget of €900. I want to see Gaudí's architecture including Sagrada Familia, enjoy tapas and local wine, explore the Gothic Quarter, and experience the vibrant nightlife."
    },
    {
      id: 7,
      destination: "Iceland",
      country: "Iceland",
      duration: "8 days",
      budget: "€1,800",
      type: "Nature",
      status: "wishlist",
      description: "I'm dreaming of an 8-day nature adventure in Iceland with a budget of €1,800. I want to see the Northern Lights, visit geysers and waterfalls, relax in hot springs like Blue Lagoon, and explore dramatic landscapes and glaciers."
    }
  ];

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    scrollToBottom();
  }, [messages, navigate]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addMessage = (text: string, isUser: boolean, data?: any, isTyping?: boolean) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      isUser,
      timestamp: new Date(),
      data,
      isTyping
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage.id;
  };

  const updateMessage = (id: number, text: string, isTyping?: boolean) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, text, isTyping } : msg
    ));
  };

  const removeMessage = (id: number) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    addMessage(userMessage, true);
    setInputMessage('');
    setIsLoading(true);

    // Add typing indicator
    const typingId = addMessage('Trajecta is typing...', false, undefined, true);

    try {
      const response = await sendChatMessage(userMessage);
      
      // Remove typing indicator
      removeMessage(typingId);
      
      // Add AI response
      addMessage(response.message, false);
    } catch (error) {
      // Remove typing indicator
      removeMessage(typingId);
      
      // Show error message
      addMessage('Sorry, there was an error. Please try again.', false);
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Could not send message",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTripClick = (trip: Trip) => {
    // Add the trip description as a user message
    addMessage(trip.description, true);
    
    // Simulate sending to API
    setIsLoading(true);
    const typingId = addMessage('Trajecta is typing...', false, undefined, true);

    setTimeout(async () => {
      try {
        const response = await sendChatMessage(trip.description);
        removeMessage(typingId);
        addMessage(response.message, false);
      } catch (error) {
        removeMessage(typingId);
        addMessage('Sorry, there was an error. Please try again.', false);
        toast({
          title: "Error",
          description: "Could not process trip request",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }, 1000);

    toast({
      title: "Trip Selected",
      description: `Planning your trip to ${trip.destination}!`
    });
  };

  const handleNewTrip = () => {
    // Clear input field first
    setInputMessage('');
    
    // Reset loading state
    setIsLoading(false);
    
    // Force complete re-render by changing key
    setChatKey(prev => prev + 1);
    
    // Reset chat to initial state with a completely new array
    const initialMessage = {
      id: Date.now(),
      text: "Hello! I'm Trajecta, your AI travel planning assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    };
    
    // Use setTimeout to ensure state updates are processed
    setTimeout(() => {
      setMessages([initialMessage]);
      scrollToBottom();
    }, 50);
    
    toast({
      title: "Chat Reset",
      description: "Let's plan a new trip together!"
    });
  };

  const handleVoiceMessage = (message: string, isUser: boolean) => {
    // Add voice message to chat
    addMessage(message, isUser);
    
    // If it's a user message from voice, process it like a regular message
    if (isUser && !isLoading) {
      setIsLoading(true);
      const typingId = addMessage('Trajecta is typing...', false, undefined, true);

      setTimeout(async () => {
        try {
          const response = await sendChatMessage(message);
          removeMessage(typingId);
          addMessage(response.message, false);
        } catch (error) {
          removeMessage(typingId);
          addMessage('Sorry, there was an error. Please try again.', false);
          toast({
            title: "Error",
            description: "Could not process voice message",
            variant: "destructive"
          });
        } finally {
          setIsLoading(false);
        }
      }, 1000);
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out Successfully",
      description: "Goodbye!"
    });
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-50 text-green-700 border-green-200';
      case 'planned': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'wishlist': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <Star className="w-4 h-4" />;
      case 'planned': return <Calendar className="w-4 h-4" />;
      case 'wishlist': return <Clock className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Trajecta
              </h1>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                AI Assistant
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{user.full_name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <Avatar>
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  {user.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-8rem)]">
          {/* Sidebar */}
          <div className="lg:col-span-1 flex flex-col h-full space-y-4">
            {/* Voice Call Component */}
            <VoiceCall 
              onMessage={handleVoiceMessage}
              className="flex-shrink-0"
            />

            <Card className="flex-1 flex flex-col min-h-0">
              <CardHeader className="flex-shrink-0 pb-2">
                <CardTitle className="text-base">Your Trips</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col min-h-0 pb-3">
                <div className="flex-1 overflow-y-auto space-y-2 mb-3 pr-2 min-h-0 trips-scroll" style={{ maxHeight: 'calc(100vh - 38rem)' }}>
                  {trips.map((trip) => (
                    <div
                      key={trip.id}
                      onClick={() => handleTripClick(trip)}
                      className="flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors border border-gray-100 hover:border-gray-200"
                    >
                      <div className={`p-1.5 rounded-full ${getStatusColor(trip.status)}`}>
                        {getStatusIcon(trip.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-xs truncate">{trip.destination}</p>
                          {trip.rating && (
                            <div className="flex items-center space-x-1">
                              <Star className="w-2.5 h-2.5 text-yellow-500 fill-current" />
                              <span className="text-xs text-gray-600">{trip.rating}</span>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{trip.country}</p>
                        <div className="flex items-center justify-between mt-0.5">
                          <span className="text-xs text-gray-600">{trip.duration}</span>
                          <span className="text-xs font-medium text-blue-600">{trip.budget}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="w-full flex-shrink-0 h-8 text-xs" variant="outline" onClick={handleNewTrip}>
                  <Plane className="w-3 h-3 mr-1" />
                  Plan New Trip
                </Button>
              </CardContent>
            </Card>

            <Card className="flex-shrink-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3 h-3 text-blue-600" />
                    <span className="text-xs">Destinations Visited</span>
                  </div>
                  <span className="font-semibold text-sm">12</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-3 h-3 text-green-600" />
                    <span className="text-xs">Total Savings</span>
                  </div>
                  <span className="font-semibold text-sm">€2,450</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-3 h-3 text-purple-600" />
                    <span className="text-xs">Group Trips</span>
                  </div>
                  <span className="font-semibold text-sm">8</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3 flex flex-col h-full">
            <Card className="flex-1 flex flex-col min-h-0">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="flex items-center space-x-2">
                  <span>AI Travel Assistant</span>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Online
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col min-h-0 pb-4">
                {/* Messages */}
                <div 
                  key={chatKey}
                  className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 min-h-0 chat-messages" 
                  style={{ maxHeight: 'calc(100vh - 16rem)' }}
                >
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isUser
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        {message.isTyping ? (
                          <div className="flex items-center space-x-1">
                            <span className="text-sm">{message.text}</span>
                            <div className="flex space-x-1 ml-2">
                              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm">{message.text}</p>
                        )}
                        {message.data?.suggestions && (
                          <div className="mt-3 space-y-2">
                            {message.data.suggestions.map((suggestion: any, index: number) => (
                              <div key={index} className="bg-white/20 p-2 rounded text-xs">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium">{suggestion.name}</span>
                                  <span className="text-yellow-300">★ {suggestion.rating}</span>
                                </div>
                                <div className="flex justify-between mt-1">
                                  <span>{suggestion.type}</span>
                                  <span className="font-medium">{suggestion.price}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        {!message.isTyping && (
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="flex space-x-2 flex-shrink-0">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask me anything about your trip..."
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    size="icon"
                    disabled={isLoading || !inputMessage.trim()}
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
