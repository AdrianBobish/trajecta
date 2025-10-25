import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'ro' | 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'nl' | 'pl' | 'cs' | 'hu' | 'hr' | 'bg' | 'el' | 'ru' | 'uk' | 'ar' | 'tr' | 'hi' | 'zh' | 'ja' | 'ko';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('ro');

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('trajecta-language', language);
  };

  // Initialize language from localStorage
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('trajecta-language') as Language;
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const t = (key: string): string => {
    return getTranslation(key, currentLanguage);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Translation function
const getTranslation = (key: string, language: Language): string => {
  const translations = getTranslations();
  return translations[language]?.[key] || translations['en'][key] || key;
};

// All translations
const getTranslations = () => ({
  ro: {
    // Header
    'header.about': 'Despre',
    'header.features': 'Caracteristici',
    'header.testimonials': 'Testimoniale',
    'header.login': 'Conectare',
    'header.register': 'Înregistrare',
    
    // Hero section
    'hero.badge': 'Aplicația #1 pentru călătorii personalizate',
    'hero.title': 'Descoperă lumea cu',
    'hero.subtitle': 'O aplicație de călătorii personalizată care se adaptează stilului tău de viață. De la gameri la exploratori și seniori - fiecare are partea sa de aventură.',
    'hero.users': '1000+ utilizatori',
    'hero.destinations': '500+ destinații',
    'hero.rating': '4.9/5 rating',
    'hero.start_planning': 'Începe Planificarea',
    
    // Travel paths
    'paths.title': 'O experiență unică pentru fiecare client în parte',
    'paths.gamer': 'Gamer Path',
    'paths.explorer': 'Explorer Path',
    'paths.beginner': 'Beginner Path',
    'paths.senior': 'Senior Path',
    'paths.choose': 'Alege-ți aventura perfectă',
    
    // Benefits section
    'benefits.title': 'De ce aleg agențiile',
    'benefits.subtitle': 'Oferă clienților tăi propriul agent AI personal care înțelege perfect preferințele lor',
    'benefits.agent.title': 'Agent AI Personal',
    'benefits.agent.desc': 'Fiecare client primește propriul ghid virtual inteligent',
    'benefits.planning.title': 'Planificare Automată',
    'benefits.planning.desc': 'Rezervări instant la restaurante și activități',
    'benefits.experience.title': 'Experiență Personalizată',
    'benefits.experience.desc': 'Adaptare completă la preferințele fiecărui călător',
    'benefits.sales.title': 'Creștere Vânzări',
    'benefits.sales.desc': 'Clienți mai mulțumiți, mai multe rezervări',
    
    // Pricing section
    'pricing.title': 'Alege planul perfect pentru agenția ta',
    'pricing.subtitle': 'Începe cu o probă gratuită de 14 zile, fără card de credit',
    'pricing.popular': 'Cel mai popular',
    'pricing.basic.name': 'BASIC',
    'pricing.basic.price': '€29',
    'pricing.basic.period': '/lună',
    'pricing.basic.tagline': 'Perfect pentru început',
    'pricing.premium.name': 'PREMIUM',
    'pricing.premium.price': '€59',
    'pricing.premium.period': '/lună',
    'pricing.premium.tagline': 'Cel mai popular',
    'pricing.enterprise.name': 'ENTERPRISE',
    'pricing.enterprise.price': '€99',
    'pricing.enterprise.period': '/lună',
    'pricing.enterprise.tagline': 'Pentru agenții mari',
    'pricing.choose': 'Alege',
    'pricing.start': 'Începe Gratuit',
    'pricing.demo': 'Încearcă varianta demo',
    'pricing.contact': 'Contactează-ne',
    'pricing.details': 'Detalii',
    
    // Pricing features
    'features.basic.1': 'Până la 50 clienți pe lună',
    'features.basic.2': 'Agent AI personal pentru fiecare client',
    'features.basic.3': 'Planificare automată călătorii',
    'features.basic.4': 'Rezervări restaurante și activități',
    'features.basic.5': 'Suport email',
    'features.premium.1': 'Clienți nelimitați',
    'features.premium.2': 'Agent AI avansat cu voice chat',
    'features.premium.3': 'Toate funcționalitățile',
    'features.premium.4': 'Suport prioritar',
    'features.premium.5': 'Analytics avansate',
    'features.enterprise.1': 'Soluție completă pentru agenție',
    'features.enterprise.2': 'Agent AI personalizat pentru brand',
    'features.enterprise.3': 'Dezvoltare features custom',
    'features.enterprise.4': 'Account manager dedicat',
    'features.enterprise.5': 'SLA garantat',
    
    // Testimonials
    'testimonials.title': 'Ce spun partenerii noștri',
    'testimonials.ana.content': 'Clienții noștri sunt fascinați de agentul AI. Ne-a crescut rata de conversie cu 70%.',
    'testimonials.ana.name': 'Ana Popescu',
    'testimonials.ana.role': 'Director Agenție Dream Travel',
    'testimonials.mihai.content': 'Trajecta ne-a automatizat complet procesul de planificare. Economisim ore întregi.',
    'testimonials.mihai.name': 'Mihai Ionescu',
    'testimonials.mihai.role': 'Fondator Travel Expert SRL',
    'testimonials.elena.content': 'Cel mai bun tool pentru agenții. Clientul simte că are propriul ghid personal.',
    'testimonials.elena.name': 'Elena Dumitrescu',
    'testimonials.elena.role': 'Travel Consultant Premium Tours',
    
    // CTA section
    'cta.title': 'Gata să oferi clienților tăi propriul agent AI?',
    'cta.subtitle': 'Începe astăzi proba gratuită și vezi cum Trajecta transformă experiența de călătorie',
    'cta.button': 'Începe Proba Gratuită - 14 Zile',
    
    // Footer
    'footer.product': 'Produs',
    'footer.company': 'Companie',
    'footer.support': 'Support',
    'footer.copyright': 'Toate drepturile rezervate.',
  },
  
  en: {
    // Header
    'header.about': 'About',
    'header.features': 'Features',
    'header.testimonials': 'Testimonials',
    'header.login': 'Login',
    'header.register': 'Register',
    
    // Hero section
    'hero.badge': '#1 App for personalized travel',
    'hero.title': 'Discover the world with',
    'hero.subtitle': 'A personalized travel app that adapts to your lifestyle. From gamers to explorers and seniors - everyone has their share of adventure.',
    'hero.users': '1000+ users',
    'hero.destinations': '500+ destinations',
    'hero.rating': '4.9/5 rating',
    'hero.start_planning': 'Start Planning',
    
    // Travel paths
    'paths.title': 'A unique experience for each client',
    'paths.gamer': 'Gamer Path',
    'paths.explorer': 'Explorer Path',
    'paths.beginner': 'Beginner Path',
    'paths.senior': 'Senior Path',
    'paths.choose': 'Choose your perfect adventure',
    
    // Benefits section
    'benefits.title': 'Why agencies choose',
    'benefits.subtitle': 'Give your clients their own personal AI agent that perfectly understands their preferences',
    'benefits.agent.title': 'Personal AI Agent',
    'benefits.agent.desc': 'Each client gets their own intelligent virtual guide',
    'benefits.planning.title': 'Automated Planning',
    'benefits.planning.desc': 'Instant bookings at restaurants and activities',
    'benefits.experience.title': 'Personalized Experience',
    'benefits.experience.desc': 'Complete adaptation to each traveler\'s preferences',
    'benefits.sales.title': 'Sales Growth',
    'benefits.sales.desc': 'Happier clients, more bookings',
    
    // Pricing section
    'pricing.title': 'Choose the perfect plan for your agency',
    'pricing.subtitle': 'Start with a 14-day free trial, no credit card required',
    'pricing.popular': 'Most popular',
    'pricing.basic.name': 'BASIC',
    'pricing.basic.price': '€29',
    'pricing.basic.period': '/month',
    'pricing.basic.tagline': 'Perfect for beginners',
    'pricing.premium.name': 'PREMIUM',
    'pricing.premium.price': '€59',
    'pricing.premium.period': '/month',
    'pricing.premium.tagline': 'Most popular',
    'pricing.enterprise.name': 'ENTERPRISE',
    'pricing.enterprise.price': '€99',
    'pricing.enterprise.period': '/month',
    'pricing.enterprise.tagline': 'For large agencies',
    'pricing.choose': 'Choose',
    'pricing.start': 'Start Free',
    'pricing.demo': 'Try the demo version',
    'pricing.contact': 'Contact us',
    'pricing.details': 'Details',
    
    // Pricing features
    'features.basic.1': 'Up to 50 clients per month',
    'features.basic.2': 'Personal AI agent for each client',
    'features.basic.3': 'Automated trip planning',
    'features.basic.4': 'Restaurant and activity bookings',
    'features.basic.5': 'Email support',
    'features.premium.1': 'Unlimited clients',
    'features.premium.2': 'Advanced AI agent with voice chat',
    'features.premium.3': 'All features included',
    'features.premium.4': 'Priority support',
    'features.premium.5': 'Advanced analytics',
    'features.enterprise.1': 'Complete agency solution',
    'features.enterprise.2': 'Brand-customized AI agent',
    'features.enterprise.3': 'Custom feature development',
    'features.enterprise.4': 'Dedicated account manager',
    'features.enterprise.5': 'Guaranteed SLA',
    
    // Testimonials
    'testimonials.title': 'What our partners say',
    'testimonials.ana.content': 'Our clients are fascinated by the AI agent. It increased our conversion rate by 70%.',
    'testimonials.ana.name': 'Ana Popescu',
    'testimonials.ana.role': 'Director at Dream Travel Agency',
    'testimonials.mihai.content': 'Trajecta has completely automated our planning process. We save entire hours.',
    'testimonials.mihai.name': 'Mihai Ionescu',
    'testimonials.mihai.role': 'Founder of Travel Expert SRL',
    'testimonials.elena.content': 'The best tool for agencies. Clients feel like they have their own personal guide.',
    'testimonials.elena.name': 'Elena Dumitrescu',
    'testimonials.elena.role': 'Travel Consultant at Premium Tours',
    
    // CTA section
    'cta.title': 'Ready to give your clients their own AI agent?',
    'cta.subtitle': 'Start your free trial today and see how Trajecta transforms the travel experience',
    'cta.button': 'Start Free Trial - 14 Days',
    
    // Footer
    'footer.product': 'Product',
    'footer.company': 'Company',
    'footer.support': 'Support',
    'footer.copyright': 'All rights reserved.',
  },
  
  es: {
    // Header
    'header.about': 'Acerca de',
    'header.features': 'Características',
    'header.testimonials': 'Testimonios',
    'header.login': 'Iniciar sesión',
    'header.register': 'Registrarse',
    
    // Hero section
    'hero.badge': 'App #1 para viajes personalizados',
    'hero.title': 'Descubre el mundo con',
    'hero.subtitle': 'Una aplicación de viajes personalizada que se adapta a tu estilo de vida. Desde gamers hasta exploradores y seniors, todos tienen su parte de aventura.',
    'hero.users': '1000+ usuarios',
    'hero.destinations': '500+ destinos',
    'hero.rating': '4.9/5 calificación',
    'hero.start_planning': 'Comenzar Planificación',
    
    // Travel paths
    'paths.title': 'Una experiencia única para cada cliente',
    'paths.gamer': 'Ruta Gamer',
    'paths.explorer': 'Ruta Explorador',
    'paths.beginner': 'Ruta Principiante',
    'paths.senior': 'Ruta Senior',
    'paths.choose': 'Elige tu aventura perfecta',
    
    // Benefits section
    'benefits.title': 'Por qué las agencias eligen',
    'benefits.subtitle': 'Dale a tus clientes su propio agente AI personal que comprende perfectamente sus preferencias',
    'benefits.agent.title': 'Agente AI Personal',
    'benefits.agent.desc': 'Cada cliente obtiene su propia guía virtual inteligente',
    'benefits.planning.title': 'Planificación Automatizada',
    'benefits.planning.desc': 'Reservas instantáneas en restaurantes y actividades',
    'benefits.experience.title': 'Experiencia Personalizada',
    'benefits.experience.desc': 'Adaptación completa a las preferencias de cada viajero',
    'benefits.sales.title': 'Crecimiento de Ventas',
    'benefits.sales.desc': 'Clientes más felices, más reservas',
    
    // Pricing section
    'pricing.title': 'Elige el plan perfecto para tu agencia',
    'pricing.subtitle': 'Comienza con una prueba gratuita de 14 días, sin tarjeta de crédito requerida',
    'pricing.popular': 'Más popular',
    'pricing.basic.name': 'BÁSICO',
    'pricing.basic.price': '€29',
    'pricing.basic.period': '/mes',
    'pricing.basic.tagline': 'Perfecto para empezar',
    'pricing.premium.name': 'PREMIUM',
    'pricing.premium.price': '€59',
    'pricing.premium.period': '/mes',
    'pricing.premium.tagline': 'Más popular',
    'pricing.enterprise.name': 'EMPRESA',
    'pricing.enterprise.price': '€99',
    'pricing.enterprise.period': '/mes',
    'pricing.enterprise.tagline': 'Para agencias grandes',
    'pricing.choose': 'Elegir',
    'pricing.start': 'Comenzar Gratis',
    'pricing.demo': 'Prueba la versión de demostración',
    'pricing.contact': 'Contáctanos',
    'pricing.details': 'Detalles',
    
    // Pricing features
    'features.basic.1': 'Hasta 50 clientes por mes',
    'features.basic.2': 'Agente AI personal para cada cliente',
    'features.basic.3': 'Planificación automática de viajes',
    'features.basic.4': 'Reservas de restaurantes y actividades',
    'features.basic.5': 'Soporte por email',
    'features.premium.1': 'Clientes ilimitados',
    'features.premium.2': 'Agente AI avanzado con chat de voz',
    'features.premium.3': 'Todas las características incluidas',
    'features.premium.4': 'Soporte prioritario',
    'features.premium.5': 'Análisis avanzados',
    'features.enterprise.1': 'Solución completa para agencias',
    'features.enterprise.2': 'Agente AI personalizado para la marca',
    'features.enterprise.3': 'Desarrollo de características personalizadas',
    'features.enterprise.4': 'Gerente de cuenta dedicado',
    'features.enterprise.5': 'SLA garantizado',
    
    // Testimonials
    'testimonials.title': 'Lo que dicen nuestros socios',
    'testimonials.ana.content': 'Nuestros clientes están fascinados con el agente AI. Aumentó nuestra tasa de conversión en un 70%.',
    'testimonials.ana.name': 'Ana Popescu',
    'testimonials.ana.role': 'Directora en Dream Travel Agency',
    'testimonials.mihai.content': 'Trajecta ha automatizado completamente nuestro proceso de planificación. Ahorramos horas enteras.',
    'testimonials.mihai.name': 'Mihai Ionescu',
    'testimonials.mihai.role': 'Fundador de Travel Expert SRL',
    'testimonials.elena.content': 'La mejor herramienta para agencias. Los clientes sienten que tienen su propia guía personal.',
    'testimonials.elena.name': 'Elena Dumitrescu',
    'testimonials.elena.role': 'Consultora de Viajes en Premium Tours',
    
    // CTA section
    'cta.title': '¿Listo para dar a tus clientes su propio agente AI?',
    'cta.subtitle': 'Comienza tu prueba gratuita hoy y ve cómo Trajecta transforma la experiencia de viaje',
    'cta.button': 'Comenzar Prueba Gratuita - 14 Días',
    
    // Footer
    'footer.product': 'Producto',
    'footer.company': 'Empresa',
    'footer.support': 'Soporte',
    'footer.copyright': 'Todos los derechos reservados.',
  },
  
  fr: {
    // Header
    'header.about': 'À propos',
    'header.features': 'Fonctionnalités',
    'header.testimonials': 'Témoignages',
    'header.login': 'Connexion',
    'header.register': 'Inscription',
    
    // Hero section
    'hero.badge': 'App #1 pour les voyages personnalisés',
    'hero.title': 'Découvrez le monde avec',
    'hero.subtitle': 'Une application de voyage personnalisée qui s\'adapte à votre style de vie. Des gamers aux explorateurs et seniors - chacun a sa part d\'aventure.',
    'hero.users': '1000+ utilisateurs',
    'hero.destinations': '500+ destinations',
    'hero.rating': '4.9/5 évaluation',
    'hero.start_planning': 'Commencer la Planification',
    
    // Travel paths
    'paths.title': 'Une expérience unique pour chaque client',
    'paths.gamer': 'Parcours Gamer',
    'paths.explorer': 'Parcours Explorateur',
    'paths.beginner': 'Parcours Débutant',
    'paths.senior': 'Parcours Senior',
    'paths.choose': 'Choisissez votre aventure parfaite',
    
    // Benefits section
    'benefits.title': 'Pourquoi les agences choisissent',
    'benefits.subtitle': 'Donnez à vos clients leur propre agent AI personnel qui comprend parfaitement leurs préférences',
    'benefits.agent.title': 'Agent AI Personnel',
    'benefits.agent.desc': 'Chaque client obtient son propre guide virtuel intelligent',
    'benefits.planning.title': 'Planification Automatisée',
    'benefits.planning.desc': 'Réservations instantanées dans les restaurants et activités',
    'benefits.experience.title': 'Expérience Personnalisée',
    'benefits.experience.desc': 'Adaptation complète aux préférences de chaque voyageur',
    'benefits.sales.title': 'Croissance des Ventes',
    'benefits.sales.desc': 'Clients plus heureux, plus de réservations',
    
    // Pricing section
    'pricing.title': 'Choisissez le plan parfait pour votre agence',
    'pricing.subtitle': 'Commencez avec un essai gratuit de 14 jours, aucune carte de crédit requise',
    'pricing.popular': 'Le plus populaire',
    'pricing.basic.name': 'BASIQUE',
    'pricing.basic.price': '€29',
    'pricing.basic.period': '/mois',
    'pricing.basic.tagline': 'Parfait pour commencer',
    'pricing.premium.name': 'PREMIUM',
    'pricing.premium.price': '€59',
    'pricing.premium.period': '/mois',
    'pricing.premium.tagline': 'Le plus populaire',
    'pricing.enterprise.name': 'ENTREPRISE',
    'pricing.enterprise.price': '€99',
    'pricing.enterprise.period': '/mois',
    'pricing.enterprise.tagline': 'Pour les grandes agences',
    'pricing.choose': 'Choisir',
    'pricing.start': 'Commencer Gratuitement',
    'pricing.demo': 'Essayer la version démo',
    'pricing.contact': 'Nous contacter',
    'pricing.details': 'Détails',
    
    // Pricing features
    'features.basic.1': 'Jusqu\'à 50 clients par mois',
    'features.basic.2': 'Agent AI personnel pour chaque client',
    'features.basic.3': 'Planification automatique des voyages',
    'features.basic.4': 'Réservations de restaurants et activités',
    'features.basic.5': 'Support par email',
    'features.premium.1': 'Clients illimités',
    'features.premium.2': 'Agent AI avancé avec chat vocal',
    'features.premium.3': 'Toutes les fonctionnalités incluses',
    'features.premium.4': 'Support prioritaire',
    'features.premium.5': 'Analyses avancées',
    'features.enterprise.1': 'Solution complète pour agences',
    'features.enterprise.2': 'Agent AI personnalisé pour la marque',
    'features.enterprise.3': 'Développement de fonctionnalités personnalisées',
    'features.enterprise.4': 'Gestionnaire de compte dédié',
    'features.enterprise.5': 'SLA garanti',
    
    // Testimonials
    'testimonials.title': 'Ce que disent nos partenaires',
    'testimonials.ana.content': 'Nos clients sont fascinés par l\'agent AI. Cela a augmenté notre taux de conversion de 70%.',
    'testimonials.ana.name': 'Ana Popescu',
    'testimonials.ana.role': 'Directrice chez Dream Travel Agency',
    'testimonials.mihai.content': 'Trajecta a complètement automatisé notre processus de planification. Nous économisons des heures entières.',
    'testimonials.mihai.name': 'Mihai Ionescu',
    'testimonials.mihai.role': 'Fondateur de Travel Expert SRL',
    'testimonials.elena.content': 'Le meilleur outil pour les agences. Les clients sentent qu\'ils ont leur propre guide personnel.',
    'testimonials.elena.name': 'Elena Dumitrescu',
    'testimonials.elena.role': 'Consultante Voyage chez Premium Tours',
    
    // CTA section
    'cta.title': 'Prêt à donner à vos clients leur propre agent AI ?',
    'cta.subtitle': 'Commencez votre essai gratuit aujourd\'hui et voyez comment Trajecta transforme l\'expérience de voyage',
    'cta.button': 'Commencer l\'Essai Gratuit - 14 Jours',
    
    // Footer
    'footer.product': 'Produit',
    'footer.company': 'Entreprise',
    'footer.support': 'Support',
    'footer.copyright': 'Tous droits réservés.',
  },
  
  de: {
    // Header
    'header.about': 'Über uns',
    'header.features': 'Funktionen',
    'header.testimonials': 'Testimonials',
    'header.login': 'Anmelden',
    'header.register': 'Registrieren',
    
    // Hero section
    'hero.badge': '#1 App für personalisierte Reisen',
    'hero.title': 'Entdecke die Welt mit',
    'hero.subtitle': 'Eine personalisierte Reise-App, die sich an deinen Lebensstil anpasst. Von Gamern bis zu Entdeckern und Senioren - jeder hat seinen Anteil am Abenteuer.',
    'hero.users': '1000+ Nutzer',
    'hero.destinations': '500+ Reiseziele',
    'hero.rating': '4.9/5 Bewertung',
    'hero.start_planning': 'Abenteuer Starten',
    
    // Travel paths
    'paths.title': 'Eine einzigartige Erfahrung für jeden Kunden',
    'paths.gamer': 'Gamer-Pfad',
    'paths.explorer': 'Entdecker-Pfad',
    'paths.beginner': 'Anfänger-Pfad',
    'paths.senior': 'Senior-Pfad',
    'paths.choose': 'Wähle dein perfektes Abenteuer',
    
    // Benefits section
    'benefits.title': 'Warum Agenturen wählen',
    'benefits.subtitle': 'Geben Sie Ihren Kunden ihren eigenen persönlichen AI-Agenten, der ihre Vorlieben perfekt versteht',
    'benefits.agent.title': 'Persönlicher AI-Agent',
    'benefits.agent.desc': 'Jeder Kunde erhält seinen eigenen intelligenten virtuellen Guide',
    'benefits.planning.title': 'Automatisierte Planung',
    'benefits.planning.desc': 'Sofortige Buchungen in Restaurants und Aktivitäten',
    'benefits.experience.title': 'Personalisierte Erfahrung',
    'benefits.experience.desc': 'Vollständige Anpassung an die Vorlieben jedes Reisenden',
    'benefits.sales.title': 'Umsatzwachstum',
    'benefits.sales.desc': 'Zufriedenere Kunden, mehr Buchungen',
    
    // Pricing section
    'pricing.title': 'Wählen Sie den perfekten Plan für Ihre Agentur',
    'pricing.subtitle': 'Beginnen Sie mit einer 14-tägigen kostenlosen Testversion, keine Kreditkarte erforderlich',
    'pricing.popular': 'Am beliebtesten',
    'pricing.basic.name': 'BASIS',
    'pricing.basic.price': '€29',
    'pricing.basic.period': '/Monat',
    'pricing.basic.tagline': 'Perfekt für den Anfang',
    'pricing.premium.name': 'PREMIUM',
    'pricing.premium.price': '€59',
    'pricing.premium.period': '/Monat',
    'pricing.premium.tagline': 'Am beliebtesten',
    'pricing.enterprise.name': 'UNTERNEHMEN',
    'pricing.enterprise.price': '€99',
    'pricing.enterprise.period': '/Monat',
    'pricing.enterprise.tagline': 'Für große Agenturen',
    'pricing.choose': 'Wählen',
    'pricing.start': 'Kostenlos Starten',
    'pricing.demo': 'Demoversion ausprobieren',
    'pricing.contact': 'Kontakt aufnehmen',
    'pricing.details': 'Details',
    
    // Pricing features
    'features.basic.1': 'Bis zu 50 Kunden pro Monat',
    'features.basic.2': 'Persönlicher AI-Agent für jeden Kunden',
    'features.basic.3': 'Automatische Reiseplanung',
    'features.basic.4': 'Restaurant- und Aktivitätsbuchungen',
    'features.basic.5': 'E-Mail-Support',
    'features.premium.1': 'Unbegrenzte Kunden',
    'features.premium.2': 'Erweiterte AI-Agent mit Sprach-Chat',
    'features.premium.3': 'Alle Funktionen enthalten',
    'features.premium.4': 'Prioritäts-Support',
    'features.premium.5': 'Erweiterte Analysen',
    'features.enterprise.1': 'Komplette Agentur-Lösung',
    'features.enterprise.2': 'Marken-angepasster AI-Agent',
    'features.enterprise.3': 'Benutzerdefinierte Feature-Entwicklung',
    'features.enterprise.4': 'Dedicated Account Manager',
    'features.enterprise.5': 'Garantierte SLA',
    
    // Testimonials
    'testimonials.title': 'Was unsere Partner sagen',
    'testimonials.ana.content': 'Unsere Kunden sind fasziniert vom AI-Agenten. Es hat unsere Conversion-Rate um 70% erhöht.',
    'testimonials.ana.name': 'Ana Popescu',
    'testimonials.ana.role': 'Direktorin bei Dream Travel Agency',
    'testimonials.mihai.content': 'Trajecta hat unseren Planungsprozess vollständig automatisiert. Wir sparen ganze Stunden.',
    'testimonials.mihai.name': 'Mihai Ionescu',
    'testimonials.mihai.role': 'Gründer von Travel Expert SRL',
    'testimonials.elena.content': 'Das beste Tool für Agenturen. Kunden fühlen sich, als hätten sie ihren eigenen persönlichen Guide.',
    'testimonials.elena.name': 'Elena Dumitrescu',
    'testimonials.elena.role': 'Reiseberaterin bei Premium Tours',
    
    // CTA section
    'cta.title': 'Bereit, Ihren Kunden ihren eigenen AI-Agenten zu geben?',
    'cta.subtitle': 'Starten Sie heute Ihre kostenlose Testversion und sehen Sie, wie Trajecta das Reiseerlebnis transformiert',
    'cta.button': 'Kostenlose Testversion Starten - 14 Tage',
    
    // Footer
    'footer.product': 'Produkt',
    'footer.company': 'Unternehmen',
    'footer.support': 'Support',
    'footer.copyright': 'Alle Rechte vorbehalten.',
  },
  
  it: {
    // Header
    'header.about': 'Chi siamo',
    'header.features': 'Caratteristiche',
    'header.testimonials': 'Testimonianze',
    'header.login': 'Accedi',
    'header.register': 'Registrati',
    
    // Hero section
    'hero.badge': 'App #1 per viaggi personalizzati',
    'hero.title': 'Scopri il mondo con',
    'hero.subtitle': 'Un\'app di viaggio personalizzata che si adatta al tuo stile di vita. Dai gamer agli esploratori e senior - ognuno ha la sua parte di avventura.',
    'hero.users': '1000+ utenti',
    'hero.destinations': '500+ destinazioni',
    'hero.rating': '4.9/5 valutazione',
    'hero.start_planning': 'Inizia l\'Avventura',
    
    // Travel paths
    'paths.title': 'Un\'esperienza unica per ogni cliente',
    'paths.gamer': 'Percorso Gamer',
    'paths.explorer': 'Percorso Esploratore',
    'paths.beginner': 'Percorso Principiante',
    'paths.senior': 'Percorso Senior',
    'paths.choose': 'Scegli la tua avventura perfetta',
    
    // Benefits section
    'benefits.title': 'Perché le agenzie scelgono',
    'benefits.subtitle': 'Dai ai tuoi clienti il loro agente AI personale che comprende perfettamente le loro preferenze',
    'benefits.agent.title': 'Agente AI Personale',
    'benefits.agent.desc': 'Ogni cliente ottiene la propria guida virtuale intelligente',
    'benefits.planning.title': 'Pianificazione Automatizzata',
    'benefits.planning.desc': 'Prenotazioni istantanee presso ristoranti e attività',
    'benefits.experience.title': 'Esperienza Personalizzata',
    'benefits.experience.desc': 'Adattamento completo alle preferenze di ogni viaggiatore',
    'benefits.sales.title': 'Crescita delle Vendite',
    'benefits.sales.desc': 'Clienti più felici, più prenotazioni',
    
    // Pricing section
    'pricing.title': 'Scegli il piano perfetto per la tua agenzia',
    'pricing.subtitle': 'Inizia con una prova gratuita di 14 giorni, nessuna carta di credito richiesta',
    'pricing.popular': 'Più popolare',
    'pricing.basic.name': 'BASE',
    'pricing.basic.price': '€29',
    'pricing.basic.period': '/mese',
    'pricing.basic.tagline': 'Perfetto per iniziare',
    'pricing.premium.name': 'PREMIUM',
    'pricing.premium.price': '€59',
    'pricing.premium.period': '/mese',
    'pricing.premium.tagline': 'Più popolare',
    'pricing.enterprise.name': 'ENTERPRISE',
    'pricing.enterprise.price': '€99',
    'pricing.enterprise.period': '/mese',
    'pricing.enterprise.tagline': 'Per agenzie grandi',
    'pricing.choose': 'Scegli',
    'pricing.start': 'Inizia Gratis',
    'pricing.demo': 'Prova la versione demo',
    'pricing.contact': 'Contattaci',
    'pricing.details': 'Dettagli',
    
    // Pricing features
    'features.basic.1': 'Fino a 50 clienti al mese',
    'features.basic.2': 'Agente AI personale per ogni cliente',
    'features.basic.3': 'Pianificazione automatica dei viaggi',
    'features.basic.4': 'Prenotazioni ristoranti e attività',
    'features.basic.5': 'Supporto email',
    'features.premium.1': 'Clienti illimitati',
    'features.premium.2': 'Agente AI avanzato con chat vocale',
    'features.premium.3': 'Tutte le funzionalità incluse',
    'features.premium.4': 'Supporto prioritario',
    'features.premium.5': 'Analitiche avanzate',
    'features.enterprise.1': 'Soluzione completa per agenzie',
    'features.enterprise.2': 'Agente AI personalizzato per il brand',
    'features.enterprise.3': 'Sviluppo funzionalità personalizzate',
    'features.enterprise.4': 'Account manager dedicato',
    'features.enterprise.5': 'SLA garantito',
    
    // Testimonials
    'testimonials.title': 'Cosa dicono i nostri partner',
    'testimonials.ana.content': 'I nostri clienti sono affascinati dall\'agente AI. Ha aumentato il nostro tasso di conversione del 70%.',
    'testimonials.ana.name': 'Ana Popescu',
    'testimonials.ana.role': 'Direttrice presso Dream Travel Agency',
    'testimonials.mihai.content': 'Trajecta ha automatizzato completamente il nostro processo di pianificazione. Risparmiamo ore intere.',
    'testimonials.mihai.name': 'Mihai Ionescu',
    'testimonials.mihai.role': 'Fondatore di Travel Expert SRL',
    'testimonials.elena.content': 'Il miglior strumento per le agenzie. I clienti sentono di avere la loro guida personale.',
    'testimonials.elena.name': 'Elena Dumitrescu',
    'testimonials.elena.role': 'Consulente di Viaggio presso Premium Tours',
    
    // CTA section
    'cta.title': 'Pronto a dare ai tuoi clienti il loro agente AI?',
    'cta.subtitle': 'Inizia la tua prova gratuita oggi e vedi come Trajecta trasforma l\'esperienza di viaggio',
    'cta.button': 'Inizia Prova Gratuita - 14 Giorni',
    
    // Footer
    'footer.product': 'Prodotto',
    'footer.company': 'Azienda',
    'footer.support': 'Supporto',
    'footer.copyright': 'Tutti i diritti riservati.',
  },
  
  pt: {
    // Header
    'header.about': 'Sobre',
    'header.features': 'Características',
    'header.testimonials': 'Testemunhos',
    'header.login': 'Entrar',
    'header.register': 'Registrar',
    
    // Hero section
    'hero.badge': 'App #1 para viagens personalizadas',
    'hero.title': 'Descubra o mundo com',
    'hero.subtitle': 'Um aplicativo de viagem personalizado que se adapta ao seu estilo de vida. De gamers a exploradores e idosos - todos têm sua parte de aventura.',
    'hero.users': '1000+ usuários',
    'hero.destinations': '500+ destinos',
    'hero.rating': '4.9/5 avaliação',
    'hero.start_planning': 'Começar Aventura',
    
    // Travel paths
    'paths.title': 'Uma experiência única para cada cliente',
    'paths.gamer': 'Caminho Gamer',
    'paths.explorer': 'Caminho Explorador',
    'paths.beginner': 'Caminho Iniciante',
    'paths.senior': 'Caminho Sênior',
    'paths.choose': 'Escolha sua aventura perfeita',
    
    // Benefits section
    'benefits.title': 'Por que as agências escolhem',
    'benefits.subtitle': 'Dê aos seus clientes seu próprio agente AI pessoal que compreende perfeitamente suas preferências',
    'benefits.agent.title': 'Agente AI Pessoal',
    'benefits.agent.desc': 'Cada cliente recebe seu próprio guia virtual inteligente',
    'benefits.planning.title': 'Planejamento Automatizado',
    'benefits.planning.desc': 'Reservas instantâneas em restaurantes e atividades',
    'benefits.experience.title': 'Experiência Personalizada',
    'benefits.experience.desc': 'Adaptação completa às preferências de cada viajante',
    'benefits.sales.title': 'Crescimento de Vendas',
    'benefits.sales.desc': 'Clientes mais felizes, mais reservas',
    
    // Pricing section
    'pricing.title': 'Escolha o plano perfeito para sua agência',
    'pricing.subtitle': 'Comece com um teste gratuito de 14 dias, sem cartão de crédito necessário',
    'pricing.popular': 'Mais popular',
    'pricing.basic.name': 'BÁSICO',
    'pricing.basic.price': '€29',
    'pricing.basic.period': '/mês',
    'pricing.basic.tagline': 'Perfeito para começar',
    'pricing.premium.name': 'PREMIUM',
    'pricing.premium.price': '€59',
    'pricing.premium.period': '/mês',
    'pricing.premium.tagline': 'Mais popular',
    'pricing.enterprise.name': 'EMPRESA',
    'pricing.enterprise.price': '€99',
    'pricing.enterprise.period': '/mês',
    'pricing.enterprise.tagline': 'Para agências grandes',
    'pricing.choose': 'Escolher',
    'pricing.start': 'Começar Grátis',
    'pricing.demo': 'Experimente a versão demo',
    'pricing.contact': 'Contate-nos',
    'pricing.details': 'Detalhes',
    
    // Pricing features
    'features.basic.1': 'Até 50 clientes por mês',
    'features.basic.2': 'Agente AI pessoal para cada cliente',
    'features.basic.3': 'Planejamento automático de viagens',
    'features.basic.4': 'Reservas de restaurantes e atividades',
    'features.basic.5': 'Suporte por email',
    'features.premium.1': 'Clientes ilimitados',
    'features.premium.2': 'Agente AI avançado com chat de voz',
    'features.premium.3': 'Todas as funcionalidades incluídas',
    'features.premium.4': 'Suporte prioritário',
    'features.premium.5': 'Análises avançadas',
    'features.enterprise.1': 'Solução completa para agências',
    'features.enterprise.2': 'Agente AI personalizado para a marca',
    'features.enterprise.3': 'Desenvolvimento de recursos personalizados',
    'features.enterprise.4': 'Gerente de conta dedicado',
    'features.enterprise.5': 'SLA garantido',
    
    // Testimonials
    'testimonials.title': 'O que nossos parceiros dizem',
    'testimonials.ana.content': 'Nossos clientes estão fascinados com o agente AI. Aumentou nossa taxa de conversão em 70%.',
    'testimonials.ana.name': 'Ana Popescu',
    'testimonials.ana.role': 'Diretora na Dream Travel Agency',
    'testimonials.mihai.content': 'Trajecta automatizou completamente nosso processo de planejamento. Economizamos horas inteiras.',
    'testimonials.mihai.name': 'Mihai Ionescu',
    'testimonials.mihai.role': 'Fundador da Travel Expert SRL',
    'testimonials.elena.content': 'A melhor ferramenta para agências. Os clientes sentem que têm seu próprio guia pessoal.',
    'testimonials.elena.name': 'Elena Dumitrescu',
    'testimonials.elena.role': 'Consultora de Viagem na Premium Tours',
    
    // CTA section
    'cta.title': 'Pronto para dar aos seus clientes seu próprio agente AI?',
    'cta.subtitle': 'Comece seu teste gratuito hoje e veja como a Trajecta transforma a experiência de viagem',
    'cta.button': 'Começar Teste Gratuito - 14 Dias',
    
    // Footer
    'footer.product': 'Produto',
    'footer.company': 'Empresa',
    'footer.support': 'Suporte',
    'footer.copyright': 'Todos os direitos reservados.',
  },
  
  nl: {
    // Header
    'header.about': 'Over ons',
    'header.features': 'Functies',
    'header.testimonials': 'Getuigenissen',
    'header.login': 'Inloggen',
    'header.register': 'Registreren',
    
    // Hero section
    'hero.badge': '#1 App voor gepersonaliseerde reizen',
    'hero.title': 'Ontdek de wereld met',
    'hero.subtitle': 'Een gepersonaliseerde reis-app die zich aanpast aan jouw levensstijl. Van gamers tot ontdekkingsreizigers en senioren - iedereen heeft zijn deel van het avontuur.',
    'hero.users': '1000+ gebruikers',
    'hero.destinations': '500+ bestemmingen',
    'hero.rating': '4.9/5 beoordeling',
    'hero.start_planning': 'Begin Avontuur',
    
    // Travel paths
    'paths.title': 'Een unieke ervaring voor elke klant apart',
    'paths.gamer': 'Gamer Pad',
    'paths.explorer': 'Ontdekkingsreiziger Pad',
    'paths.beginner': 'Beginner Pad',
    'paths.senior': 'Senior Pad',
    'paths.choose': 'Kies je perfecte avontuur',
    
    // Benefits section
    'benefits.title': 'Waarom bureaus kiezen voor',
    'benefits.subtitle': 'Geef je klanten hun eigen persoonlijke AI-agent die hun voorkeuren perfect begrijpt',
    'benefits.agent.title': 'Persoonlijke AI-Agent',
    'benefits.agent.desc': 'Elke klant krijgt zijn eigen intelligente virtuele gids',
    'benefits.planning.title': 'Geautomatiseerde Planning',
    'benefits.planning.desc': 'Directe boekingen bij restaurants en activiteiten',
    'benefits.experience.title': 'Gepersonaliseerde Ervaring',
    'benefits.experience.desc': 'Volledige aanpassing aan de voorkeuren van elke reiziger',
    'benefits.sales.title': 'Verkoopgroei',
    'benefits.sales.desc': 'Gelukkigere klanten, meer boekingen',
    
    // Pricing section
    'pricing.title': 'Kies het perfecte plan voor je bureau',
    'pricing.subtitle': 'Begin met een gratis proefperiode van 14 dagen, geen creditcard vereist',
    'pricing.popular': 'Meest populair',
    'pricing.basic.name': 'BASIS',
    'pricing.basic.price': '€29',
    'pricing.basic.period': '/maand',
    'pricing.basic.tagline': 'Perfect om te beginnen',
    'pricing.premium.name': 'PREMIUM',
    'pricing.premium.price': '€59',
    'pricing.premium.period': '/maand',
    'pricing.premium.tagline': 'Meest populair',
    'pricing.enterprise.name': 'BEDRIJF',
    'pricing.enterprise.price': '€99',
    'pricing.enterprise.period': '/maand',
    'pricing.enterprise.tagline': 'Voor grote bureaus',
    'pricing.choose': 'Kiezen',
    'pricing.start': 'Gratis Beginnen',
    'pricing.demo': 'Probeer de demoversie',
    'pricing.contact': 'Neem contact op',
    'pricing.details': 'Details',
    
    // Pricing features
    'features.basic.1': 'Tot 50 klanten per maand',
    'features.basic.2': 'Persoonlijke AI-agent voor elke klant',
    'features.basic.3': 'Automatische reisplanning',
    'features.basic.4': 'Restaurant- en activiteitenboekingen',
    'features.basic.5': 'E-mail ondersteuning',
    'features.premium.1': 'Onbeperkte klanten',
    'features.premium.2': 'Geavanceerde AI-agent met spraakchat',
    'features.premium.3': 'Alle functies inbegrepen',
    'features.premium.4': 'Prioriteitsondersteuning',
    'features.premium.5': 'Geavanceerde analyses',
    'features.enterprise.1': 'Complete bureauoplossing',
    'features.enterprise.2': 'Merkspecifieke AI-agent',
    'features.enterprise.3': 'Aangepaste functie-ontwikkeling',
    'features.enterprise.4': 'Toegewijde accountmanager',
    'features.enterprise.5': 'Gegarandeerde SLA',
    
    // Testimonials
    'testimonials.title': 'Wat onze partners zeggen',
    'testimonials.ana.content': 'Onze klanten zijn gefascineerd door de AI-agent. Het heeft onze conversieratio met 70% verhoogd.',
    'testimonials.ana.name': 'Ana Popescu',
    'testimonials.ana.role': 'Directeur bij Dream Travel Agency',
    'testimonials.mihai.content': 'Trajecta heeft ons planningsproces volledig geautomatiseerd. We besparen hele uren.',
    'testimonials.mihai.name': 'Mihai Ionescu',
    'testimonials.mihai.role': 'Oprichter van Travel Expert SRL',
    'testimonials.elena.content': 'De beste tool voor bureaus. Klanten voelen dat ze hun eigen persoonlijke gids hebben.',
    'testimonials.elena.name': 'Elena Dumitrescu',
    'testimonials.elena.role': 'Reisconsultant bij Premium Tours',
    
    // CTA section
    'cta.title': 'Klaar om je klanten hun eigen AI-agent te geven?',
    'cta.subtitle': 'Start vandaag je gratis proefperiode en zie hoe Trajecta de reiservaring transformeert',
    'cta.button': 'Start Gratis Proefperiode - 14 Dagen',
    
    // Footer
    'footer.product': 'Product',
    'footer.company': 'Bedrijf',
    'footer.support': 'Ondersteuning',
    'footer.copyright': 'Alle rechten voorbehouden.',
  },
  
  pl: {
    // Header
    'header.about': 'O nas',
    'header.features': 'Funkcje',
    'header.testimonials': 'Opinie',
    'header.login': 'Zaloguj się',
    'header.register': 'Zarejestruj się',
    
    // Hero section
    'hero.badge': 'Aplikacja #1 dla spersonalizowanych podróży',
    'hero.title': 'Odkryj świat z',
    'hero.subtitle': 'Spersonalizowana aplikacja podróżnicza, która dostosowuje się do Twojego stylu życia. Od graczy po odkrywców i seniorów - każdy ma swoją część przygody.',
    'hero.users': '1000+ użytkowników',
    'hero.destinations': '500+ miejsc',
    'hero.rating': '4.9/5 ocena',
    'hero.start_planning': 'Rozpocznij Przygodę',
    
    // Travel paths
    'paths.title': 'Unikalna doświadczenie dla każdego klienta',
    'paths.gamer': 'Ścieżka Gracza',
    'paths.explorer': 'Ścieżka Odkrywcy',
    'paths.beginner': 'Ścieżka Początkującego',
    'paths.senior': 'Ścieżka Seniora',
    'paths.choose': 'Wybierz swoją idealną przygodę',
    
    // Benefits section
    'benefits.title': 'Dlaczego agencje wybierają',
    'benefits.subtitle': 'Daj swoim klientom własnego osobistego agenta AI, który doskonale rozumie ich preferencje',
    'benefits.agent.title': 'Osobisty Agent AI',
    'benefits.agent.desc': 'Każdy klient otrzymuje własnego inteligentnego wirtualnego przewodnika',
    'benefits.planning.title': 'Automatyczne Planowanie',
    'benefits.planning.desc': 'Natychmiastowe rezerwacje w restauracjach i atrakcjach',
    'benefits.experience.title': 'Spersonalizowane Doświadczenie',
    'benefits.experience.desc': 'Pełne dostosowanie do preferencji każdego podróżnego',
    'benefits.sales.title': 'Wzrost Sprzedaży',
    'benefits.sales.desc': 'Zadowoleni klienci, więcej rezerwacji',
    
    // Pricing section
    'pricing.title': 'Wybierz idealny plan dla swojej agencji',
    'pricing.subtitle': 'Zacznij z 14-dniowym bezpłatnym okresem próbnym, bez karty kredytowej',
    'pricing.popular': 'Najpopularniejszy',
    'pricing.basic.name': 'PODSTAWOWY',
    'pricing.basic.price': '€29',
    'pricing.basic.period': '/miesiąc',
    'pricing.basic.tagline': 'Idealny na start',
    'pricing.premium.name': 'PREMIUM',
    'pricing.premium.price': '€59',
    'pricing.premium.period': '/miesiąc',
    'pricing.premium.tagline': 'Najpopularniejszy',
    'pricing.enterprise.name': 'ENTERPRISE',
    'pricing.enterprise.price': '€99',
    'pricing.enterprise.period': '/miesiąc',
    'pricing.enterprise.tagline': 'Dla dużych agencji',
    'pricing.choose': 'Wybierz',
    'pricing.start': 'Zacznij Za Darmo',
    'pricing.demo': 'Wypróbuj wersję demonstracyjną',
    'pricing.contact': 'Skontaktuj się',
    'pricing.details': 'Szczegóły',
    
    // Pricing features
    'features.basic.1': 'Do 50 klientów miesięcznie',
    'features.basic.2': 'Osobisty agent AI dla każdego klienta',
    'features.basic.3': 'Automatyczne planowanie podróży',
    'features.basic.4': 'Rezerwacje restauracji i atrakcji',
    'features.basic.5': 'Wsparcie e-mail',
    'features.premium.1': 'Nieograniczeni klienci',
    'features.premium.2': 'Zaawansowany agent AI z czatem głosowym',
    'features.premium.3': 'Wszystkie funkcje włączone',
    'features.premium.4': 'Wsparcie priorytetowe',
    'features.premium.5': 'Zaawansowana analityka',
    'features.enterprise.1': 'Kompletne rozwiązanie dla agencji',
    'features.enterprise.2': 'Agent AI dostosowany do marki',
    'features.enterprise.3': 'Rozwój niestandardowych funkcji',
    'features.enterprise.4': 'Dedykowany menedżer konta',
    'features.enterprise.5': 'Gwarantowane SLA',
    
    // Testimonials
    'testimonials.title': 'Co mówią nasi partnerzy',
    'testimonials.ana.content': 'Nasi klienci są zafascynowani agentem AI. Zwiększył naszą konwersję o 70%.',
    'testimonials.ana.name': 'Ana Popescu',
    'testimonials.ana.role': 'Dyrektor w Dream Travel Agency',
    'testimonials.mihai.content': 'Trajecta całkowicie zautomatyzowała nasz proces planowania. Oszczędzamy całe godziny.',
    'testimonials.mihai.name': 'Mihai Ionescu',
    'testimonials.mihai.role': 'Założyciel Travel Expert SRL',
    'testimonials.elena.content': 'Najlepsze narzędzie dla agencji. Klienci czują, że mają własnego osobistego przewodnika.',
    'testimonials.elena.name': 'Elena Dumitrescu',
    'testimonials.elena.role': 'Konsultant Podróży w Premium Tours',
    
    // CTA section
    'cta.title': 'Gotowy dać swoim klientom własnego agenta AI?',
    'cta.subtitle': 'Rozpocznij bezpłatny okres próbny już dziś i zobacz, jak Trajecta przekształca doświadczenie podróżnicze',
    'cta.button': 'Rozpocznij Bezpłatny Okres Próbny - 14 Dni',
    
    // Footer
    'footer.product': 'Produkt',
    'footer.company': 'Firma',
    'footer.support': 'Wsparcie',
    'footer.copyright': 'Wszystkie prawa zastrzeżone.',
  },
  
  cs: {
    // Header
    'header.about': 'O nás',
    'header.features': 'Funkce',
    'header.testimonials': 'Reference',
    'header.login': 'Přihlásit se',
    'header.register': 'Registrovat se',
    
    // Hero section
    'hero.badge': 'Aplikace #1 pro personalizované cestování',
    'hero.title': 'Objevte svět s',
    'hero.subtitle': 'Personalizovaná cestovní aplikace, která se přizpůsobí vašemu životnímu stylu. Od hráčů po průzkumníky a seniory - každý má svůj díl dobrodružství.',
    'hero.users': '1000+ uživatelů',
    'hero.destinations': '500+ destinací',
    'hero.rating': '4.9/5 hodnocení',
    'hero.start_planning': 'Začít Dobrodružství',
    
    // Travel paths
    'paths.title': 'Jedinečné zkušení pro každého klienta',
    'paths.gamer': 'Hráčská Cesta',
    'paths.explorer': 'Průzkumná Cesta',
    'paths.beginner': 'Začátečnická Cesta',
    'paths.senior': 'Seniorská Cesta',
    'paths.choose': 'Vyberte si své dokonalé dobrodružství',
    
    // Benefits section
    'benefits.title': 'Proč agentury volí',
    'benefits.subtitle': 'Dejte svým klientům vlastního osobního AI agenta, který dokonale rozumí jejich preferencím',
    'benefits.agent.title': 'Osobní AI Agent',
    'benefits.agent.desc': 'Každý klient dostane svého vlastního inteligentního virtuálního průvodce',
    'benefits.planning.title': 'Automatické Plánování',
    'benefits.planning.desc': 'Okamžité rezervace v restauracích a aktivitách',
    'benefits.experience.title': 'Personalizovaná Zkušenost',
    'benefits.experience.desc': 'Úplné přizpůsobení preferencím každého cestovatele',
    'benefits.sales.title': 'Růst Prodeje',
    'benefits.sales.desc': 'Spokojenější klienti, více rezervací',
    
    // Pricing section
    'pricing.title': 'Vyberte si dokonalý plán pro vaši agenturu',
    'pricing.subtitle': 'Začněte s 14denní bezplatnou zkušební verzí, bez kreditní karty',
    'pricing.popular': 'Nejpopulárnější',
    'pricing.basic.name': 'ZÁKLADNÍ',
    'pricing.basic.price': '€29',
    'pricing.basic.period': '/měsíc',
    'pricing.basic.tagline': 'Perfektní pro začátek',
    'pricing.premium.name': 'PREMIUM',
    'pricing.premium.price': '€59',
    'pricing.premium.period': '/měsíc',
    'pricing.premium.tagline': 'Nejpopulárnější',
    'pricing.enterprise.name': 'ENTERPRISE',
    'pricing.enterprise.price': '€99',
    'pricing.enterprise.period': '/měsíc',
    'pricing.enterprise.tagline': 'Pro velké agentury',
    'pricing.choose': 'Vybrat',
    'pricing.start': 'Začít Zdarma',
    'pricing.demo': 'Vyzkoušet zdarma',
    'pricing.contact': 'Kontaktujte nás',
    'pricing.details': 'Detaily',
    
    // Pricing features
    'features.basic.1': 'Až 50 klientů měsíčně',
    'features.basic.2': 'Osobní AI agent pro každého klienta',
    'features.basic.3': 'Automatické plánování cest',
    'features.basic.4': 'Rezervace restaurací a aktivit',
    'features.basic.5': 'E-mailová podpora',
    'features.premium.1': 'Neomezení klienti',
    'features.premium.2': 'Pokročilý AI agent s hlasovým chatem',
    'features.premium.3': 'Všechny funkce zahrnuty',
    'features.premium.4': 'Prioritní podpora',
    'features.premium.5': 'Pokročilé analýzy',
    'features.enterprise.1': 'Kompletní řešení pro agentury',
    'features.enterprise.2': 'AI agent přizpůsobený značce',
    'features.enterprise.3': 'Vývoj vlastních funkcí',
    'features.enterprise.4': 'Dedikovaný správce účtu',
    'features.enterprise.5': 'Garantované SLA',
    
    // Testimonials
    'testimonials.title': 'Co říkají naši partneři',
    'testimonials.ana.content': 'Naši klienti jsou fascinováni AI agentem. Zvýšil naši konverzní míru o 70%.',
    'testimonials.ana.name': 'Ana Popescu',
    'testimonials.ana.role': 'Ředitelka v Dream Travel Agency',
    'testimonials.mihai.content': 'Trajecta úplně automatizovala náš plánovací proces. Šetříme celé hodiny.',
    'testimonials.mihai.name': 'Mihai Ionescu',
    'testimonials.mihai.role': 'Zakladatel Travel Expert SRL',
    'testimonials.elena.content': 'Nejlepší nástroj pro agentury. Klienti cítí, že mají vlastního osobního průvodce.',
    'testimonials.elena.name': 'Elena Dumitrescu',
    'testimonials.elena.role': 'Cestovní poradce v Premium Tours',
    
    // CTA section
    'cta.title': 'Připraveni dát svým klientům vlastního AI agenta?',
    'cta.subtitle': 'Začněte bezplatnou zkušební verzi dnes a uvidíte, jak Trajecta transformuje cestovní zážitek',
    'cta.button': 'Začít Bezplatnou Zkušební Verzi - 14 Dní',
    
    // Footer
    'footer.product': 'Produkt',
    'footer.company': 'Společnost',
    'footer.support': 'Podpora',
    'footer.copyright': 'Všechna práva vyhrazena.',
  },
  
  hu: {
    // Header
    'header.about': 'Rólunk',
    'header.features': 'Funkciók',
    'header.testimonials': 'Referenciák',
    'header.login': 'Bejelentkezés',
    'header.register': 'Regisztráció',
    
    // Hero section
    'hero.badge': '#1 alkalmazás személyre szabott utazásokhoz',
    'hero.title': 'Fedezd fel a világot a',
    'hero.subtitle': 'Személyre szabott utazási alkalmazás, amely alkalmazkodik az életstílusodhoz. A gamerektől a felfedezőkig és idősekig - mindenkinek megvan a maga kalandja.',
    'hero.users': '1000+ felhasználó',
    'hero.destinations': '500+ úti cél',
    'hero.rating': '4.9/5 értékelés',
    'hero.start_planning': 'Kaland Kezdése',
    
    // Travel paths
    'paths.title': 'Egyedi utazási élmény minden ügyfél számára',
    'paths.gamer': 'Gamer Útvonal',
    'paths.explorer': 'Felfedező Útvonal',
    'paths.beginner': 'Kezdő Útvonal',
    'paths.senior': 'Senior Útvonal',
    'paths.choose': 'Válaszd ki a tökéletes kalandodat',
    
    // Benefits section
    'benefits.title': 'Miért választják az ügynökségek a',
    'benefits.subtitle': 'Add meg ügyfeleinek saját személyes AI ügynöküket, aki tökéletesen érti preferenciáikat',
    'benefits.agent.title': 'Személyes AI Ügynök',
    'benefits.agent.desc': 'Minden ügyfél megkapja saját intelligens virtuális útmutatóját',
    'benefits.planning.title': 'Automatikus Tervezés',
    'benefits.planning.desc': 'Azonnali foglalások éttermekben és tevékenységeknél',
    'benefits.experience.title': 'Személyre Szabott Élmény',
    'benefits.experience.desc': 'Teljes alkalmazkodás minden utazó preferenciáihoz',
    'benefits.sales.title': 'Értékesítési Növekedés',
    'benefits.sales.desc': 'Boldogabb ügyfelek, több foglalás',
    
    // Pricing section
    'pricing.title': 'Válaszd ki a tökéletes tervet ügynökséged számára',
    'pricing.subtitle': 'Kezdj egy 14 napos ingyenes próbaverzióval, hitelkártya nem szükséges',
    'pricing.popular': 'Legnépszerűbb',
    'pricing.basic.name': 'ALAP',
    'pricing.basic.price': '€29',
    'pricing.basic.period': '/hónap',
    'pricing.basic.tagline': 'Tökéletes kezdéshez',
    'pricing.premium.name': 'PRÉMIUM',
    'pricing.premium.price': '€59',
    'pricing.premium.period': '/hónap',
    'pricing.premium.tagline': 'Legnépszerűbb',
    'pricing.enterprise.name': 'VÁLLALATI',
    'pricing.enterprise.price': '€99',
    'pricing.enterprise.period': '/hónap',
    'pricing.enterprise.tagline': 'Nagy ügynökségeknek',
    'pricing.choose': 'Választás',
    'pricing.start': 'Ingyenes Kezdés',
    'pricing.demo': 'Próbáld ki a demoverziót',
    'pricing.contact': 'Kapcsolat',
    'pricing.details': 'Részletek',
    
    // Pricing features
    'features.basic.1': 'Akár 50 ügyfél havonta',
    'features.basic.2': 'Személyes AI ügynök minden ügyfélnek',
    'features.basic.3': 'Automatikus utazástervezés',
    'features.basic.4': 'Étterem és tevékenység foglalások',
    'features.basic.5': 'Email támogatás',
    'features.premium.1': 'Korlátlan ügyfelek',
    'features.premium.2': 'Fejlett AI ügynök hang chattel',
    'features.premium.3': 'Minden funkció mellékelve',
    'features.premium.4': 'Prioritásos támogatás',
    'features.premium.5': 'Fejlett analitika',
    'features.enterprise.1': 'Teljes ügynökségi megoldás',
    'features.enterprise.2': 'Márka-specifikus AI ügynök',
    'features.enterprise.3': 'Egyedi funkció fejlesztés',
    'features.enterprise.4': 'Dedikált fiókkezelő',
    'features.enterprise.5': 'Garantált SLA',
    
    // Testimonials
    'testimonials.title': 'Mit mondanak partnereink',
    'testimonials.ana.content': 'Ügyfeleink lenyűgözve vannak az AI ügynöktől. 70%-kal növelte konverziós arányunkat.',
    'testimonials.ana.name': 'Ana Popescu',
    'testimonials.ana.role': 'Igazgató a Dream Travel Agency-nél',
    'testimonials.mihai.content': 'A Trajecta teljesen automatizálta tervezési folyamatunkat. Egész órákat takarítunk meg.',
    'testimonials.mihai.name': 'Mihai Ionescu',
    'testimonials.mihai.role': 'A Travel Expert SRL alapítója',
    'testimonials.elena.content': 'A legjobb eszköz ügynökségeknek. Az ügyfelek úgy érzik, van saját személyes útmutatójuk.',
    'testimonials.elena.name': 'Elena Dumitrescu',
    'testimonials.elena.role': 'Utazási tanácsadó a Premium Tours-nál',
    
    // CTA section
    'cta.title': 'Készen állsz arra, hogy ügyfeleidnek saját AI ügynököt adj?',
    'cta.subtitle': 'Kezdd el ingyenes próbaverziód ma és nézd meg, hogyan alakítja át a Trajecta az utazási élményt',
    'cta.button': 'Ingyenes Próbaverzió Kezdése - 14 Nap',
    
    // Footer
    'footer.product': 'Termék',
    'footer.company': 'Cég',
    'footer.support': 'Támogatás',
    'footer.copyright': 'Minden jog fenntartva.',
  },
  
  hr: {
    // Header
    'header.about': 'O nama',
    'header.features': 'Značajke',
    'header.testimonials': 'Svjedočanstva',
    'header.login': 'Prijava',
    'header.register': 'Registracija',
    
    // Hero section
    'hero.badge': 'Aplikacija #1 za personalizirana putovanja',
    'hero.title': 'Otkrijte svijet s',
    'hero.subtitle': 'Personalizirana aplikacija za putovanja koja se prilagođava vašem načinu života. Od gejmera do istraživača i seniora - svatko ima svoj dio avanture.',
    'hero.users': '1000+ korisnika',
    'hero.destinations': '500+ odredišta',
    'hero.rating': '4.9/5 ocjena',
    'hero.start_planning': 'Započni Avanturu',
    
    // Travel paths
    'paths.title': 'Jedinstveno putovanje za svakog klijenta',
    'paths.gamer': 'Gejmerski Put',
    'paths.explorer': 'Istraživački Put',
    'paths.beginner': 'Kezdő Útvonal',
    'paths.senior': 'Senior Útvonal',
    'paths.choose': 'Odaberite svoju savršenu avanturu',
    
    // Benefits section
    'benefits.title': 'Zašto agencije biraju',
    'benefits.subtitle': 'Dajte svojim klijentima vlastitog osobnog AI agenta koji savršeno razumije njihove preferencije',
    'benefits.agent.title': 'Osobni AI Agent',
    'benefits.agent.desc': 'Svaki klijent dobiva vlastitog inteligentnog virtualnog vodiča',
    'benefits.planning.title': 'Automatsko Planiranje',
    'benefits.planning.desc': 'Trenutne rezervacije u restoranima i aktivnostima',
    'benefits.experience.title': 'Personalizirano Iskustvo',
    'benefits.experience.desc': 'Potpuno prilagođavanje preferencijama svakog putnika',
    'benefits.sales.title': 'Rast Prodaje',
    'benefits.sales.desc': 'Sretniji klijenti, više rezervacija',
    
    // Pricing section
    'pricing.title': 'Odaberite savršen plan za svoju agenciju',
    'pricing.subtitle': 'Počnite s 14-dnevnim besplatnim probnim periodom, bez kreditne kartice',
    'pricing.popular': 'Najpopularniji',
    'pricing.basic.name': 'OSNOVNI',
    'pricing.basic.price': '€29',
    'pricing.basic.period': '/mjesec',
    'pricing.basic.tagline': 'Savršen za početak',
    'pricing.premium.name': 'PREMIUM',
    'pricing.premium.price': '€59',
    'pricing.premium.period': '/mjesec',
    'pricing.premium.tagline': 'Najpopularniji',
    'pricing.enterprise.name': 'POSLOVNI',
    'pricing.enterprise.price': '€99',
    'pricing.enterprise.period': '/mjesec',
    'pricing.enterprise.tagline': 'Za velike agencije',
    'pricing.choose': 'Odaberi',
    'pricing.start': 'Počni Besplatno',
    'pricing.demo': 'Iskusni probni period',
    'pricing.contact': 'Kontaktirajte nas',
    'pricing.details': 'Detalji',
    
    // Pricing features
    'features.basic.1': 'Do 50 klijenata mjesečno',
    'features.basic.2': 'Osobni AI agent za svakog klijenta',
    'features.basic.3': 'Automatsko planiranje putovanja',
    'features.basic.4': 'Rezervacije restorana i aktivnosti',
    'features.basic.5': 'Email podrška',
    'features.premium.1': 'Neograničeni klijenti',
    'features.premium.2': 'Napredni AI agent s glasovnim chatom',
    'features.premium.3': 'Sve značajke uključene',
    'features.premium.4': 'Prioritetna podrška',
    'features.premium.5': 'Napredna analitika',
    'features.enterprise.1': 'Kompletno rješenje za agencije',
    'features.enterprise.2': 'AI agent prilagođen brendu',
    'features.enterprise.3': 'Razvoj prilagođenih značajki',
    'features.enterprise.4': 'Posvećeni upravitelj računa',
    'features.enterprise.5': 'Garantovani SLA',
    
    // Testimonials
    'testimonials.title': 'Što kažu naši partneri',
    'testimonials.ana.content': 'Naši klijenti su fascinirani AI agentom. Povećao je našu stopu konverzije za 70%.',
    'testimonials.ana.name': 'Ana Popescu',
    'testimonials.ana.role': 'Direktorica u Dream Travel Agency',
    'testimonials.mihai.content': 'Trajecta je potpuno automatizirala naš proces planiranja. Štedimo cijele sate.',
    'testimonials.mihai.name': 'Mihai Ionescu',
    'testimonials.mihai.role': 'Osnivač Travel Expert SRL',
    'testimonials.elena.content': 'Najbolji alat za agencije. Klijenti osjećaju da imaju vlastitog osobnog vodiča.',
    'testimonials.elena.name': 'Elena Dumitrescu',
    'testimonials.elena.role': 'Putni savjetnik u Premium Tours',
    
    // CTA section
    'cta.title': 'Spremni dati svojim klijentima vlastitog AI-agenta?',
    'cta.subtitle': 'Počnite svoj besplatni probni period danas i vidite kako Trajecta transformira putničko iskustvo',
    'cta.button': 'Počni Besplatni Probni Period - 14 Dana',
    
    // Footer
    'footer.product': 'Proizvod',
    'footer.company': 'Tvrtka',
    'footer.support': 'Podrška',
    'footer.copyright': 'Sva prava pridržana.',
  },
  
  bg: {
    // Header
    'header.about': 'За нас',
    'header.features': 'Функции',
    'header.testimonials': 'Отзиви',
    'header.login': 'Вход',
    'header.register': 'Регистрация',
    
    // Hero section
    'hero.badge': 'Приложение #1 за персонализирани пътувания',
    'hero.title': 'Открийте света с',
    'hero.subtitle': 'Персонализирано приложение за пътувания, което се адаптира към вашия начин на живот. От геймъри до изследователи и възрастни - всеки има своя дял от приключенията.',
    'hero.users': '1000+ потребители',
    'hero.destinations': '500+ дестинации',
    'hero.rating': '4.9/5 оценка',
    'hero.start_planning': 'Започни Приключението',
    
    // Travel paths
    'paths.title': 'Уникално пътуване за всеки клиент поотделно',
    'paths.gamer': 'Геймърски Път',
    'paths.explorer': 'Изследователски Път',
    'paths.beginner': 'Начинаещ Път',
    'paths.senior': 'Възрастен Път',
    'paths.choose': 'Изберете вашето перфектно приключение',
    
    // Benefits section
    'benefits.title': 'Защо агенциите избират',
    'benefits.subtitle': 'Дайте на клиентите си собствен личен AI агент, който перфектно разбира техните предпочитания',
    'benefits.agent.title': 'Личен AI Агент',
    'benefits.agent.desc': 'Всеки клиент получава собствен интелигентен виртуален водач',
    'benefits.planning.title': 'Автоматично Планиране',
    'benefits.planning.desc': 'Моментални резервации в ресторанти и дейности',
    'benefits.experience.title': 'Персонализирано Изживяване',
    'benefits.experience.desc': 'Пълно адаптиране към предпочитанията на всеки пътешественик',
    'benefits.sales.title': 'Растеж на Продажбите',
    'benefits.sales.desc': 'По-щастливи клиенти, повече резервации',
    
    // Pricing section
    'pricing.title': 'Изберете перфектния план за вашата агенция',
    'pricing.subtitle': 'Започнете с 14-дневен безплатен пробен период, без кредитна карта',
    'pricing.popular': 'Най-популярен',
    'pricing.basic.name': 'ОСНОВЕН',
    'pricing.basic.price': '€29',
    'pricing.basic.period': '/месец',
    'pricing.basic.tagline': 'Перфектен за започване',
    'pricing.premium.name': 'ПРЕМИУМ',
    'pricing.premium.price': '€59',
    'pricing.premium.period': '/месец',
    'pricing.premium.tagline': 'Най-популярен',
    'pricing.enterprise.name': 'КОРПОРАТИВЕН',
    'pricing.enterprise.price': '€99',
    'pricing.enterprise.period': '/месец',
    'pricing.enterprise.tagline': 'За големи агенции',
    'pricing.choose': 'Избери',
    'pricing.start': 'Започни Безплатно',
    'pricing.demo': 'Пробвайте демоверсията',
    'pricing.contact': 'Свържете се с нас',
    'pricing.details': 'Детайли',
    
    // Pricing features
    'features.basic.1': 'До 50 клиента месечно',
    'features.basic.2': 'Личен AI агент за всеки клиент',
    'features.basic.3': 'Автоматично планиране на пътувания',
    'features.basic.4': 'Резервации на ресторанти и дейности',
    'features.basic.5': 'Имейл поддръжка',
    'features.premium.1': 'Неограничени клиенти',
    'features.premium.2': 'Напреднал AI агент с гласов чат',
    'features.premium.3': 'Всички функции включени',
    'features.premium.4': 'Приоритетна поддръжка',
    'features.premium.5': 'Напреднала аналитика',
    'features.enterprise.1': 'Пълно решение за агенции',
    'features.enterprise.2': 'AI агент адаптиран към бранда',
    'features.enterprise.3': 'Разработка на персонализирани функции',
    'features.enterprise.4': 'Отделен мениджър на акаунта',
    'features.enterprise.5': 'Гарантирано SLA',
    
    // Testimonials
    'testimonials.title': 'Какво казват нашите партньори',
    'testimonials.ana.content': 'Нашите клиенти са очаровани от AI агента. Увеличи конверсията ни с 70%.',
    'testimonials.ana.name': 'Ana Popescu',
    'testimonials.ana.role': 'Директор в Dream Travel Agency',
    'testimonials.mihai.content': 'Trajecta напълно автоматизира процеса ни на планиране. Спестяваме цели часове.',
    'testimonials.mihai.name': 'Mihai Ionescu',
    'testimonials.mihai.role': 'Основател на Travel Expert SRL',
    'testimonials.elena.content': 'Най-добрият инструмент за агенции. Клиентите чувстват, че имат собствен личен водач.',
    'testimonials.elena.name': 'Elena Dumitrescu',
    'testimonials.elena.role': 'Пътен консултант в Premium Tours',
    
    // CTA section
    'cta.title': 'Готови ли сте да дадете на клиентите си собствен AI агент?',
    'cta.subtitle': 'Започнете безплатния си пробен период днес и вижте как Trajecta трансформира пътническото изживяване',
    'cta.button': 'Започни Безплатен Пробен Период - 14 Дни',
    
    // Footer
    'footer.product': 'Продукт',
    'footer.company': 'Компания',
    'footer.support': 'Поддръжка',
    'footer.copyright': 'Всички права запазени.',
  },
  
  el: {
    // Header
    'header.about': 'Σχετικά',
    'header.features': 'Χαρακτηριστικά',
    'header.testimonials': 'Μαρτυρίες',
    'header.login': 'Σύνδεση',
    'header.register': 'Εγγραφή',
    
    // Hero section
    'hero.badge': 'Εφαρμογή #1 για εξατομικευμένα ταξίδια',
    'hero.title': 'Ανακαλύψτε τον κόσμο με',
    'hero.subtitle': 'Μια εξατομικευμένη εφαρμογή ταξιδιών που προσαρμόζεται στον τρόπο ζωής σας. Από παίκτες μέχρι εξερευνητές και ηλικιωμένους - ο καθένας έχει το μερίδιό του από περιπέτεια.',
    'hero.users': '1000+ χρήστες',
    'hero.destinations': '500+ προορισμοί',
    'hero.rating': '4.9/5 αξιολόγηση',
    'hero.start_planning': 'Ξεκινήστε την Περιπέτεια',
    
    // Travel paths
    'paths.title': 'Εξατομικευμένη Εμπειρία για κάθε πελάτη',
    'paths.gamer': 'Μονοπάτι Παίκτη',
    'paths.explorer': 'Μονοπάτι Εξερευνητή',
    'paths.beginner': 'Μονοπάτι Αρχαρίου',
    'paths.senior': 'Μονοπάτι Ηλικιωμένου',
    'paths.choose': 'Επιλέξτε την τέλεια περιπέτειά σας',
    
    // Benefits section
    'benefits.title': 'Γιατί τα πρακτορεία επιλέγουν',
    'benefits.subtitle': 'Δώστε στους πελάτες σας τον δικό τους προσωπικό AI πράκτορα που κατανοεί τέλεια τις προτιμήσεις τους',
    'benefits.agent.title': 'Προσωπικός AI Πράκτορας',
    'benefits.agent.desc': 'Κάθε πελάτης λαμβάνει τον δικό του έξυπνο εικονικό οδηγό',
    'benefits.planning.title': 'Αυτόματος Προγραμματισμός',
    'benefits.planning.desc': 'Άμεσες κρατήσεις σε εστιατόρια και δραστηριότητες',
    'benefits.experience.title': 'Εξατομικευμένη Εμπειρία',
    'benefits.experience.desc': 'Πλήρης προσαρμογή στις προτιμήσεις κάθε ταξιδιώτη',
    'benefits.sales.title': 'Αύξηση Πωλήσεων',
    'benefits.sales.desc': 'Πιο ευχαριστημένοι πελάτες, περισσότερες κρατήσεις',
    
    // Pricing section
    'pricing.title': 'Επιλέξτε το τέλειο πλάνο για το πρακτορείό σας',
    'pricing.subtitle': 'Ξεκινήστε με 14ήμερη δωρεάν δοκιμή, χωρίς πιστωτική κάρτα',
    'pricing.popular': 'Πιο δημοφιλές',
    'pricing.basic.name': 'ΒΑΣΙΚΟ',
    'pricing.basic.price': '€29',
    'pricing.basic.period': '/μήνα',
    'pricing.basic.tagline': 'Τέλειο για αρχή',
    'pricing.premium.name': 'PREMIUM',
    'pricing.premium.price': '€59',
    'pricing.premium.period': '/μήνα',
    'pricing.premium.tagline': 'Πιο δημοφιλές',
    'pricing.enterprise.name': 'ΕΠΙΧΕΙΡΗΣΗ',
    'pricing.enterprise.price': '€99',
    'pricing.enterprise.period': '/μήνα',
    'pricing.enterprise.tagline': 'Για μεγάλα πρακτορεία',
    'pricing.choose': 'Επιλογή',
    'pricing.start': 'Ξεκινήστε Δωρεάν',
    'pricing.demo': 'Δοκιμή δωρεάν',
    'pricing.contact': 'Επικοινωνήστε μαζί μας',
    'pricing.details': 'Λεπτομέρειες',
    
    // Pricing features
    'features.basic.1': 'Έως 50 πελάτες μηνιαίως',
    'features.basic.2': 'Προσωπικός AI πράκτορας για κάθε πελάτη',
    'features.basic.3': 'Αυτόματος προγραμματισμός ταξιδιών',
    'features.basic.4': 'Κρατήσεις εστιατορίων και δραστηριοτήτων',
    'features.basic.5': 'Υποστήριξη email',
    'features.premium.1': 'Απεριόριστοι πελάτες',
    'features.premium.2': 'Προηγμένος AI πράκτορας με φωνητικό chat',
    'features.premium.3': 'Όλες οι λειτουργίες συμπεριλαμβάνονται',
    'features.premium.4': 'Προτεραιότητα υποστήριξης',
    'features.premium.5': 'Προηγμένα αναλυτικά',
    'features.enterprise.1': 'Πλήρης λύση για πρακτορεία',
    'features.enterprise.2': 'AI πράκτορας προσαρμοσμένος στη μάρκα',
    'features.enterprise.3': 'Ανάπτυξη προσαρμοσμένων χαρακτηριστικών',
    'features.enterprise.4': 'Αφοσιωμένος διαχειριστής λογαριασμού',
    'features.enterprise.5': 'Εγγυημένο SLA',
    
    // Testimonials
    'testimonials.title': 'Τι λένε οι συνεργάτες μας',
    'testimonials.ana.content': 'Οι πελάτες μας είναι γοητευμένοι από τον AI πράκτορα. Αύξησε το ποσοστό μετατροπής μας κατά 70%.',
    'testimonials.ana.name': 'Ana Popescu',
    'testimonials.ana.role': 'Διευθύντρια στο Dream Travel Agency',
    'testimonials.mihai.content': 'Η Trajecta αυτοματοποίησε πλήρως τη διαδικασία προγραμματισμού μας. Εξοικονομούμε ολόκληρες ώρες.',
    'testimonials.mihai.name': 'Mihai Ionescu',
    'testimonials.mihai.role': 'Ιδρυτής της Travel Expert SRL',
    'testimonials.elena.content': 'Το καλύτερο εργαλείο για πρακτορεία. Οι πελάτες αισθάνονται ότι έχουν τον δικό τους προσωπικό οδηγό.',
    'testimonials.elena.name': 'Elena Dumitrescu',
    'testimonials.elena.role': 'Σύμβουλος Ταξιδιών στην Premium Tours',
    
    // CTA section
    'cta.title': 'Έτοιμοι να δώσετε στους πελάτες σας τον δικό τους AI πράκτορα;',
    'cta.subtitle': 'Ξεκινήστε τη δωρεάν δοκιμή σας σήμερα και δείτε πώς η Trajecta μεταμορφώνει την ταξιδιωτική εμπειρία',
    'cta.button': 'Ξεκινήστε Δωρεάν Δοκιμή - 14 Ημέρες',
    
    // Footer
    'footer.product': 'Προϊόν',
    'footer.company': 'Εταιρεία',
    'footer.support': 'Υποστήριξη',
    'footer.copyright': 'Όλα τα δικαιώματα διατηρούνται.',
  },
  
  ru: {
    // Header
    'header.about': 'О нас',
    'header.features': 'Возможности',
    'header.testimonials': 'Отзывы',
    'header.login': 'Вход',
    'header.register': 'Регистрация',
    
    // Hero section
    'hero.badge': 'Приложение #1 для персонализированных путешествий',
    'hero.title': 'Откройте мир с',
    'hero.subtitle': 'Персонализированное приложение для путешествий, которое адаптируется к вашему образу жизни. От геймеров до исследователей и пожилых людей - у каждого есть своя доля приключений.',
    'hero.users': '1000+ пользователей',
    'hero.destinations': '500+ направлений',
    'hero.rating': '4.9/5 рейтинг',
    'hero.start_planning': 'Начать Приключение',
    
    // Travel paths
    'paths.title': 'Уникальное путешествие для каждого клиента',
    'paths.gamer': 'Путь Геймера',
    'paths.explorer': 'Путь Исследователя',
    'paths.beginner': 'Путь Новичка',
    'paths.senior': 'Путь Пожилого',
    'paths.choose': 'Выберите ваше идеальное приключение',
    
    // Benefits section
    'benefits.title': 'Почему агентства выбирают',
    'benefits.subtitle': 'Дайте своим клиентам собственного персонального AI агента, который идеально понимает их предпочтения',
    'benefits.agent.title': 'Персональный AI Агент',
    'benefits.agent.desc': 'Каждый клиент получает собственного интеллектуального виртуального гида',
    'benefits.planning.title': 'Автоматическое Планирование',
    'benefits.planning.desc': 'Мгновенные бронирования в ресторанах и активностях',
    'benefits.experience.title': 'Персонализированный Опыт',
    'benefits.experience.desc': 'Полная адаптация к предпочтениям каждого путешественника',
    'benefits.sales.title': 'Рост Продаж',
    'benefits.sales.desc': 'Более счастливые клиенты, больше бронирований',
    
    // Pricing section
    'pricing.title': 'Выберите идеальный план для вашего агентства',
    'pricing.subtitle': 'Начните с 14-дневного бесплатного пробного периода, кредитная карта не требуется',
    'pricing.popular': 'Самый популярный',
    'pricing.basic.name': 'БАЗОВЫЙ',
    'pricing.basic.price': '€29',
    'pricing.basic.period': '/месяц',
    'pricing.basic.tagline': 'Идеально для начала',
    'pricing.premium.name': 'ПРЕМИУМ',
    'pricing.premium.price': '€59',
    'pricing.premium.period': '/месяц',
    'pricing.premium.tagline': 'Самый популярный',
    'pricing.enterprise.name': 'КОРПОРАТИВНЫЙ',
    'pricing.enterprise.price': '€99',
    'pricing.enterprise.period': '/месяц',
    'pricing.enterprise.tagline': 'Для крупных агентств',
    'pricing.choose': 'Выбрать',
    'pricing.start': 'Начать Бесплатно',
    'pricing.demo': 'Демоверсия',
    'pricing.contact': 'Свяжитесь с нами',
    'pricing.details': 'Детали',
    
    // Pricing features
    'features.basic.1': 'До 50 клиентов в месяц',
    'features.basic.2': 'Персональный AI агент для каждого клиента',
    'features.basic.3': 'Автоматическое планирование путешествий',
    'features.basic.4': 'Бронирование ресторанов и активностей',
    'features.basic.5': 'Поддержка по email',
    'features.premium.1': 'Неограниченные клиенты',
    'features.premium.2': 'Продвинутый AI агент с голосовым чатом',
    'features.premium.3': 'Все функции включены',
    'features.premium.4': 'Приоритетная поддержка',
    'features.premium.5': 'Продвинутая аналитика',
    'features.enterprise.1': 'Полное решение для агентств',
    'features.enterprise.2': 'AI агент адаптированный под бренд',
    'features.enterprise.3': 'Разработка пользовательских функций',
    'features.enterprise.4': 'Выделенный менеджер аккаунта',
    'features.enterprise.5': 'Гарантированное SLA',
    
    // Testimonials
    'testimonials.title': 'Что говорят наши партнеры',
    'testimonials.ana.content': 'Наши клиенты очарованы AI агентом. Он увеличил нашу конверсию на 70%.',
    'testimonials.ana.name': 'Ana Popescu',
    'testimonials.ana.role': 'Директор в Dream Travel Agency',
    'testimonials.mihai.content': 'Trajecta полностью автоматизировала наш процесс планирования. Мы экономим целые часы.',
    'testimonials.mihai.name': 'Mihai Ionescu',
    'testimonials.mihai.role': 'Основатель Travel Expert SRL',
    'testimonials.elena.content': 'Лучший инструмент для агентств. Клиенты чувствуют, что у них есть собственный персональный гид.',
    'testimonials.elena.name': 'Elena Dumitrescu',
    'testimonials.elena.role': 'Консультант по путешествиям в Premium Tours',
    
    // CTA section
    'cta.title': 'Готовы дать своим клиентам собственного AI агента?',
    'cta.subtitle': 'Начните бесплатный пробный период сегодня и посмотрите, как Trajecta преобразует опыт путешествий',
    'cta.button': 'Начать Бесплатный Пробный Период - 14 Дней',
    
    // Footer
    'footer.product': 'Продукт',
    'footer.company': 'Компания',
    'footer.support': 'Поддержка',
    'footer.copyright': 'Все права защищены.',
  },
  
  uk: {
    // Header
    'header.about': 'Про нас',
    'header.features': 'Можливості',
    'header.testimonials': 'Відгуки',
    'header.login': 'Вхід',
    'header.register': 'Реєстрація',
    
    // Hero section
    'hero.badge': 'Додаток #1 для персоналізованих подорожей',
    'hero.title': 'Відкрийте світ з',
    'hero.subtitle': 'Персоналізований додаток для подорожей, який адаптується до вашого способу життя. Від геймерів до дослідників та літніх людей - кожен має свою частку пригод.',
    'hero.users': '1000+ користувачів',
    'hero.destinations': '500+ напрямків',
    'hero.rating': '4.9/5 рейтинг',
    'hero.start_planning': 'Почати Пригоду',
    
    // Travel paths
    'paths.title': 'Унікальне поїздження для кожного клієнта',
    'paths.gamer': 'Шлях Геймера',
    'paths.explorer': 'Шлях Дослідника',
    'paths.beginner': 'Шлях Новачка',
    'paths.senior': 'Шлях Літньої Людини',
    'paths.choose': 'Оберіть вашу ідеальну пригоду',
    
    // Benefits section
    'benefits.title': 'Чому агентства обирають',
    'benefits.subtitle': 'Дайте своїм клієнтам власного персонального AI агента, який ідеально розуміє їхні переваги',
    'benefits.agent.title': 'Персональний AI Агент',
    'benefits.agent.desc': 'Кожен клієнт отримує власного інтелектуального віртуального гіда',
    'benefits.planning.title': 'Автоматичне Планування',
    'benefits.planning.desc': 'Миттєві бронювання в ресторанах та активностях',
    'benefits.experience.title': 'Персоналізований Досвід',
    'benefits.experience.desc': 'Повна адаптація до переваг кожного мандрівника',
    'benefits.sales.title': 'Зростання Продажів',
    'benefits.sales.desc': 'Щасливіші клієнти, більше бронювань',
    
    // Pricing section
    'pricing.title': 'Оберіть ідеальний план для вашого агентства',
    'pricing.subtitle': 'Почніть з 14-денного безкоштовного пробного періоду, кредитна картка не потрібна',
    'pricing.popular': 'Найпопулярніший',
    'pricing.basic.name': 'БАЗОВИЙ',
    'pricing.basic.price': '€29',
    'pricing.basic.period': '/місяць',
    'pricing.basic.tagline': 'Ідеально для початку',
    'pricing.premium.name': 'ПРЕМІУМ',
    'pricing.premium.price': '€59',
    'pricing.premium.period': '/місяць',
    'pricing.premium.tagline': 'Найпопулярніший',
    'pricing.enterprise.name': 'КОРПОРАТИВНИЙ',
    'pricing.enterprise.price': '€99',
    'pricing.enterprise.period': '/місяць',
    'pricing.enterprise.tagline': 'Для великих агентств',
    'pricing.choose': 'Обрати',
    'pricing.start': 'Почати Безкоштовно',
    'pricing.demo': 'Спробуйте демоверсію',
    'pricing.contact': 'Зв\'яжіться з нами',
    'pricing.details': 'Деталі',
    
    // Pricing features
    'features.basic.1': 'До 50 клієнтів на місяць',
    'features.basic.2': 'Персональний AI агент для кожного клієнта',
    'features.basic.3': 'Автоматичне планування подорожей',
    'features.basic.4': 'Бронювання ресторанів та активностей',
    'features.basic.5': 'Підтримка по email',
    'features.premium.1': 'Необмежені клієнти',
    'features.premium.2': 'Просунутий AI агент з голосовим чатом',
    'features.premium.3': 'Всі функції включені',
    'features.premium.4': 'Пріоритетна підтримка',
    'features.premium.5': 'Просунута аналітика',
    'features.enterprise.1': 'Повне рішення для агентств',
    'features.enterprise.2': 'AI агент адаптований під бренд',
    'features.enterprise.3': 'Розробка користувацьких функцій',
    'features.enterprise.4': 'Виділений менеджер акаунта',
    'features.enterprise.5': 'Гарантоване SLA',
    
    // Testimonials
    'testimonials.title': 'Що кажуть наші партнери',
    'testimonials.ana.content': 'Наші клієнти зачаровані AI агентом. Він збільшив нашу конверсію на 70%.',
    'testimonials.ana.name': 'Ana Popescu',
    'testimonials.ana.role': 'Директор в Dream Travel Agency',
    'testimonials.mihai.content': 'Trajecta повністю автоматизувала наш процес планування. Ми економимо цілі години.',
    'testimonials.mihai.name': 'Mihai Ionescu',
    'testimonials.mihai.role': 'Засновник Travel Expert SRL',
    'testimonials.elena.content': 'Найкращий інструмент для агентств. Клієнти відчувають, що мають власного персонального гіда.',
    'testimonials.elena.name': 'Elena Dumitrescu',
    'testimonials.elena.role': 'Консультант з подорожей в Premium Tours',
    
    // CTA section
    'cta.title': 'Готові дати своїм клієнтам власного AI агента?',
    'cta.subtitle': 'Почніть безкоштовний пробний період сьогодні та подивіться, як Trajecta перетворює досвід подорожей',
    'cta.button': 'Почати Безкоштовний Пробний Період - 14 Днів',
    
    // Footer
    'footer.product': 'Продукт',
    'footer.company': 'Компанія',
    'footer.support': 'Підтримка',
    'footer.copyright': 'Всі права захищені.',
  },
  
  ar: {
    // Header
    'header.about': 'حول',
    'header.features': 'المميزات',
    'header.testimonials': 'الشهادات',
    'header.login': 'تسجيل الدخول',
    'header.register': 'التسجيل',
    
    // Hero section
    'hero.badge': 'التطبيق #1 للسفر الشخصي',
    'hero.title': 'اكتشف العالم مع',
    'hero.subtitle': 'تطبيق سفر شخصي يتكيف مع نمط حياتك. من اللاعبين إلى المستكشفين وكبار السن - كل شخص له نصيبه من المغامرة.',
    'hero.users': '1000+ مستخدم',
    'hero.destinations': '500+ وجهة',
    'hero.rating': '4.9/5 تقييم',
    'hero.start_planning': 'ابدأ المغامرة',
    
    // Travel paths
    'paths.title': 'تجربة شخصية فريدة لكل عميل',
    'paths.gamer': 'مسار اللاعب',
    'paths.explorer': 'مسار المستكشف',
    'paths.beginner': 'مسار المبتدئ',
    'paths.senior': 'مسار كبير السن',
    'paths.choose': 'اختر مغامرتك المثالية',
    
    // Benefits section
    'benefits.title': 'لماذا تختار الوكالات',
    'benefits.subtitle': 'امنح عملائك وكيل ذكي شخصي يفهم تفضيلاتهم بشكل مثالي',
    'benefits.agent.title': 'وكيل ذكي شخصي',
    'benefits.agent.desc': 'كل عميل يحصل على دليله الافتراضي الذكي الخاص',
    'benefits.planning.title': 'التخطيط التلقائي',
    'benefits.planning.desc': 'حجوزات فورية في المطاعم والأنشطة',
    'benefits.experience.title': 'تجربة شخصية',
    'benefits.experience.desc': 'تكيف كامل مع تفضيلات كل مسافر',
    'benefits.sales.title': 'نمو المبيعات',
    'benefits.sales.desc': 'عملاء أكثر سعادة، المزيد من الحجوزات',
    
    // Pricing section
    'pricing.title': 'اختر الخطة المثالية لوكالتك',
    'pricing.subtitle': 'ابدأ بفترة تجريبية مجانية لمدة 14 يومًا، لا تحتاج بطاقة ائتمان',
    'pricing.popular': 'الأكثر شعبية',
    'pricing.basic.name': 'أساسي',
    'pricing.basic.price': '€29',
    'pricing.basic.period': '/شهر',
    'pricing.basic.tagline': 'مثالي للبداية',
    'pricing.premium.name': 'مميز',
    'pricing.premium.price': '€59',
    'pricing.premium.period': '/شهر',
    'pricing.premium.tagline': 'الأكثر شعبية',
    'pricing.enterprise.name': 'المؤسسات',
    'pricing.enterprise.price': '€99',
    'pricing.enterprise.period': '/شهر',
    'pricing.enterprise.tagline': 'للوكالات الكبيرة',
    'pricing.choose': 'اختيار',
    'pricing.start': 'ابدأ مجانًا',
    'pricing.demo': 'تجربة جيدة',
    'pricing.contact': 'تواصل معنا',
    'pricing.details': 'التفاصيل',
    
    // Pricing features
    'features.basic.1': 'حتى 50 عميل شهرياً',
    'features.basic.2': 'وكيل ذكي شخصي لكل عميل',
    'features.basic.3': 'تخطيط تلقائي للرحلات',
    'features.basic.4': 'حجوزات المطاعم والأنشطة',
    'features.basic.5': 'دعم بالبريد الإلكتروني',
    'features.premium.1': 'عملاء غير محدودين',
    'features.premium.2': 'وكيل ذكي متقدم مع الدردشة الصوتية',
    'features.premium.3': 'جميع الميزات مضمنة',
    'features.premium.4': 'دعم ذو أولوية',
    'features.premium.5': 'تحليلات متقدمة',
    'features.enterprise.1': 'حل متكامل للوكالات',
    'features.enterprise.2': 'وكيل ذكي مخصص للعلامة التجارية',
    'features.enterprise.3': 'تطوير ميزات مخصصة',
    'features.enterprise.4': 'مدير حساب مخصص',
    'features.enterprise.5': 'اتفاقية مستوى خدمة مضمونة',
    
    // Testimonials
    'testimonials.title': 'ماذا يقول شركاؤنا',
    'testimonials.ana.content': 'عملاؤنا مفتونون بالوكيل الذكي. لقد زاد معدل التحويل لدينا بنسبة 70%.',
    'testimonials.ana.name': 'Ana Popescu',
    'testimonials.ana.role': 'مديرة في وكالة دريم ترافيل',
    'testimonials.mihai.content': 'تراجيكتا أتمتت عملية التخطيط لدينا بالكامل. نوفر ساعات كاملة.',
    'testimonials.mihai.name': 'Mihai Ionescu',
    'testimonials.mihai.role': 'مؤسس ترافيل إكسبرت المحدودة',
    'testimonials.elena.content': 'أفضل أداة للوكالات. العملاء يشعرون أن لديهم دليلهم الشخصي.',
    'testimonials.elena.name': 'Elena Dumitrescu',
    'testimonials.elena.role': 'استشارية سفر في بريميوم تورز',
    
    // CTA section
    'cta.title': 'هل أنت مستعد لإعطاء عملائك وكيلهم الذكي الخاص؟',
    'cta.subtitle': 'ابدأ فترتك التجريبية المجانية اليوم وشاهد كيف تحول تراجيكتا تجربة السفر',
    'cta.button': 'ابدأ الفترة التجريبية المجانية - 14 يوماً',
    
    // Footer
    'footer.product': 'المنتج',
    'footer.company': 'الشركة',
    'footer.support': 'الدعم',
    'footer.copyright': 'جميع الحقوق محفوظة.',
  },
  
  tr: {
    // Header
    'header.about': 'Hakkında',
    'header.features': 'Özellikler',
    'header.testimonials': 'Referanslar',
    'header.login': 'Giriş',
    'header.register': 'Kayıt',
    
    // Hero section
    'hero.badge': 'Kişiselleştirilmiş seyahat için #1 Uygulama',
    'hero.title': 'Dünyayı keşfedin',
    'hero.subtitle': 'Yaşam tarzınıza uyum sağlayan kişiselleştirilmiş seyahat uygulaması. Oyunculardan kaşiflere ve yaşlılara kadar - herkesin macera payı var.',
    'hero.users': '1000+ kullanıcı',
    'hero.destinations': '500+ destinasyon',
    'hero.rating': '4.9/5 değerlendirme',
    'hero.start_planning': 'Macerayı Başlat',
    
    // Travel paths
    'paths.title': 'Kişiselleştirilmiş Macera Yolu',
    'paths.gamer': 'Oyuncu Yolu',
    'paths.explorer': 'Kaşif Yolu',
    'paths.beginner': 'Başlangıç Yolu',
    'paths.senior': 'Yaşlı Yolu',
    'paths.choose': 'Mükemmel maceranızı seçin',
    
    // Benefits section
    'benefits.title': 'Acenteler neden seçiyor',
    'benefits.subtitle': 'Müşterilerinize tercihlerini mükemmel anlayan kendi kişisel AI ajanlarını verin',
    'benefits.agent.title': 'Kişisel AI Ajan',
    'benefits.agent.desc': 'Her müşteri kendi akıllı sanal rehberini alır',
    'benefits.planning.title': 'Otomatik Planlama',
    'benefits.planning.desc': 'Restoranlarda ve aktivitelerde anında rezervasyonlar',
    'benefits.experience.title': 'Kişiselleştirilmiş Deneyim',
    'benefits.experience.desc': 'Her gezginin tercihlerine tam uyum',
    'benefits.sales.title': 'Satış Artışı',
    'benefits.sales.desc': 'Daha mutlu müşteriler, daha fazla rezervasyon',
    
    // Pricing section
    'pricing.title': 'Acenteniz için mükemmel planı seçin',
    'pricing.subtitle': '14 günlük ücretsiz deneme ile başlayın, kredi kartı gerekmiyor',
    'pricing.popular': 'En popüler',
    'pricing.basic.name': 'TEMEL',
    'pricing.basic.price': '€29',
    'pricing.basic.period': '/ay',
    'pricing.basic.tagline': 'Başlamak için mükemmel',
    'pricing.premium.name': 'PREMİUM',
    'pricing.premium.price': '€59',
    'pricing.premium.period': '/ay',
    'pricing.premium.tagline': 'En popüler',
    'pricing.enterprise.name': 'KURUMSAL',
    'pricing.enterprise.price': '€99',
    'pricing.enterprise.period': '/ay',
    'pricing.enterprise.tagline': 'Büyük acenteler için',
    'pricing.choose': 'Seç',
    'pricing.start': 'Ücretsiz Başla',
    'pricing.demo': 'Demo deneyin',
    'pricing.contact': 'Destek',
    'pricing.details': 'Detaylar',
    
    // Pricing features
    'features.basic.1': 'Aylık 50 müşteriye kadar',
    'features.basic.2': 'Her müşteri için kişisel AI ajan',
    'features.basic.3': 'Otomatik seyahat planlaması',
    'features.basic.4': 'Restoran ve aktivite rezervasyonları',
    'features.basic.5': 'E-posta desteği',
    'features.premium.1': 'Sınırsız müşteri',
    'features.premium.2': 'Sesli sohbet ile gelişmiş AI ajan',
    'features.premium.3': 'Tüm özellikler dahil',
    'features.premium.4': 'Öncelikli destek',
    'features.premium.5': 'Gelişmiş analitik',
    'features.enterprise.1': 'Acenteler için tam çözüm',
    'features.enterprise.2': 'Marka özelleştirmeli AI ajan',
    'features.enterprise.3': 'Özel özellik geliştirme',
    'features.enterprise.4': 'Özel hesap yöneticisi',
    'features.enterprise.5': 'Garantili SLA',
    
    // Testimonials
    'testimonials.title': 'Ortaklarımız ne diyor',
    'testimonials.ana.content': 'Müşterilerimiz AI ajandan büyülendi. Dönüşüm oranımızı %70 artırdı.',
    'testimonials.ana.name': 'Ana Popescu',
    'testimonials.ana.role': 'Dream Travel Agency Müdürü',
    'testimonials.mihai.content': 'Trajecta planlama sürecimizi tamamen otomatikleştirdi. Saatler kazanıyoruz.',
    'testimonials.mihai.name': 'Mihai Ionescu',
    'testimonials.mihai.role': 'Travel Expert SRL Kurucusu',
    'testimonials.elena.content': 'Acenteler için en iyi araç. Müşteriler kendi kişisel rehberlerine sahip olduklarını hissediyor.',
    'testimonials.elena.name': 'Elena Dumitrescu',
    'testimonials.elena.role': 'Premium Tours Seyahat Danışmanı',
    
    // CTA section
    'cta.title': 'Müşterilerinize kendi AI ajanlarını vermeye hazır mısınız?',
    'cta.subtitle': 'Bugün ücretsiz denemenizi başlatın ve Trajecta\'nın seyahat deneyimini nasıl dönüştürdüğünü görün',
    'cta.button': 'Ücretsiz Deneme Başlat - 14 Gün',
    
    // Footer
    'footer.product': 'Ürün',
    'footer.company': 'Şirket',
    'footer.support': 'Destek',
    'footer.copyright': 'Tüm hakları saklıdır.',
  },
  
  hi: {
    // Header
    'header.about': 'के बारे में',
    'header.features': 'विशेषताएं',
    'header.testimonials': 'प्रशंसापत्र',
    'header.login': 'लॉगिन',
    'header.register': 'रजिस्टर',
    
    // Hero section
    'hero.badge': 'व्यक्तिगत यात्रा के लिए #1 ऐप',
    'hero.title': 'दुनिया की खोज करें',
    'hero.subtitle': 'एक व्यक्तिगत यात्रा ऐप जो आपकी जीवनशैली के अनुकूल होता है। गेमर्स से लेकर एक्सप्लोरर्स और बुजुर्गों तक - हर किसी का अपना एडवेंचर हिस्सा है।',
    'hero.users': '1000+ उपयोगकर्ता',
    'hero.destinations': '500+ गंतव्य',
    'hero.rating': '4.9/5 रेटिंग',
    'hero.start_planning': 'एडवेंचर शुरू करें',
    
    // Travel paths
    'paths.title': 'व्यक्तिगत यात्रा के लिए एक अनोखी अनुभव',
    'paths.gamer': 'गेमर पथ',
    'paths.explorer': 'एक्सप्लोरर पथ',
    'paths.beginner': 'शुरुआती पथ',
    'paths.senior': 'सीनियर पथ',
    'paths.choose': 'अपना परफेक्ट एडवेंचर चुनें',
    
    // Benefits section
    'benefits.title': 'एजेंसियां क्यों चुनती हैं',
    'benefits.subtitle': 'अपने ग्राहकों को उनका अपना व्यक्तिगत AI एजेंट दें जो उनकी प्राथमिकताओं को पूर्ण रूप से समझता है',
    'benefits.agent.title': 'व्यक्तिगत AI एजेंट',
    'benefits.agent.desc': 'हर ग्राहक को अपना बुद्धिमान वर्चुअल गाइड मिलता है',
    'benefits.planning.title': 'स्वचालित योजना',
    'benefits.planning.desc': 'रेस्तराँ और गतिविधियों में तुरंत बुकिंग',
    'benefits.experience.title': 'व्यक्तिगत अनुभव',
    'benefits.experience.desc': 'हर यात्री की प्राथमिकताओं के लिए पूर्ण अनुकूलन',
    'benefits.sales.title': 'बिक्री वृद्धि',
    'benefits.sales.desc': 'खुश ग्राहक, अधिक बुकिंग',
    
    // Pricing section
    'pricing.title': 'अपनी एजेंसी के लिए परफेक्ट प्लान चुनें',
    'pricing.subtitle': '14-दिन के मुफ्त ट्रायल के साथ शुरू करें, क्रेडिट कार्ड की आवश्यकता नहीं',
    'pricing.popular': 'सबसे लोकप्रिय',
    'pricing.basic.name': 'बेसिक',
    'pricing.basic.price': '€29',
    'pricing.basic.period': '/महीना',
    'pricing.basic.tagline': 'शुरुआत के लिए बेहतरीन',
    'pricing.premium.name': 'प्रीमियम',
    'pricing.premium.price': '€59',
    'pricing.premium.period': '/महीना',
    'pricing.premium.tagline': 'सबसे लोकप्रिय',
    'pricing.enterprise.name': 'एंटरप्राइज',
    'pricing.enterprise.price': '€99',
    'pricing.enterprise.period': '/महीना',
    'pricing.enterprise.tagline': 'बड़ी एजेंसियों के लिए',
    'pricing.choose': 'चुनें',
    'pricing.start': 'मुफ्त शुरू करें',
    'pricing.demo': 'डेमो वर्जन',
    'pricing.contact': 'संपर्क करें',
    'pricing.details': 'विवरण',
    
    // Pricing features
    'features.basic.1': 'प्रति माह 50 ग्राहक तक',
    'features.basic.2': 'हर ग्राहक के लिए व्यक्तिगत AI एजेंट',
    'features.basic.3': 'स्वचालित यात्रा योजना',
    'features.basic.4': 'रेस्तराँ और गतिविधि बुकिंग',
    'features.basic.5': 'ईमेल सपोर्ट',
    'features.premium.1': 'असीमित ग्राहक',
    'features.premium.2': 'वॉयस चैट के साथ एडवांस AI एजेंट',
    'features.premium.3': 'सभी सुविधाएं शामिल',
    'features.premium.4': 'प्राथमिकता सपोर्ट',
    'features.premium.5': 'एडवांस एनालिटिक्स',
    'features.enterprise.1': 'एजेंसियों के लिए पूर्ण समाधान',
    'features.enterprise.2': 'ब्रांड-कस्टमाइज्ड AI एजेंट',
    'features.enterprise.3': 'कस्टम फीचर डेवलपमेंट',
    'features.enterprise.4': 'समर्पित अकाउंट मैनेजर',
    'features.enterprise.5': 'गारंटीशुदा SLA',
    
    // Testimonials
    'testimonials.title': 'हमारे साझेदार क्या कहते हैं',
    'testimonials.ana.content': 'हमारे ग्राहक AI एजेंट से मंत्रमुग्ध हैं। इसने हमारे कन्वर्जन रेट को 70% बढ़ाया है।',
    'testimonials.ana.name': 'Ana Popescu',
    'testimonials.ana.role': 'ड्रीम ट्रैवल एजेंसी में निदेशक',
    'testimonials.mihai.content': 'ट्राजेक्टा ने हमारी योजना प्रक्रिया को पूरी तरह से स्वचालित कर दिया है। हम पूरे घंटे बचाते हैं।',
    'testimonials.mihai.name': 'Mihai Ionescu',
    'testimonials.mihai.role': 'ट्रैवल एक्सपर्ट SRL के संस्थापक',
    'testimonials.elena.content': 'एजेंसियों के लिए सबसे अच्छा टूल। ग्राहकों को लगता है कि उनका अपना व्यक्तिगत गाइड है।',
    'testimonials.elena.name': 'Elena Dumitrescu',
    'testimonials.elena.role': 'प्रीमियम टूर्स में ट्रैवल कंसल्टेंट',
    
    // CTA section
    'cta.title': 'अपने ग्राहकों को उनका अपना AI एजेंट देने के लिए तैयार हैं?',
    'cta.subtitle': 'आज अपना मुफ्त ट्रायल शुरू करें और देखें कि ट्राजेक्टा यात्रा अनुभव को कैसे बदलता है',
    'cta.button': 'मुफ्त ट्रायल शुरू करें - 14 दिन',
    
    // Footer
    'footer.product': 'उत्पाद',
    'footer.company': 'कंपनी',
    'footer.support': 'सपोर्ट',
    'footer.copyright': 'सभी अधिकार सुरक्षित।',
  },
  
  zh: {
    // Header
    'header.about': '关于',
    'header.features': '功能',
    'header.testimonials': '证言',
    'header.login': '登录',
    'header.register': '注册',
    
    // Hero section
    'hero.badge': '个性化旅行#1应用',
    'hero.title': '与我们一起发现世界',
    'hero.subtitle': '一个适应您生活方式的个性化旅行应用。从游戏玩家到探险家和老年人 - 每个人都有自己的冒险份额。',
    'hero.users': '1000+用户',
    'hero.destinations': '500+目的地',
    'hero.rating': '4.9/5评分',
    'hero.start_planning': '开始冒险',
    
    // Travel paths
    'paths.title': '个性化旅行体验',
    'paths.gamer': '游戏玩家路径',
    'paths.explorer': '探险家路径',
    'paths.beginner': '初学者路径',
    'paths.senior': '老年人路径',
    'paths.choose': '选择您的完美冒险',
    
    // Benefits section
    'benefits.title': '为什么代理选择',
    'benefits.subtitle': '为您的客户提供他们自己的个人AI代理，完美理解他们的偏好',
    'benefits.agent.title': '个人AI代理',
    'benefits.agent.desc': '每个客户都获得自己的智能虚拟向导',
    'benefits.planning.title': '自动规划',
    'benefits.planning.desc': '餐厅和活动的即时预订',
    'benefits.experience.title': '个性化体验',
    'benefits.experience.desc': '完全适应每个旅行者的偏好',
    'benefits.sales.title': '销售增长',
    'benefits.sales.desc': '更快乐的客户，更多的预订',
    
    // Pricing section
    'pricing.title': '为您的代理选择完美的计划',
    'pricing.subtitle': '从14天免费试用开始，无需信用卡',
    'pricing.popular': '最受欢迎',
    'pricing.basic.name': '基础',
    'pricing.basic.price': '€29',
    'pricing.basic.period': '/月',
    'pricing.basic.tagline': '开始的完美选择',
    'pricing.premium.name': '高级',
    'pricing.premium.price': '€59',
    'pricing.premium.period': '/月',
    'pricing.premium.tagline': '最受欢迎',
    'pricing.enterprise.name': '企业',
    'pricing.enterprise.price': '€99',
    'pricing.enterprise.period': '/月',
    'pricing.enterprise.tagline': '适用于大型代理',
    'pricing.choose': '选择',
    'pricing.start': '免费开始',
    'pricing.demo': '试用版',
    'pricing.contact': '联系我们',
    'pricing.details': '详情',
    
    // Pricing features
    'features.basic.1': '每月最多50个客户',
    'features.basic.2': '每个客户的个人AI代理',
    'features.basic.3': '自动旅行规划',
    'features.basic.4': '餐厅和活动预订',
    'features.basic.5': '电子邮件支持',
    'features.premium.1': '无限客户',
    'features.premium.2': '带语音聊天的高级AI代理',
    'features.premium.3': '包含所有功能',
    'features.premium.4': '优先支持',
    'features.premium.5': '高级分析',
    'features.enterprise.1': '代理的完整解决方案',
    'features.enterprise.2': '品牌定制AI代理',
    'features.enterprise.3': '自定义功能开发',
    'features.enterprise.4': '专属客户经理',
    'features.enterprise.5': '保证SLA',
    
    // Testimonials
    'testimonials.title': '我们的合作伙伴怎么说',
    'testimonials.ana.content': '我们的客户对AI代理着迷。它将我们的转化率提高了70%。',
    'testimonials.ana.name': 'Ana Popescu',
    'testimonials.ana.role': '梦想旅行社总监',
    'testimonials.mihai.content': 'Trajecta完全自动化了我们的规划过程。我们节省了整个小时。',
    'testimonials.mihai.name': 'Mihai Ionescu',
    'testimonials.mihai.role': 'Travel Expert SRL创始人',
    'testimonials.elena.content': '代理的最佳工具。客户感觉他们有自己的个人导游。',
    'testimonials.elena.name': 'Elena Dumitrescu',
    'testimonials.elena.role': 'Premium Tours旅行顾问',
    
    // CTA section
    'cta.title': '准备好为您的客户提供他们自己的AI代理了吗？',
    'cta.subtitle': '今天开始您的免费试用，看看Trajecta如何改变旅行体验',
    'cta.button': '开始免费试用 - 14天',
    
    // Footer
    'footer.product': '产品',
    'footer.company': '公司',
    'footer.support': '支持',
    'footer.copyright': '版权所有。',
  },
  
  ja: {
    // Header
    'header.about': 'について',
    'header.features': '機能',
    'header.testimonials': '証言',
    'header.login': 'ログイン',
    'header.register': '登録',
    
    // Hero section
    'hero.badge': 'パーソナライズド旅行#1アプリ',
    'hero.title': '世界を発見する',
    'hero.subtitle': 'あなたのライフスタイルに適応するパーソナライズド旅行アプリ。ゲーマーから探検家、シニアまで - 誰もが冒険の分け前を持っています。',
    'hero.users': '1000+ユーザー',
    'hero.destinations': '500+目的地',
    'hero.rating': '4.9/5評価',
    'hero.start_planning': '冒険を始める',
    
    // Travel paths
    'paths.title': '独自のパーソナルAIエージェントを持っている',
    'paths.gamer': 'ゲーマーパス',
    'paths.explorer': 'エクスプローラーパス',
    'paths.beginner': '初心者パス',
    'paths.senior': 'シニアパス',
    'paths.choose': '完璧な冒険を選択',
    
    // Benefits section
    'benefits.title': 'なぜ代理店が選ぶのか',
    'benefits.subtitle': 'お客様に彼らの好みを完璧に理解する独自のパーソナルAIエージェントを提供',
    'benefits.agent.title': 'パーソナルAIエージェント',
    'benefits.agent.desc': '各クライアントが独自のインテリジェント仮想ガイドを取得',
    'benefits.planning.title': '自動プランニング',
    'benefits.planning.desc': 'レストランとアクティビティでの即座の予約',
    'benefits.experience.title': 'パーソナライズド体験',
    'benefits.experience.desc': '各旅行者の好みに完全適応',
    'benefits.sales.title': '売上成長',
    'benefits.sales.desc': 'より幸せなクライアント、より多くの予約',
    
    // Pricing section
    'pricing.title': 'あなたの代理店に完璧なプランを選択',
    'pricing.subtitle': '14日間の無料トライアルで開始、クレジットカード不要',
    'pricing.popular': '最も人気',
    'pricing.basic.name': 'ベーシック',
    'pricing.basic.price': '€29',
    'pricing.basic.period': '/月',
    'pricing.basic.tagline': '始めるのに完璧',
    'pricing.premium.name': 'プレミアム',
    'pricing.premium.price': '€59',
    'pricing.premium.period': '/月',
    'pricing.premium.tagline': '最も人気',
    'pricing.enterprise.name': 'エンタープライズ',
    'pricing.enterprise.price': '€99',
    'pricing.enterprise.period': '/月',
    'pricing.enterprise.tagline': '大きな代理店向け',
    'pricing.choose': '選択',
    'pricing.start': '無料で始める',
    'pricing.demo': 'デモ版',
    'pricing.contact': 'お問い合わせ',
    'pricing.details': '詳細',
    
    // Pricing features
    'features.basic.1': '月最大50クライアント',
    'features.basic.2': '各クライアント用パーソナルAIエージェント',
    'features.basic.3': '自動旅行プランニング',
    'features.basic.4': 'レストランとアクティビティ予約',
    'features.basic.5': 'メールサポート',
    'features.premium.1': '無制限クライアント',
    'features.premium.2': 'ボイスチャット付き高度AIエージェント',
    'features.premium.3': 'すべての機能が含まれる',
    'features.premium.4': '優先サポート',
    'features.premium.5': '高度な分析',
    'features.enterprise.1': '代理店向け完全ソリューション',
    'features.enterprise.2': 'ブランドカスタマイズAIエージェント',
    'features.enterprise.3': 'カスタム機能開発',
    'features.enterprise.4': '専任アカウントマネージャー',
    'features.enterprise.5': '保証されたSLA',
    
    // Testimonials
    'testimonials.title': 'パートナーの声',
    'testimonials.ana.content': '私たちのクライアントはAIエージェントに魅了されています。コンバージョン率が70％向上しました。',
    'testimonials.ana.name': 'Ana Popescu',
    'testimonials.ana.role': 'ドリームトラベルエージェンシー ディレクター',
    'testimonials.mihai.content': 'Trajectaが私たちの計画プロセスを完全に自動化しました。何時間も節約しています。',
    'testimonials.mihai.name': 'Mihai Ionescu',
    'testimonials.mihai.role': 'Travel Expert SRL 創設者',
    'testimonials.elena.content': '代理店にとって最高のツール。クライアントは自分専用のパーソナルガイドを持っていると感じます。',
    'testimonials.elena.name': 'Elena Dumitrescu',
    'testimonials.elena.role': 'プレミアムツアーズ トラベルコンサルタント',
    
    // CTA section
    'cta.title': 'クライアントに独自のAIエージェントを提供する準備はできていますか？',
    'cta.subtitle': '今日無料トライアルを開始して、Trajectaが旅行体験をどのように変革するかをご覧ください',
    'cta.button': '無料トライアル開始 - 14日間',
    
    // Footer
    'footer.product': '製品',
    'footer.company': '会社',
    'footer.support': 'サポート',
    'footer.copyright': '全著作権所有。',
  },
  
  ko: {
    // Header
    'header.about': '소개',
    'header.features': '기능',
    'header.testimonials': '추천사',
    'header.login': '로그인',
    'header.register': '회원가입',
    
    // Hero section
    'hero.badge': '개인화된 여행을 위한 #1 앱',
    'hero.title': '세계를 발견하세요',
    'hero.subtitle': '당신의 라이프스타일에 맞춰지는 개인화된 여행 앱. 게이머부터 탐험가, 시니어까지 - 모든 사람이 자신만의 모험을 가지고 있습니다.',
    'hero.users': '1000+사용자',
    'hero.destinations': '500+목적지',
    'hero.rating': '4.9/5평점',
    'hero.start_planning': '모험 시작하기',
    
    // Travel paths
    'paths.title': '개인화된 여행을 위한 고유한 경험',
    'paths.gamer': '게이머 경로',
    'paths.explorer': '탐험가 경로',
    'paths.beginner': '초심자 경로',
    'paths.senior': '시니어 경로',
    'paths.choose': '완벽한 모험을 선택하세요',
    
    // Benefits section
    'benefits.title': '여행사들이 선택하는 이유',
    'benefits.subtitle': '고객들에게 그들의 선호도를 완벽하게 이해하는 개인 AI 에이전트를 제공하세요',
    'benefits.agent.title': '개인 AI 에이전트',
    'benefits.agent.desc': '각 고객이 자신만의 지능형 가상 가이드를 얻습니다',
    'benefits.planning.title': '자동 계획',
    'benefits.planning.desc': '레스토랑과 활동에서 즉시 예약',
    'benefits.experience.title': '개인화된 경험',
    'benefits.experience.desc': '각 여행자의 선호도에 완전 적응',
    'benefits.sales.title': '매출 성장',
    'benefits.sales.desc': '더 행복한 고객, 더 많은 예약',
    
    // Pricing section
    'pricing.title': '귀하의 여행사를 위한 완벽한 플랜을 선택하세요',
    'pricing.subtitle': '14일 무료 체험으로 시작하세요, 신용카드 불필요',
    'pricing.popular': '가장 인기있는',
    'pricing.basic.name': '베이직',
    'pricing.basic.price': '€29',
    'pricing.basic.period': '/월',
    'pricing.basic.tagline': '시작하기에 완벽',
    'pricing.premium.name': '프리미엄',
    'pricing.premium.price': '€59',
    'pricing.premium.period': '/월',
    'pricing.premium.tagline': '가장 인기있는',
    'pricing.enterprise.name': '엔터프라이즈',
    'pricing.enterprise.price': '€99',
    'pricing.enterprise.period': '/월',
    'pricing.enterprise.tagline': '대형 여행사용',
    'pricing.choose': '선택',
    'pricing.start': '무료로 시작',
    'pricing.demo': '데모 버전',
    'pricing.contact': '연락처',
    'pricing.details': '세부사항',
    
    // Pricing features
    'features.basic.1': '월 최대 50명 고객',
    'features.basic.2': '각 고객을 위한 개인 AI 에이전트',
    'features.basic.3': '자동 여행 계획',
    'features.basic.4': '레스토랑 및 활동 예약',
    'features.basic.5': '이메일 지원',
    'features.premium.1': '무제한 고객',
    'features.premium.2': '음성 채팅이 있는 고급 AI 에이전트',
    'features.premium.3': '모든 기능 포함',
    'features.premium.4': '우선 지원',
    'features.premium.5': '고급 분석',
    'features.enterprise.1': '여행사를 위한 완전한 솔루션',
    'features.enterprise.2': '브랜드 맞춤형 AI 에이전트',
    'features.enterprise.3': '커스텀 기능 개발',
    'features.enterprise.4': '전담 계정 관리자',
    'features.enterprise.5': '보장된 SLA',
    
    // Testimonials
    'testimonials.title': '우리 파트너들의 말',
    'testimonials.ana.content': '우리 고객들은 AI 에이전트에 매료되었습니다. 전환율이 70% 증가했습니다.',
    'testimonials.ana.name': 'Ana Popescu',
    'testimonials.ana.role': 'Dream Travel Agency 이사',
    'testimonials.mihai.content': 'Trajecta가 우리의 계획 프로세스를 완전히 자동화했습니다. 몇 시간을 절약합니다.',
    'testimonials.mihai.name': 'Mihai Ionescu',
    'testimonials.mihai.role': 'Travel Expert SRL 창립자',
    'testimonials.elena.content': '여행사를 위한 최고의 도구입니다. 고객들은 자신만의 개인 가이드가 있다고 느낍니다.',
    'testimonials.elena.name': 'Elena Dumitrescu',
    'testimonials.elena.role': 'Premium Tours 여행 컨설턴트',
    
    // CTA section
    'cta.title': '고객들에게 자신만의 AI 에이전트를 제공할 준비가 되셨나요?',
    'cta.subtitle': '오늘 무료 체험을 시작하고 Trajecta가 여행 경험을 어떻게 변화시키는지 보세요',
    'cta.button': '무료 체험 시작 - 14일',
    
    // Footer
    'footer.product': '제품',
    'footer.company': '회사',
    'footer.support': '지원',
    'footer.copyright': '모든 권리 보유.',
  }
});
