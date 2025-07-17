import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useParams } from "wouter";
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Calendar, 
  Target, 
  Users,
  TrendingUp,
  DollarSign,
  Clock,
  MapPin
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Header } from '../layout/Header';
import type { Campaign, Donation } from "@shared/schema";

export const CampaignDetails = () => {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const [donationAmount, setDonationAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const queryClient = useQueryClient();

  // Fetch campaign details
  const { data: campaign, isLoading } = useQuery({
    queryKey: ['/api/campaigns', id],
    queryFn: async () => {
      const response = await fetch(`/api/campaigns/${id}`);
      if (!response.ok) throw new Error('Campaign not found');
      return response.json() as Promise<Campaign>;
    },
    enabled: !!id
  });

  // Fetch campaign donations
  const { data: donations = [] } = useQuery({
    queryKey: ['/api/donations', id],
    queryFn: async () => {
      const response = await fetch(`/api/donations/campaign/${id}`);
      if (!response.ok) return [];
      return response.json() as Promise<Donation[]>;
    },
    enabled: !!id
  });

  // Donation mutation
  const donationMutation = useMutation({
    mutationFn: async (donationData: { amount: string; donorName: string; donorEmail: string }) => {
      // First create or find donor
      const donorResponse = await fetch('/api/donors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: donationData.donorName.split(' ')[0] || donationData.donorName,
          lastName: donationData.donorName.split(' ').slice(1).join(' ') || '',
          email: donationData.donorEmail
        })
      });
      
      const donor = await donorResponse.json();
      
      // Create donation
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId: parseInt(id!),
          donorId: donor.id,
          amount: donationData.amount,
          description: `Don pour ${campaign?.title}`
        })
      });
      
      if (!response.ok) throw new Error('Failed to create donation');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/campaigns', id] });
      queryClient.invalidateQueries({ queryKey: ['/api/donations', id] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
      setDonationAmount('');
      setDonorName('');
      setDonorEmail('');
    }
  });

  const handleDonation = () => {
    if (donationAmount && donorName && donorEmail) {
      donationMutation.mutate({
        amount: donationAmount,
        donorName,
        donorEmail
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-bold text-gray-900">Campagne introuvable</h2>
        <Button onClick={() => setLocation('/')} className="mt-4">
          Retour à l'accueil
        </Button>
      </div>
    );
  }

  const progress = Math.round((parseFloat(campaign.raised || "0") / parseFloat(campaign.target)) * 100);
  const remainingDays = campaign.deadline ? Math.ceil((new Date(campaign.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null;

  return (
    <div className="space-y-6">
      <Header title={campaign.title} />
      
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={() => setLocation('/dashboard')}
        className="flex items-center space-x-2"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Retour au tableau de bord</span>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaign Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Image */}
          <Card variant="elevated">
            <div className="h-64 bg-gradient-to-r from-primary-500 to-primary-600 rounded-t-xl flex items-center justify-center">
              <Heart className="h-16 w-16 text-white" />
            </div>
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{campaign.title}</h1>
              <p className="text-gray-600 leading-relaxed">
                {campaign.description || "Cette campagne vise à collecter des fonds pour une cause importante. Votre contribution peut faire la différence et aider à atteindre notre objectif."}
              </p>
            </div>
          </Card>

          {/* Progress */}
          <Card variant="elevated">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Progression</h3>
                <span className="text-2xl font-bold text-primary-600">{progress}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                <div 
                  className="bg-gradient-to-r from-primary-500 to-primary-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {parseFloat(campaign.raised || "0").toLocaleString()} €
                  </div>
                  <div className="text-sm text-gray-600">Collectés</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {parseFloat(campaign.target).toLocaleString()} €
                  </div>
                  <div className="text-sm text-gray-600">Objectif</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.floor(parseFloat(campaign.raised || "0") / 50)}
                  </div>
                  <div className="text-sm text-gray-600">Donateurs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {remainingDays !== null ? remainingDays : '--'}
                  </div>
                  <div className="text-sm text-gray-600">Jours restants</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Recent Donations */}
          <Card variant="elevated">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Derniers dons</h3>
              <div className="space-y-3">
                {donations.slice(0, 5).map((donation, index) => (
                  <div key={donation.id || index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <Heart className="h-4 w-4 text-primary-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Donateur anonyme</div>
                        <div className="text-xs text-gray-500">
                          {new Date(donation.createdAt || Date.now()).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-primary-600">
                      {parseFloat(donation.amount).toLocaleString()} €
                    </div>
                  </div>
                ))}
                {donations.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Aucun don pour le moment. Soyez le premier à contribuer !
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Donation Form */}
        <div className="space-y-6">
          <Card variant="elevated" className="sticky top-6">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Faire un don</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Montant (€)
                  </label>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="Entrez le montant"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Votre nom"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <Button 
                  onClick={handleDonation}
                  disabled={!donationAmount || !donorName || !donorEmail || donationMutation.isPending}
                  className="w-full"
                >
                  {donationMutation.isPending ? 'Traitement...' : `Donner ${donationAmount ? donationAmount + ' €' : ''}`}
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  Transaction sécurisée • Données protégées
                </div>
              </div>
            </div>
          </Card>

          {/* Share */}
          <Card variant="elevated">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Partager</h3>
              <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
                <Share2 className="h-4 w-4" />
                <span>Partager cette campagne</span>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};