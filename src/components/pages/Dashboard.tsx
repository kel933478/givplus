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
          icon={<TrendingUp className="h-6 w-6 text-primary-500" />}
        />
        <Stats
          title="Total des dons"
          value="156,789 €"
          change="+8.3% ce mois"
          changeType="positive"
          icon={<Target className="h-6 w-6 text-success-500" />}
        />
        <Stats
          title="Campagnes actives"
          value="12"
          change="2 nouvelles"
          changeType="positive"
          icon={<Target className="h-6 w-6 text-primary-500" />}
        />
        <Stats
          title="Nouveaux donateurs"
          value="347"
          change="+15.2% ce mois"
          changeType="positive"
          icon={<Users className="h-6 w-6 text-success-500" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Donations */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Derniers dons</h3>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
          
          <div className="space-y-4">
            {recentDonations.map((donation, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{donation.donor}</p>
                    <p className="text-sm text-gray-500">{donation.campaign}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">+{donation.amount} €</p>
                  <p className="text-sm text-gray-500">{donation.date}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <Button variant="outline" className="w-full">
              Voir tous les dons
            </Button>
          </div>
        </Card>

        {/* Top Donors */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top donateurs</h3>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {topDonors.map((donor, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-gradient-to-r from-primary-500 to-success-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{donor.name}</p>
                    <p className="text-xs text-gray-500">{donor.donations} dons</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-900">{donor.total} €</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Active Campaigns */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Campagnes actives</h3>
          <Button size="sm">
            <Target className="h-4 w-4 mr-2" />
            Nouvelle campagne
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCampaigns.map((campaign, index) => (
            <Card key={index} variant="neo" className="relative">
              <div className="absolute top-4 right-4">
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{campaign.title}</h4>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{campaign.raised.toLocaleString()} € collectés</span>
                    <span>{campaign.donors} donateurs</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Objectif: {campaign.target.toLocaleString()} €</span>
                    <span className="font-medium text-gray-900">{campaign.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary-500 to-success-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${campaign.progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    Voir
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-2" />
                    Modifier
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Monthly Chart */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Évolution mensuelle</h3>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
        
        <div className="h-64 bg-gradient-to-r from-primary-50 to-success-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-primary-500 mx-auto mb-4" />
            <p className="text-gray-600">Graphique interactif des dons mensuels</p>
            <p className="text-sm text-gray-500 mt-2">Visualisation des tendances et projections</p>
          </div>
        </div>
      </Card>
    </div>
  );
};