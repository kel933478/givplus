import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Target, 
  MessageSquare,
  ArrowUpRight,
  Download,
  Eye,
  Edit,
  MoreHorizontal
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Stats } from '../ui/Stats';
import { Header } from '../layout/Header';

export const Dashboard: React.FC = () => {
  const recentDonations = [
    { donor: 'Marie Dubois', amount: 250, campaign: 'Éducation pour tous', date: 'Il y a 2h' },
    { donor: 'Pierre Martin', amount: 100, campaign: 'Soutien alimentaire', date: 'Il y a 4h' },
    { donor: 'Julie Bernard', amount: 500, campaign: 'Éducation pour tous', date: 'Il y a 1j' },
  ];

  const topDonors = [
    { name: 'Marie Dubois', total: 2500, donations: 12 },
    { name: 'Pierre Martin', total: 1800, donations: 8 },
    { name: 'Julie Bernard', total: 1200, donations: 6 },
  ];

  const activeCampaigns = [
    { 
      title: 'Éducation pour tous', 
      raised: 15420, 
      target: 25000, 
      progress: 62,
      donors: 234
    },
    { 
      title: 'Soutien alimentaire', 
      raised: 8750, 
      target: 15000, 
      progress: 58,
      donors: 156
    },
    { 
      title: 'Accès à l\'eau potable', 
      raised: 32100, 
      target: 50000, 
      progress: 64,
      donors: 445
    },
  ];

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
          title="Total des dons"
          value="156,789 €"
          change="+8.3% ce mois"
          changeType="positive"
          icon={<Target className="h-8 w-8 text-success-600" />}
        />
        <Stats
          title="Campagnes actives"
          value="12"
          change="2 nouvelles"
          changeType="positive"
          icon={<Target className="h-8 w-8 text-primary-600" />}
        />
        <Stats
          title="Nouveaux donateurs"
          value="347"
          change="+15.2% ce mois"
          changeType="positive"
          icon={<Users className="h-8 w-8 text-success-600" />}
        />
      </div>

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
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Campagnes actives</h3>
          <Button size="sm" className="hover:scale-105">
            <Target className="h-5 w-5 mr-2" />
            Nouvelle campagne
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCampaigns.map((campaign, index) => (
            <Card key={index} variant="gradient" className="relative hover:scale-105 transition-all duration-300">
              <div className="absolute top-6 right-6">
                <Button variant="ghost" size="sm" className="hover:scale-110">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-3">{campaign.title}</h4>
                  <div className="flex items-center justify-between text-sm font-medium text-gray-700">
                    <span>{campaign.raised.toLocaleString()} € collectés</span>
                    <span>{campaign.donors} donateurs</span>
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
                  <Button variant="outline" size="sm" className="flex-1 hover:scale-105">
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
          ))}
        </div>
      </Card>

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