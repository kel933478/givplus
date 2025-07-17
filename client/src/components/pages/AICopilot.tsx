import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Copy, 
  RefreshCw,
  TrendingUp,
  Users,
  Target,
  Zap,
  Check,
  BookOpen
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Header } from '../layout/Header';

export const AICopilot: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedTone, setSelectedTone] = useState('inspirant');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [copied, setCopied] = useState(false);

  const tones = [
    { id: 'urgent', label: 'Urgent', icon: '🚨', color: 'bg-red-100 text-red-800' },
    { id: 'inspirant', label: 'Inspirant', icon: '✨', color: 'bg-blue-100 text-blue-800' },
    { id: 'solennel', label: 'Solennel', icon: '🙏', color: 'bg-purple-100 text-purple-800' },
    { id: 'éducatif', label: 'Éducatif', icon: '📚', color: 'bg-green-100 text-green-800' },
  ];

  const suggestions = [
    "Créer une campagne pour l'accès à l'eau potable en Afrique",
    "Rédiger un appel aux dons pour des bourses d'études",
    "Annoncer un événement de collecte de fonds",
    "Remercier les donateurs après une campagne réussie"
  ];

  const templates = [
    {
      title: 'Campagne d\'urgence',
      description: 'Pour les situations nécessitant une action immédiate',
      icon: <Target className="h-5 w-5" />,
      color: 'bg-red-100 text-red-800'
    },
    {
      title: 'Événement caritatif',
      description: 'Promouvoir vos événements et galas',
      icon: <Users className="h-5 w-5" />,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      title: 'Remerciements',
      description: 'Remercier vos donateurs et bénévoles',
      icon: <Sparkles className="h-5 w-5" />,
      color: 'bg-success-100 text-success-800'
    }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const mockText = `Ensemble, nous pouvons transformer des vies et construire un avenir meilleur. Votre générosité aujourd'hui permettra de ${prompt.toLowerCase()}.\n\nChaque don, même le plus petit, a un impact considérable. Grâce à votre soutien, nous pourrons:\n• Fournir une aide directe aux bénéficiaires\n• Développer des programmes durables\n• Créer un impact positif à long terme\n\nRejoignez-nous dans cette mission extraordinaire. Ensemble, nous pouvons faire la différence.`;
      
      setGeneratedText(mockText);
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const readabilityScore = 87;
  const recommendations = [
    'Ajoutez des chiffres concrets pour plus d\'impact',
    'Incluez un appel à l\'action plus spécifique',
    'Utilisez des témoignages pour renforcer l\'émotion'
  ];

  return (
    <div className="space-y-6">
      <Header title="IA Copilote" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-r from-primary-500 to-success-500 rounded-lg flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Assistante IA</h3>
                <p className="text-sm text-gray-600">Optimisée pour les associations</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Décrivez votre campagne
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                  rows={4}
                  placeholder="Ex: Construire une école dans un village rural au Sénégal pour 200 enfants..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ton de la campagne
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {tones.map((tone) => (
                    <button
                      key={tone.id}
                      onClick={() => setSelectedTone(tone.id)}
                      className={`p-3 rounded-lg border transition-all ${
                        selectedTone === tone.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span>{tone.icon}</span>
                        <span className="text-sm font-medium">{tone.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full"
                loading={isGenerating}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {isGenerating ? 'Génération en cours...' : 'Générer le texte'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Output Section */}
        <Card>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Texte généré</h3>
              {generatedText && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-success-600 font-medium">
                    Score: {readabilityScore}/100
                  </span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-success-500 rounded-full transition-all duration-300"
                      style={{ width: `${readabilityScore}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
            
            {generatedText ? (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="whitespace-pre-wrap text-sm text-gray-900">
                    {generatedText}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={handleCopy}
                    className="flex-1"
                  >
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copié!' : 'Copier'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleGenerate}
                    className="flex-1"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Régénérer
                  </Button>
                </div>
                
                <Button className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  Utiliser ce texte
                </Button>
              </div>
            ) : (
              <div className="text-center py-12">
                <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Décrivez votre campagne pour commencer</p>
                <p className="text-sm text-gray-500">L'IA générera un texte optimisé pour votre cause</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      {generatedText && (
        <Card variant="neo">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary-500" />
              <h3 className="text-lg font-semibold text-gray-900">Recommandations IA</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="h-6 w-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <p className="text-sm text-blue-900">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Suggestions */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Suggestions de campagnes</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setPrompt(suggestion)}
                className="p-3 text-left border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
              >
                <p className="text-sm text-gray-700">{suggestion}</p>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Templates */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Modèles prédéfinis</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templates.map((template, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${template.color}`}>
                    {template.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{template.title}</h4>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                <Button variant="outline" size="sm" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Utiliser ce modèle
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};