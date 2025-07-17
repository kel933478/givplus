import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { 
  ArrowLeft, 
  User, 
  Mail,
  Phone,
  Calendar,
  Heart,
  TrendingUp,
  Gift
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Header } from '../layout/Header';
import type { Donor, Donation } from "@shared/schema";

export const DonorDetails = () => {
  const [, setLocation] = useLocation();

  // Fetch donors from API  
  const { data: donors = [], isLoading } = useQuery({
    queryKey: ['/api/donors'],
    queryFn: async () => {
      const response = await fetch('/api/donors');
      if (!response.ok) throw new Error('Failed to fetch donors');
      return response.json() as Promise<Donor[]>;
    }
  });

  // Fetch recent donations
  const { data: recentDonations = [] } = useQuery({
    queryKey: ['/api/donations/recent'],
    queryFn: async () => {
      const response = await fetch('/api/donations/recent?limit=20');
      if (!response.ok) return [];
      return response.json() as Promise<Donation[]>;
    }
  });

  const getTagColor = (tag: string) => {
    const colors = {
      'VIP': 'bg-purple-100 text-purple-800 border-purple-200',
      'régulier': 'bg-blue-100 text-blue-800 border-blue-200',
      'nouveau': 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[tag as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getFrequencyText = (frequency: string) => {
    const texts = {
      'monthly': 'Mensuel',
      'quarterly': 'Trimestriel',
      'yearly': 'Annuel',
      'unique': 'Unique'
    };
    return texts[frequency as keyof typeof texts] || frequency;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header title="Gestion des donateurs" />
      
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={() => setLocation('/dashboard')}
        className="flex items-center space-x-2"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Retour au tableau de bord</span>
      </Button>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card variant="elevated">
          <div className="p-6">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <User className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total donateurs</p>
                <p className="text-2xl font-bold text-gray-900">{donors.length}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card variant="elevated">
          <div className="p-6">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-success-100 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-success-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Donateurs VIP</p>
                <p className="text-2xl font-bold text-gray-900">
                  {donors.filter(d => d.tag === 'VIP').length}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card variant="elevated">
          <div className="p-6">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Donateurs réguliers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {donors.filter(d => d.frequency !== 'unique').length}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card variant="elevated">
          <div className="p-6">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Gift className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Nouveaux ce mois</p>
                <p className="text-2xl font-bold text-gray-900">
                  {donors.filter(d => d.tag === 'nouveau').length}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Donors List */}
      <Card variant="elevated">
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Liste des donateurs</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Donateur</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Contact</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Total donné</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Fréquence</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Statut</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Dernier don</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {donors.map((donor) => (
                  <tr key={donor.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-primary-600" />
                        </div>
                        <div className="ml-3">
                          <p className="font-semibold text-gray-900">
                            {donor.firstName} {donor.lastName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-4 w-4 mr-2" />
                          {donor.email}
                        </div>
                        {donor.phone && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="h-4 w-4 mr-2" />
                            {donor.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-primary-600">
                        {parseFloat(donor.totalDonated || "0").toLocaleString()} €
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-900">
                        {getFrequencyText(donor.frequency)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getTagColor(donor.tag)}`}>
                        {donor.tag}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {donor.lastDonation 
                          ? new Date(donor.lastDonation).toLocaleDateString('fr-FR')
                          : 'Jamais'
                        }
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {donors.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Aucun donateur trouvé
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Recent Donations */}
      <Card variant="elevated">
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Dons récents</h3>
          
          <div className="space-y-4">
            {recentDonations.slice(0, 10).map((donation, index) => (
              <div key={donation.id || index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-success-100 rounded-full flex items-center justify-center">
                    <Heart className="h-5 w-5 text-success-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Don anonyme</p>
                    <p className="text-sm text-gray-600">
                      {donation.description || 'Don générique'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(donation.createdAt || Date.now()).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-success-600">
                    {parseFloat(donation.amount).toLocaleString()} €
                  </p>
                  <p className="text-xs text-gray-500">
                    {donation.status}
                  </p>
                </div>
              </div>
            ))}

            {recentDonations.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Aucun don récent
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};