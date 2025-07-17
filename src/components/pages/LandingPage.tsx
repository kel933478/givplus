import React from 'react';
import { 
  ArrowRight, 
  Shield, 
  Bot, 
  Receipt, 
  Calendar, 
  TrendingUp,
  Users,
  Globe,
  Award,
  Check
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Zéro frais bancaires',
      description: 'Compte professionnel 100% gratuit pour les associations'
    },
    {
      icon: <Bot className="h-6 w-6" />,
      title: 'IA intégrée',
      description: 'Assistante intelligente pour optimiser vos campagnes'
    },
    {
      icon: <Receipt className="h-6 w-6" />,
      title: 'Reçus fiscaux automatiques',
      description: 'Génération automatique des reçus fiscaux'
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: 'Gestion d\'événements',
      description: 'Organisez vos événements avec billeterie intégrée'
    }
  ];

  const testimonials = [
    {
      name: 'Marie Dubois',
      role: 'Directrice - Fondation Enfance',
      content: 'Give Plus++ a révolutionné notre gestion financière. Nous avons économisé 3000€ en frais bancaires cette année.',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    {
      name: 'Pierre Martin',
      role: 'Président - Association Solidarité',
      content: 'L\'IA nous aide à rédiger des campagnes plus efficaces. Nos dons ont augmenté de 40% en 6 mois.',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    }
  ];

  const trustLogos = [
    'UNESCO', 'UNICEF', 'Croix-Rouge', 'Médecins Sans Frontières', 'WWF'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-r from-primary-500 to-success-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">G+</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">GIVE PLUS++</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-primary-600 transition-colors">Fonctionnalités</a>
            <a href="#testimonials" className="text-gray-600 hover:text-primary-600 transition-colors">Témoignages</a>
            <a href="#pricing" className="text-gray-600 hover:text-primary-600 transition-colors">Tarifs</a>
            <Button variant="outline" size="sm">Se connecter</Button>
            <Button size="sm">Commencer</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              La première banque digitale pour les{' '}
              <span className="bg-gradient-to-r from-primary-500 to-success-500 bg-clip-text text-transparent">
                associations et fondations
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Révolutionnez votre gestion financière avec une néo-banque 100% dédiée aux acteurs de la solidarité. 
              Zéro frais, IA intégrée, gestion complète des dons et événements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4">
                Ouvrir un compte gratuit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Demander une démo
              </Button>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="mt-16 relative">
            <div className="bg-gradient-to-r from-primary-500 to-success-500 rounded-2xl p-8 text-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-8 w-8" />
                    <div>
                      <p className="text-sm opacity-90">Dons collectés</p>
                      <p className="text-2xl font-bold">2.4M€</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-8 w-8" />
                    <div>
                      <p className="text-sm opacity-90">Associations</p>
                      <p className="text-2xl font-bold">1,200+</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <img 
                    src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1"
                    alt="Dashboard preview"
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tout ce dont votre association a besoin
            </h2>
            <p className="text-xl text-gray-600">
              Une solution complète pour gérer vos finances et maximiser votre impact
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} variant="neo" className="text-center hover:scale-105 transition-transform duration-300">
                <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary-600">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ils nous font confiance
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez comment Give Plus++ transforme le quotidien des associations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} variant="elevated" className="relative">
                <div className="flex items-start space-x-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-8">
              Ils utilisent déjà Give Plus++
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {trustLogos.map((logo, index) => (
                <div key={index} className="text-2xl font-bold text-gray-400">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary-500 to-success-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à révolutionner votre gestion financière ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez les 1,200+ associations qui nous font confiance
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
            Ouvrir un compte gratuit
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-carbon-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-10 w-10 bg-gradient-to-r from-primary-500 to-success-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G+</span>
              </div>
              <span className="text-2xl font-bold">GIVE PLUS++</span>
            </div>
            <p className="text-gray-400 mb-4">
              La néo-banque qui redonne du pouvoir aux acteurs de la solidarité
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                <Globe className="h-4 w-4 mr-1" />
                FR
              </Button>
              <Button variant="ghost" size="sm">EN</Button>
              <Button variant="ghost" size="sm">ES</Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Produit</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Fonctionnalités</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tarifs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sécurité</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Centre d'aide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Formation</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Légal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Confidentialité</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 Give Plus++. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};