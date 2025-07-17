import { useState } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { 
  ArrowLeft, 
  Save, 
  Target,
  Calendar,
  FileText,
  Euro
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Header } from '../layout/Header';
import { insertCampaignSchema } from "@shared/schema";

export const CreateCampaign = () => {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target: '',
    deadline: '',
    contactCount: ''
  });

  const createCampaignMutation = useMutation({
    mutationFn: async (campaignData: typeof formData) => {
      const payload = {
        associationId: 1, // Default association for demo
        title: campaignData.title,
        description: campaignData.description,
        target: campaignData.target,
        deadline: campaignData.deadline ? new Date(campaignData.deadline).toISOString() : undefined,
        contactCount: parseInt(campaignData.contactCount) || 0,
        status: 'active' as const
      };

      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) throw new Error('Failed to create campaign');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
      setLocation('/dashboard');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.target) {
      createCampaignMutation.mutate(formData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <Header title="Créer une nouvelle campagne" />
      
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={() => setLocation('/dashboard')}
        className="flex items-center space-x-2"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Retour au tableau de bord</span>
      </Button>

      <div className="max-w-2xl mx-auto">
        <Card variant="elevated">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                <FileText className="inline h-4 w-4 mr-2" />
                Titre de la campagne *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Ex: Éducation pour tous"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Décrivez l'objectif et l'impact de votre campagne..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
              />
            </div>

            {/* Target Amount */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                <Euro className="inline h-4 w-4 mr-2" />
                Objectif de collecte (€) *
              </label>
              <input
                type="number"
                value={formData.target}
                onChange={(e) => handleInputChange('target', e.target.value)}
                placeholder="25000"
                min="1"
                step="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
                required
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                <Calendar className="inline h-4 w-4 mr-2" />
                Date limite (optionnel)
              </label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => handleInputChange('deadline', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
              />
            </div>

            {/* Contact Count */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                <Target className="inline h-4 w-4 mr-2" />
                Nombre de contacts estimé
              </label>
              <input
                type="number"
                value={formData.contactCount}
                onChange={(e) => handleInputChange('contactCount', e.target.value)}
                placeholder="500"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
              />
              <p className="text-xs text-gray-500 mt-1">
                Nombre de personnes que vous comptez contacter pour cette campagne
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setLocation('/dashboard')}
                className="flex-1 sm:flex-none"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={!formData.title || !formData.target || createCampaignMutation.isPending}
                className="flex-1 flex items-center justify-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>
                  {createCampaignMutation.isPending ? 'Création...' : 'Créer la campagne'}
                </span>
              </Button>
            </div>

            {/* Tips */}
            <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
              <h4 className="font-semibold text-primary-900 mb-2">Conseils pour une campagne réussie:</h4>
              <ul className="text-sm text-primary-800 space-y-1">
                <li>• Choisissez un titre clair et accrocheur</li>
                <li>• Définissez un objectif réaliste et motivant</li>
                <li>• Expliquez concrètement l'impact des dons</li>
                <li>• Partagez régulièrement les progrès</li>
              </ul>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};