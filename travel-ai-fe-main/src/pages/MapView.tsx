
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Star, Navigation, Phone, Globe } from 'lucide-react';

const MapView = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [activeDay, setActiveDay] = useState(1);

  const mapLocations = [
    {
      id: 1,
      name: "Sagrada Família",
      type: "attraction",
      coordinates: { lat: 41.4036, lng: 2.1744 },
      description: "Basilica emblematică proiectată de Antoni Gaudí",
      rating: 4.8,
      visitTime: "2-3 ore",
      day: 1,
      time: "16:00",
      address: "Carrer de Mallorca, 401, Barcelona",
      phone: "+34 932 08 04 14",
      website: "sagradafamilia.org"
    },
    {
      id: 2,
      name: "Park Güell",
      type: "park",
      coordinates: { lat: 41.4145, lng: 2.1527 },
      description: "Parc public cu arhitectură unică Gaudí",
      rating: 4.6,
      visitTime: "2 ore",
      day: 1,
      time: "11:00",
      address: "Gracia, Barcelona",
      phone: "+34 932 56 21 22",
      website: "parkguell.cat"
    },
    {
      id: 3,
      name: "Disfrutar Restaurant",
      type: "restaurant",
      coordinates: { lat: 41.3897, lng: 2.1640 },
      description: "Restaurant cu stele Michelin - bucătărie modernă",
      rating: 4.9,
      visitTime: "2-3 ore",
      day: 1,
      time: "19:00",
      address: "Carrer de Villarroel, 163, Barcelona",
      phone: "+34 933 48 68 96",
      website: "disfrutarbarcelona.com"
    },
    {
      id: 4,
      name: "Muzeu Picasso",
      type: "museum",
      coordinates: { lat: 41.3851, lng: 2.1813 },
      description: "Colecția cea mai completă a lucrărilor timpurii ale lui Picasso",
      rating: 4.5,
      visitTime: "1.5-2 ore",
      day: 2,
      time: "10:00",
      address: "Carrer Montcada, 15-23, Barcelona",
      phone: "+34 932 56 30 00",
      website: "museupicasso.bcn.cat"
    },
    {
      id: 5,
      name: "Barrio Gótico",
      type: "walking",
      coordinates: { lat: 41.3834, lng: 2.1759 },
      description: "Cartierul istoric cu străzi medievale și arhitectură gotică",
      rating: 4.7,
      visitTime: "2-4 ore",
      day: 2,
      time: "15:00",
      address: "Ciutat Vella, Barcelona",
      phone: "",
      website: ""
    }
  ];

  const daySchedule = [
    {
      day: 1,
      date: "Luni, 15 Ianuarie",
      locations: mapLocations.filter(loc => loc.day === 1)
    },
    {
      day: 2,
      date: "Marți, 16 Ianuarie", 
      locations: mapLocations.filter(loc => loc.day === 2)
    }
  ];

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'attraction':
        return '🏛️';
      case 'restaurant':
        return '🍽️';
      case 'park':
        return '🌳';
      case 'museum':
        return '🎨';
      case 'walking':
        return '🚶';
      default:
        return '📍';
    }
  };

  const getLocationColor = (type: string) => {
    switch (type) {
      case 'attraction':
        return 'bg-blue-500';
      case 'restaurant':
        return 'bg-red-500';
      case 'park':
        return 'bg-green-500';
      case 'museum':
        return 'bg-purple-500';
      case 'walking':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Înapoi la Chat
              </Button>
              <h1 className="text-xl font-semibold">Harta Itinerariului - Barcelona</h1>
            </div>
            <div className="text-sm text-gray-600">
              5 zile • €1500 budget
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="h-[600px]">
              <CardContent className="p-0 h-full relative">
                {/* Mock Map */}
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 relative overflow-hidden rounded-lg">
                  {/* Barcelona Map Background */}
                  <div className="absolute inset-0 opacity-20">
                    <img 
                      src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&h=600"
                      alt="Barcelona aerial view"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Map Overlay */}
                  <div className="absolute inset-0 bg-white/40"></div>
                  
                  {/* Location Markers */}
                  {mapLocations
                    .filter(loc => loc.day === activeDay)
                    .map((location, index) => (
                    <div
                      key={location.id}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 ${
                        selectedLocation?.id === location.id ? 'scale-125 z-20' : 'z-10'
                      }`}
                      style={{
                        top: `${20 + (index * 15) + (Math.random() * 20)}%`,
                        left: `${25 + (index * 15) + (Math.random() * 20)}%`
                      }}
                      onClick={() => setSelectedLocation(location)}
                    >
                      <div className={`w-8 h-8 ${getLocationColor(location.type)} rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white`}>
                        <span className="text-xs font-bold">{index + 1}</span>
                      </div>
                      
                      {/* Popup */}
                      {selectedLocation?.id === location.id && (
                        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-lg shadow-xl border min-w-64 z-30">
                          <div className="flex items-start gap-2">
                            <span className="text-2xl">{getLocationIcon(location.type)}</span>
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm">{location.name}</h4>
                              <p className="text-xs text-gray-600 mb-2">{location.description}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {location.time}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-yellow-500" />
                                  {location.rating}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Route Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                              refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
                      </marker>
                    </defs>
                    {mapLocations
                      .filter(loc => loc.day === activeDay)
                      .slice(0, -1)
                      .map((_, index) => {
                        const startX = 25 + (index * 15) + (Math.random() * 20);
                        const startY = 20 + (index * 15) + (Math.random() * 20);
                        const endX = 25 + ((index + 1) * 15) + (Math.random() * 20);
                        const endY = 20 + ((index + 1) * 15) + (Math.random() * 20);
                        
                        return (
                          <line
                            key={index}
                            x1={`${startX}%`}
                            y1={`${startY}%`}
                            x2={`${endX}%`}
                            y2={`${endY}%`}
                            stroke="#3B82F6"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                            markerEnd="url(#arrowhead)"
                          />
                        );
                      })}
                  </svg>
                  
                  {/* Map Controls */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button size="sm" variant="outline" className="bg-white">
                      <Navigation className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="bg-white">
                      +
                    </Button>
                    <Button size="sm" variant="outline" className="bg-white">
                      -
                    </Button>
                  </div>
                </div>
                
                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg">
                  <h4 className="font-semibold text-sm mb-2">Legenda</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Atracții</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Restaurante</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Parcuri</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span>Muzee</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Day Selector */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Selectează ziua</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {daySchedule.map((day) => (
                    <Button
                      key={day.day}
                      variant={activeDay === day.day ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setActiveDay(day.day)}
                    >
                      Ziua {day.day} - {day.date}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Schedule for Selected Day */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Program Ziua {activeDay}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {daySchedule
                    .find(d => d.day === activeDay)
                    ?.locations.map((location, index) => (
                    <div
                      key={location.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedLocation?.id === location.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedLocation(location)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-6 h-6 ${getLocationColor(location.type)} rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">{location.time}</span>
                            <span>{getLocationIcon(location.type)}</span>
                          </div>
                          <h4 className="font-semibold text-sm">{location.name}</h4>
                          <p className="text-xs text-gray-600 mb-2">{location.description}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-500" />
                              {location.rating}
                            </div>
                            <span>•</span>
                            <span>{location.visitTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Location Details */}
            {selectedLocation && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Detalii Locație</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">{selectedLocation.name}</h4>
                      <p className="text-sm text-gray-600">{selectedLocation.description}</p>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                        <span>{selectedLocation.address}</span>
                      </div>
                      
                      {selectedLocation.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span>{selectedLocation.phone}</span>
                        </div>
                      )}
                      
                      {selectedLocation.website && (
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-gray-500" />
                          <span className="text-blue-600">{selectedLocation.website}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="pt-2 border-t">
                      <div className="flex justify-between items-center text-sm">
                        <span>Rating:</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{selectedLocation.rating}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm mt-1">
                        <span>Timp vizită:</span>
                        <span className="font-medium">{selectedLocation.visitTime}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
