import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  TrendingUp, 
  Users, 
  Target, 
  MessageSquare,
  ArrowUpRight,
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  CheckSquare,
  Square,
  ChevronDown,
  Mail
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Stats } from '../ui/Stats';
import { Header } from '../layout/Header';
import { MassSMSModal } from '../modals/MassSMSModal';
import { MassEmailModal } from '../modals/MassEmailModal';
import { QuickActions } from '../features/QuickActions';
import type { Campaign } from "@shared/schema";
import type { CampaignSelection } from '../../types';

// Mock data for recent donations and top donors
const recentDonations = [
  { donor: 'Marie Dubois', campaign: 'Éducation pour tous', amount: 250, date: 'Il y a 2h' },
  { donor: 'Pierre Martin', campaign: 'Soutien alimentaire', amount: 100, date: 'Il y a 4h' },
  { donor: 'Julie Bernard', campaign: 'Accès à l\'eau potable', amount: 500, date: 'Il y a 6h' },
  { donor: 'Thomas Leroy', campaign: 'Éducation pour tous', amount: 150, date: 'Il y a 8h' },
  { donor: 'Sophie Moreau', campaign: 'Soutien alimentaire', amount: 75, date: 'Il y a 12h' }
];

const topDonors = [
  { name: 'Marie Dubois', total: 2500, donations: 12 },
  { name: 'Pierre Martin', total: 1800, donations: 8 },
  { name: 'Julie Bernard', total: 1200, donations: 6 },
  { name: 'Thomas Leroy', total: 950, donations: 5 },
  { name: 'Sophie Moreau', total: 750, donations: 4 }
];

export const Dashboard = () => {
  const [selectedCampaigns, setSelectedCampaigns] = useState<number[]>([]);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showSMSModal, setShowSMSModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const queryClient = useQueryClient();

  // Fetch campaigns from API
  const { data: campaigns = [], isLoading: campaignsLoading } = useQuery({
    queryKey: ['/api/campaigns'],
    queryFn: async () => {
      const response = await fetch('/api/campaigns');
      if (!response.ok) throw new Error('Failed to fetch campaigns');
      return response.json() as Promise<Campaign[]>;
    }
  });

  // Fetch statistics from API
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/stats'],
    queryFn: async () => {
      const response = await fetch('/api/stats');
      if (!response.ok) throw new Error('Failed to fetch stats');
      return response.json();
    }
  });

  // Process campaigns data for display
  const activeCampaigns = campaigns.map(campaign => ({
    id: campaign.id,
    title: campaign.title,
    raised: parseFloat(campaign.raised || "0"),
    target: parseFloat(campaign.target),
    progress: Math.round((parseFloat(campaign.raised || "0") / parseFloat(campaign.target)) * 100),
    donors: Math.floor(parseFloat(campaign.raised || "0") / 50), // Estimated donors
    contactCount: campaign.contactCount || 0
  }));

  const handleSelectAll = () => {
    if (selectedCampaigns.length === activeCampaigns.length) {
      setSelectedCampaigns([]);
    } else {
      setSelectedCampaigns(activeCampaigns.map(c => c.id));
    }
  };

  const handleSelectCampaign = (campaignId: number) => {
    if (selectedCampaigns.includes(campaignId)) {
      setSelectedCampaigns(selectedCampaigns.filter(id => id !== campaignId));
    } else {
      setSelectedCampaigns([...selectedCampaigns, campaignId]);
    }
  };

  const getSelectedCampaignsData = () => {
    return activeCampaigns
      .filter(campaign => selectedCampaigns.includes(campaign.id))
      .map(campaign => ({
        id: campaign.id.toString(),
        title: campaign.title,
        contactCount: campaign.contactCount
      }));
  };

  const allSelected = selectedCampaigns.length === activeCampaigns.length;
  const someSelected = selectedCampaigns.length > 0;

  return (
    <div className="space-y-6">
      <Header title="Tableau de bord" />
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Stats
          title="Solde actuel"
          value="47,238 €"
          change="+12.5% ce mois"
          changeType="positive"
          icon={<TrendingUp className="h-8 w-8 text-primary-600" />}
        />
        <Stats
          title="Total collecté"
          value={stats ? `${stats.totalRaised.toLocaleString()} €` : "0 €"}
          change="+8.3% ce mois"
          changeType="positive"
          icon={<Target className="h-8 w-8 text-success-600" />}
        />
        <Stats
          title="Campagnes actives"
          value={stats ? stats.activeCampaigns.toString() : "0"}
          change="2 nouvelles"
          changeType="positive"
          icon={<Target className="h-8 w-8 text-primary-600" />}
        />
        <Stats
          title="Total donateurs"
          value={stats ? stats.totalDonors.toString() : "0"}
          change="+15.2% ce mois"
          changeType="positive"
          icon={<Users className="h-8 w-8 text-success-600" />}
        />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Donations */}
        <Card variant="elevated" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Derniers dons</h3>
            <Button variant="outline" size="sm" className="hover:scale-105">
              <Download className="h-5 w-5 mr-2" />
              Export CSV
            </Button>
          </div>
          
          <div className="space-y-4">
            {recentDonations.map((donation, index) => (
              <div key={index} className="flex items-center justify-between py-4 px-4 rounded-xl bg-gradient-to-r from-gray-50/50 to-white border border-gray-100 hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center shadow-sm">
                    <Users className="h-6 w-6 text-primary-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{donation.donor}</p>
                    <p className="text-sm font-medium text-gray-600">{donation.campaign}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-success-600">+{donation.amount} €</p>
                  <p className="text-sm font-medium text-gray-500">{donation.date}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <Button variant="outline" className="w-full hover:scale-105">
              Voir tous les dons
            </Button>
          </div>
        </Card>

        {/* Top Donors */}
        <Card variant="glass">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Top donateurs</h3>
            <Button variant="ghost" size="sm" className="hover:scale-110">
              <Eye className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {topDonors.map((donor, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-white/50 to-gray-50/30 hover:shadow-sm transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-gradient-to-br from-primary-500 via-primary-600 to-success-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{donor.name}</p>
                    <p className="text-sm font-medium text-gray-600">{donor.donations} dons</p>
                  </div>
                </div>
                <p className="font-bold text-lg text-success-600">{donor.total} €</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Active Campaigns */}
      <Card variant="elevated">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <h3 className="text-xl font-bold text-gray-900">Mes Campagnes</h3>
            {someSelected && (
              <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-semibold">
                {selectedCampaigns.length} sélectionnée{selectedCampaigns.length > 1 ? 's' : ''}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {someSelected && (
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowActionMenu(!showActionMenu)}
                  className="hover:scale-105"
                >
                  Actions groupées
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
                
                {showActionMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                    <div className="py-2">
                      <button 
                        onClick={handleSelectAll}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <CheckSquare className="h-4 w-4 mr-3" />
                        {allSelected ? 'Désélectionner tout' : 'Sélectionner tout'}
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedCampaigns([]);
                          setShowActionMenu(false);
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Square className="h-4 w-4 mr-3" />
                        Désélectionner tout
                      </button>
                      <hr className="my-2" />
                      <button 
                        onClick={() => {
                          setShowSMSModal(true);
                          setShowActionMenu(false);
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <MessageSquare className="h-4 w-4 mr-3" />
                        SMS Envoi mass
                      </button>
                      <button 
                        onClick={() => {
                          setShowEmailModal(true);
                          setShowActionMenu(false);
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Mail className="h-4 w-4 mr-3" />
                        Email Envoi mass
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <Button 
              size="sm" 
              className="hover:scale-105"
              onClick={() => window.location.href = '/create-campaign'}
            >
              <Target className="h-5 w-5 mr-2" />
              Nouvelle campagne
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCampaigns.map((campaign) => {
            const isSelected = selectedCampaigns.includes(campaign.id);
            return (
              <Card 
                key={campaign.id} 
                variant="gradient" 
                className={`relative hover:scale-105 transition-all duration-300 ${
                  isSelected ? 'ring-2 ring-primary-500 bg-primary-50' : ''
                }`}
              >
                <div className="absolute top-6 left-6">
                  <button
                    onClick={() => handleSelectCampaign(campaign.id)}
                    className="h-5 w-5 border-2 border-gray-300 rounded-md flex items-center justify-center hover:border-primary-500 transition-colors"
                  >
                    {isSelected && (
                      <CheckSquare className="h-4 w-4 text-primary-600" />
                    )}
                  </button>
                </div>
                
                <div className="absolute top-6 right-6">
                  <Button variant="ghost" size="sm" className="hover:scale-110">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="space-y-4 pt-8">
                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-3">{campaign.title}</h4>
                  <div className="flex items-center justify-between text-sm font-medium text-gray-700">
                    <span>{campaign.raised.toLocaleString()} € collectés</span>
                    <span>{campaign.donors} donateurs</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {campaign.contactCount} contacts
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span className="text-gray-700">Objectif: {campaign.target.toLocaleString()} €</span>
                    <span className="font-bold text-gray-900">{campaign.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-primary-500 via-primary-600 to-success-500 h-3 rounded-full transition-all duration-500 shadow-sm"
                      style={{ width: `${campaign.progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 hover:scale-105"
                    onClick={() => window.location.href = `/campaign/${campaign.id}`}
                  >
                    <Eye className="h-5 w-5 mr-2" />
                    Voir
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 hover:scale-105">
                    <Edit className="h-5 w-5 mr-2" />
                    Modifier
                  </Button>
                </div>
              </div>
            </Card>
            );
          })}
        </div>
      </Card>

      {/* Modals */}
      <MassSMSModal
        isOpen={showSMSModal}
        onClose={() => setShowSMSModal(false)}
        selectedCampaigns={getSelectedCampaignsData()}
      />
      
      <MassEmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        selectedCampaigns={getSelectedCampaignsData()}
      />

      {/* Monthly Chart */}
      <Card variant="glass">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Évolution mensuelle</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="hover:scale-105">
              <Download className="h-5 w-5 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm" className="hover:scale-105">
              <Download className="h-5 w-5 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
        
        <div className="h-72 bg-gradient-to-br from-primary-50 via-white to-success-50 rounded-2xl flex items-center justify-center shadow-inner border border-gray-100">
          <div className="text-center">
            <TrendingUp className="h-16 w-16 text-primary-600 mx-auto mb-6" />
            <p className="text-lg font-semibold text-gray-700 mb-2">Graphique interactif des dons mensuels</p>
            <p className="text-sm font-medium text-gray-600">Visualisation des tendances et projections</p>
          </div>
        </div>
      </Card>
    </div>
  );
};