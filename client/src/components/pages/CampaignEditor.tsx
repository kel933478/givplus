import React, { useState } from 'react';
import { 
  Target, 
  Image, 
  Video, 
  Calendar, 
  Bot,
  Eye,
  Save,
  Share2,
  Upload,
  Zap
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Header } from '../layout/Header';
import { Modal } from '../ui/Modal';

export const CampaignEditor: React.FC = () => {
  const [showAIModal, setShowAIModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target: '',
    deadline: '',
    donationType: 'unique' as 'unique' | 'recurring' | 'both',
    matching: false,
    matchingAmount: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const AIModal = () => (
    <Modal isOpen={showAIModal} onClose={() => setShowAIModal(false)} title="Générateur IA" size="lg">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Décrivez votre campagne
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            rows={4}
            placeholder="Ex: Campagne pour construire une école dans un village rural au Sénégal..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ton de la campagne
          </label>
          <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
            <option>Inspirant</option>
            <option>Urgent</option>
            <option>Solennel</option>
            <option>Éducatif</option>
          </select>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">Texte généré</h4>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-green-600">Score: 89/100</span>
              <div className="h-2 w-16 bg-gray-200 rounded-full">
                <div className="h-2 w-14 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg"
            rows={6}
            defaultValue="Ensemble, construisons l'avenir de l'éducation au Sénégal. Votre don permettra de financer la construction d'une école dans le village de Keur Massar, offrant ainsi l'accès à l'éducation à plus de 200 enfants."
          />
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Recommandations IA</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Ajoutez des témoignages de bénéficiaires</li>
            <li>• Incluez des photos du terrain</li>
            <li>• Précisez l'impact concret du don</li>
          </ul>
        </div>
        
        <div className="flex space-x-3">
          <Button className="flex-1">
            <Zap className="h-4 w-4 mr-2" />
            Utiliser ce texte
          </Button>
          <Button variant="outline" className="flex-1">
            Générer un autre
          </Button>
        </div>
      </div>
    </Modal>
  );

  const PreviewModal = () => (
    <Modal isOpen={showPreview} onClose={() => setShowPreview(false)} title="Aperçu de la campagne" size="xl">
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-primary-500 to-success-500 text-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">{formData.title || 'Titre de la campagne'}</h2>
          <p className="opacity-90">{formData.description || 'Description de la campagne'}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center mb-4">
              <Image className="h-12 w-12 text-gray-400" />
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Collecté: 12,450 €</span>
                  <span>Objectif: {formData.target || 'XX,XXX'} €</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-primary-500 to-success-500 h-3 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button className="flex-1">Faire un don</Button>
                <Button variant="outline" className="flex-1">Don mensuel</Button>
              </div>
            </div>
          </div>
          
          <div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Derniers contributeurs</h4>
                <div className="space-y-2">
                  {['Marie D.', 'Pierre M.', 'Julie B.'].map((name, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center text-xs">
                        {name.charAt(0)}
                      </div>
                      <span className="text-sm">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Partager</h4>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">WhatsApp</Button>
                  <Button variant="outline" size="sm">Facebook</Button>
                  <Button variant="outline" size="sm">Email</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );

  return (
    <div className="space-y-6">
      <Header title="Éditeur de campagne" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Form */}
        <Card>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Nouvelle campagne</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowAIModal(true)}
              >
                <Bot className="h-4 w-4 mr-2" />
                Générer avec l'IA
              </Button>
            </div>
            
            <div className="space-y-4">
              <Input
                label="Titre de la campagne"
                placeholder="Ex: Construire une école au Sénégal"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  rows={4}
                  placeholder="Décrivez votre projet et son impact..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Montant cible (€)"
                  type="number"
                  placeholder="25000"
                  value={formData.target}
                  onChange={(e) => handleInputChange('target', e.target.value)}
                  icon={<Target className="h-4 w-4 text-gray-400" />}
                />
                
                <Input
                  label="Échéance"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => handleInputChange('deadline', e.target.value)}
                  icon={<Calendar className="h-4 w-4 text-gray-400" />}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de don
                </label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  value={formData.donationType}
                  onChange={(e) => handleInputChange('donationType', e.target.value)}
                >
                  <option value="unique">Don unique</option>
                  <option value="recurring">Don récurrent</option>
                  <option value="both">Les deux</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="matching"
                  checked={formData.matching}
                  onChange={(e) => handleInputChange('matching', e.target.checked.toString())}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="matching" className="text-sm text-gray-700">
                  Activer le matching sponsorisé
                </label>
              </div>
              
              {formData.matching && (
                <Input
                  label="Montant du matching (€)"
                  type="number"
                  placeholder="5000"
                  value={formData.matchingAmount}
                  onChange={(e) => handleInputChange('matchingAmount', e.target.value)}
                />
              )}
            </div>
          </div>
        </Card>

        {/* Media Upload */}
        <Card>
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Médias</h3>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
                <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2">
                  Glissez votre image ici ou
                </p>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Parcourir
                </Button>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
                <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2">
                  Ajoutez une vidéo (optionnel)
                </p>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Parcourir
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Actions</h4>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => setShowPreview(true)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Aperçu
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Brouillon
                </Button>
              </div>
              
              <Button className="w-full">
                <Share2 className="h-4 w-4 mr-2" />
                Publier la campagne
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Tips Section */}
      <Card variant="neo">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Conseils pour une campagne réussie</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Target className="h-6 w-6 text-primary-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Objectif clair</h4>
              <p className="text-sm text-gray-600">Définissez un objectif précis et réaliste</p>
            </div>
            
            <div className="text-center">
              <div className="h-12 w-12 bg-success-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Image className="h-6 w-6 text-success-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Visuels impactants</h4>
              <p className="text-sm text-gray-600">Utilisez des images qui racontent votre histoire</p>
            </div>
            
            <div className="text-center">
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Share2 className="h-6 w-6 text-orange-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Partage actif</h4>
              <p className="text-sm text-gray-600">Partagez régulièrement sur vos réseaux</p>
            </div>
          </div>
        </div>
      </Card>

      <AIModal />
      <PreviewModal />
    </div>
  );
};