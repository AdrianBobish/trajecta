import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, Star, MapPin, Calendar, Users, Award, Check, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthDialog } from '@/components/AuthDialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSelector } from '@/components/LanguageSelector';

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [authDialog, setAuthDialog] = useState<'login' | 'register' | null>(null);

  const pricingPlans = [
    {
      name: t('pricing.basic.name'),
      price: t('pricing.basic.price'),
      period: t('pricing.basic.period'),
      tagline: t('pricing.basic.tagline'),
      features: [
        t('features.basic.1'),
        t('features.basic.2'),
        t('features.basic.3'),
        t('features.basic.4'),
        t('features.basic.5')
      ],
      detailedFeatures: [
        t('features.basic.1'),
        t('features.basic.2'),
        t('features.basic.3'),
        t('features.basic.4'),
        t('features.basic.5')
      ]
    },
    {
      name: t('pricing.premium.name'),
      price: t('pricing.premium.price'),
      period: t('pricing.premium.period'),
      tagline: t('pricing.premium.tagline'),
      popular: true,
      features: [
        t('features.premium.1'),
        t('features.premium.2'),
        t('features.premium.3'),
        t('features.premium.4'),
        t('features.premium.5')
      ],
      detailedFeatures: [
        t('features.premium.1'),
        t('features.premium.2'),
        t('features.premium.3'),
        t('features.premium.4'),
        t('features.premium.5')
      ]
    },
    {
      name: t('pricing.enterprise.name'),
      price: t('pricing.enterprise.price'),
      period: t('pricing.enterprise.period'),
      tagline: t('pricing.enterprise.tagline'),
      features: [
        t('features.enterprise.1'),
        t('features.enterprise.2'),
        t('features.enterprise.3'),
        t('features.enterprise.4'),
        t('features.enterprise.5')
      ],
      detailedFeatures: [
        t('features.enterprise.1'),
        t('features.enterprise.2'),
        t('features.enterprise.3'),
        t('features.enterprise.4'),
        t('features.enterprise.5')
      ]
    }
  ];

  const benefits = [
    {
      icon: <MapPin className="w-8 h-8 text-blue-400" />,
      title: t('benefits.agent.title'),
      description: t('benefits.agent.desc')
    },
    {
      icon: <Calendar className="w-8 h-8 text-purple-400" />,
      title: t('benefits.planning.title'),
      description: t('benefits.planning.desc')
    },
    {
      icon: <Users className="w-8 h-8 text-green-400" />,
      title: t('benefits.experience.title'),
      description: t('benefits.experience.desc')
    },
    {
      icon: <Award className="w-8 h-8 text-orange-400" />,
      title: t('benefits.sales.title'),
      description: t('benefits.sales.desc')
    }
  ];

  const testimonials = [
    {
      name: t('testimonials.ana.name'),
      role: t('testimonials.ana.role'),
      content: t('testimonials.ana.content'),
      rating: 5
    },
    {
      name: t('testimonials.mihai.name'),
      role: t('testimonials.mihai.role'),
      content: t('testimonials.mihai.content'),
      rating: 5
    },
    {
      name: t('testimonials.elena.name'),
      role: t('testimonials.elena.role'),
      content: t('testimonials.elena.content'),
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-green-400/20 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-orange-400/30 rounded-full blur-lg animate-float"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Globe className="w-8 h-8 text-white" />
            <div className="text-2xl font-bold text-white">
              Trajecta
            </div>
            <span className="text-white/80 text-sm">Călătorii Personalizate</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-white/90">
            <button className="hover:text-white transition-colors">{t('header.about')}</button>
            <button className="hover:text-white transition-colors">{t('header.features')}</button>
            <button className="hover:text-white transition-colors">{t('header.testimonials')}</button>
            <LanguageSelector />
          </div>

          <div className="flex gap-3">
            <Button 
              variant="ghost" 
              onClick={() => setAuthDialog('login')}
              className="text-white border-white/30 hover:bg-white/10"
            >
              {t('header.login')}
            </Button>
            <Button 
              onClick={() => setAuthDialog('register')}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              {t('header.register')}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Main content with slide-in from left animation */}
            <div className="text-white animate-slide-in-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm">{t('hero.badge')}</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {t('hero.title')} <span className="text-yellow-400">Trajecta</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                {t('hero.subtitle')}
              </p>

              <div className="flex items-center gap-8 mb-8 text-white/80">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-400" />
                  <span>{t('hero.users')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span>{t('hero.destinations')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span>{t('hero.rating')}</span>
                </div>
              </div>

              <Button 
                size="lg" 
                onClick={() => setAuthDialog('register')}
                className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-4 rounded-xl animate-pulse-slow hover:scale-105 transition-transform duration-300"
              >
                {t('hero.start_planning')}
              </Button>
            </div>

            {/* Right side - Interactive Travel Paths with slide-in from right animation */}
            <div className="relative animate-slide-in-right">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 path-card-float">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>

                {/* New title for the paths card */}
                <div className="text-center mb-6">
                  <h3 className="text-white text-lg font-semibold mb-2">
                    {t('paths.title')}
                  </h3>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 p-4 rounded-xl border border-yellow-400/30 hover:scale-105 transition-transform duration-300 cursor-pointer group path-item-tilt">
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">🎮</div>
                    <div className="text-white font-medium">{t('paths.gamer')}</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-400/20 to-purple-500/20 p-4 rounded-xl border border-blue-400/30 hover:scale-105 transition-transform duration-300 cursor-pointer group path-item-tilt">
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">🗺️</div>
                    <div className="text-white font-medium">{t('paths.explorer')}</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-400/20 to-blue-500/20 p-4 rounded-xl border border-green-400/30 hover:scale-105 transition-transform duration-300 cursor-pointer group path-item-tilt">
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">☀️</div>
                    <div className="text-white font-medium">{t('paths.beginner')}</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-400/20 to-pink-500/20 p-4 rounded-xl border border-purple-400/30 hover:scale-105 transition-transform duration-300 cursor-pointer group path-item-tilt">
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">👴</div>
                    <div className="text-white font-medium">{t('paths.senior')}</div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <div className="text-white/60 text-sm mb-2">{t('paths.choose')}</div>
                  <div className="flex justify-center">
                    <div className="w-8 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/70" />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('benefits.title')} <span className="text-yellow-400">Trajecta</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('benefits.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-purple-50 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4 animate-float">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('pricing.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('pricing.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className="perspective-1000 h-96"
                onMouseEnter={() => setFlippedCard(index)}
                onMouseLeave={() => setFlippedCard(null)}
              >
                <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${flippedCard === index ? 'transform-flip' : ''}`}>
                  {/* Front of card */}
                  <Card className={`absolute inset-0 backface-hidden ${plan.popular ? 'ring-2 ring-blue-500 shadow-xl scale-105' : 'shadow-lg'} hover:shadow-xl transition-all duration-300`}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-1 rounded-full text-sm font-medium">
                          {t('pricing.popular')}
                        </span>
                      </div>
                    )}
                    <CardContent className="p-8 text-center h-full flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                        <p className="text-gray-600 mb-6">{plan.tagline}</p>
                        <div className="mb-6">
                          <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                          <span className="text-gray-600">{plan.period}</span>
                        </div>
                        <ul className="space-y-3 mb-8">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-center justify-center gap-2">
                              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button 
                        className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : ''}`}
                        onClick={() => {
                          if (index === 0) { // Basic plan
                            setAuthDialog('register');
                          } else { // Premium and Enterprise
                            // Contact functionality - could open a contact form or redirect
                            window.open('mailto:contact@trajecta.com?subject=Interesat de planul ' + plan.name, '_blank');
                          }
                        }}
                      >
                        {index === 0 ? t('pricing.demo') : t('pricing.contact')}
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Back of card */}
                  <Card className="absolute inset-0 backface-hidden transform-flip shadow-lg">
                    <CardContent className="p-8 text-center h-full flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">{t('pricing.details')} {plan.name}</h3>
                        <ul className="space-y-2 text-sm">
                          {plan.detailedFeatures.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 text-left">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button 
                        className="w-full mt-4"
                        onClick={() => {
                          if (index === 0) { // Basic plan
                            setAuthDialog('register');
                          } else { // Premium and Enterprise
                            // Contact functionality - could open a contact form or redirect
                            window.open('mailto:contact@trajecta.com?subject=Interesat de planul ' + plan.name, '_blank');
                          }
                        }}
                      >
                        {index === 0 ? t('pricing.demo') : t('pricing.contact')}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('testimonials.title')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 border border-gray-100">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <Button 
            size="lg" 
            onClick={() => setAuthDialog('register')}
            className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-12 py-4 rounded-xl"
          >
            {t('cta.button')}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-6 h-6 text-blue-400" />
                <div className="text-xl font-bold">Trajecta</div>
              </div>
              <p className="text-gray-400">
                Platforma AI pentru călătorii personalizate
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.product')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>{t('header.features')}</li>
                <li>Prețuri</li>
                <li>API</li>
                <li>Integrări</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.company')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>{t('header.about')}</li>
                <li>Cariere</li>
                <li>Contact</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.support')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Documentație</li>
                <li>Status</li>
                <li>Securitate</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Trajecta. {t('footer.copyright')}</p>
          </div>
        </div>
      </footer>

      {/* Auth Dialog */}
      <AuthDialog 
        open={authDialog !== null}
        onOpenChange={() => setAuthDialog(null)}
        mode={authDialog || 'login'}
        onModeChange={setAuthDialog}
      />
    </div>
  );
};

export default Index;
