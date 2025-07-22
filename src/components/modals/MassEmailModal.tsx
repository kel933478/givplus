import { useState } from 'react';
import { X, Mail, Users, Send } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface MassEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCampaigns: Array<{
    id: string;
    title: string;
    contactCount: number;
  }>;
}

export const MassEmailModal = ({ isOpen, onClose, selectedCampaigns }: MassEmailModalProps) => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isSending, setIsSending] = useState(false);

  const totalContacts = selectedCampaigns.reduce((sum, campaign) => sum + campaign.contactCount, 0);

  const handleSend = async () => {
    setIsSending(true);
    try {
      const response = await fetch('/api/communications/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          content,
          campaignIds: selectedCampaigns.map(c => parseInt(c.id))
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Email envoyé avec succès:', result);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi email:', error);
    } finally {
      setIsSending(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <Card variant="elevated" className="relative">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-success-100 rounded-lg flex items-center justify-center">
                <Mail className="h-6 w-6 text-success-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Envoi Email groupé</h2>
                <p className="text-sm text-gray-600">Envoyez un email à tous les contacts sélectionnés</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="hover:scale-110">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Subject Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Objet de l'email
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Saisissez l'objet de votre email..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
              />
            </div>

            {/* Content Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Contenu de l'email
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Rédigez le contenu de votre email..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
                rows={8}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Preview */}
              {(subject || content) && (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900">
                    Aperçu de l'email
                  </label>
                  <Card variant="outline" className="p-4 space-y-3">
                    <div className="border-b border-gray-200 pb-3">
                      <p className="text-sm text-gray-500">De: votre-association@giveplus.com</p>
                      <p className="text-sm text-gray-500">À: contacts sélectionnés</p>
                      <p className="font-semibold text-gray-900">
                        Objet: {subject || 'Sans objet'}
                      </p>
                    </div>
                    <div className="whitespace-pre-wrap text-sm text-gray-700">
                      {content || 'Contenu vide'}
                    </div>
                  </Card>
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
                      <span className="text-sm font-semibold text-success-600">
                        {campaign.contactCount} contacts
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sending Info */}
            <Card variant="gradient" className="bg-gradient-to-r from-success-50 to-primary-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Send className="h-6 w-6 text-success-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Envoi gratuit</p>
                    <p className="text-sm text-gray-600">Emails inclus dans votre abonnement</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-success-600">{totalContacts}</p>
                  <p className="text-sm text-gray-600">Destinataires</p>
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
              disabled={!subject.trim() || !content.trim() || isSending}
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