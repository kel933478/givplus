import { useState } from 'react';
import { X, MessageSquare, Users, Calculator } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface MassSMSModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCampaigns: Array<{
    id: string;
    title: string;
    contactCount: number;
  }>;
}

export const MassSMSModal = ({ isOpen, onClose, selectedCampaigns }: MassSMSModalProps) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const maxChars = 160;
  const costPerSMS = 0.05;
  const totalContacts = selectedCampaigns.reduce((sum, campaign) => sum + campaign.contactCount, 0);
  const totalCost = totalContacts * costPerSMS;

  const handleSend = async () => {
    setIsSending(true);
    try {
      const response = await fetch('/api/communications/sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          campaignIds: selectedCampaigns.map(c => parseInt(c.id))
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('SMS envoyé avec succès:', result);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi SMS:', error);
    } finally {
      setIsSending(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <Card variant="elevated" className="relative">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Envoi SMS groupé</h2>
                <p className="text-sm text-gray-600">Envoyez un SMS à tous les contacts sélectionnés</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="hover:scale-110">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Message Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Message SMS
              </label>
              <div className="relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, maxChars))}
                  placeholder="Rédigez votre message SMS..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
                  rows={4}
                />
                <div className={`absolute bottom-3 right-3 text-xs font-medium ${
                  message.length > maxChars * 0.9 ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {message.length}/{maxChars}
                </div>
              </div>
            </div>

            {/* Preview */}
            {message && (
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Aperçu du SMS
                </label>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="bg-primary-500 text-white p-3 rounded-lg max-w-xs ml-auto">
                    <p className="text-sm">{message}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Selected Campaigns */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Campagnes sélectionnées
              </label>
              <div className="space-y-2">
                {selectedCampaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-gray-600" />
                      <span className="font-medium text-gray-900">{campaign.title}</span>
                    </div>
                    <span className="text-sm font-semibold text-primary-600">
                      {campaign.contactCount} contacts
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost Estimation */}
            <Card variant="gradient" className="bg-gradient-to-r from-primary-50 to-success-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Calculator className="h-6 w-6 text-primary-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Estimation du coût</p>
                    <p className="text-sm text-gray-600">{totalContacts} SMS × {costPerSMS}€</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-600">{totalCost.toFixed(2)}€</p>
                  <p className="text-sm text-gray-600">Total</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-4 p-6 border-t border-gray-200">
            <Button variant="outline" onClick={onClose} disabled={isSending}>
              Annuler
            </Button>
            <Button 
              onClick={handleSend} 
              disabled={!message.trim() || isSending}
              className="px-6"
            >
              {isSending ? 'Envoi en cours...' : `Envoyer à ${totalContacts} contacts`}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};