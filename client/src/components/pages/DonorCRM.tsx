import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  MessageSquare,
  Download,
  Plus,
  Edit,
  Eye,
  Star,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Header } from '../layout/Header';
import { Modal } from '../ui/Modal';
import { Stats } from '../ui/Stats';

export const DonorCRM: React.FC = () => {
  const [showDonorModal, setShowDonorModal] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('all');

  const donors = [
    {
      id: '1',
      firstName: 'Marie',
      lastName: 'Dubois',
      email: 'marie.dubois@email.com',
      phone: '+33 6 12 34 56 78',
      totalDonated: 2500,
      lastDonation: '2024-01-15',
      frequency: 'monthly',
      tag: 'VIP',
      campaigns: ['Éducation pour tous', 'Soutien alimentaire'],
      donationHistory: [
        { date: '2024-01-15', amount: 250, campaign: 'Éducation pour tous' },
        { date: '2023-12-15', amount: 250, campaign: 'Éducation pour tous' },
        { date: '2023-11-15', amount: 200, campaign: 'Soutien alimentaire' }
      ]
    },
    {
      id: '2',
      firstName: 'Pierre',
      lastName: 'Martin',
      email: 'pierre.martin@email.com',
      phone: '+33 6 98 76 54 32',
      totalDonated: 1800,
      lastDonation: '2024-01-10',
      frequency: 'quarterly',
      tag: 'régulier',
      campaigns: ['Accès à l\'eau potable'],
      donationHistory: [
        { date: '2024-01-10', amount: 500, campaign: 'Accès à l\'eau potable' },
        { date: '2023-10-10', amount: 500, campaign: 'Accès à l\'eau potable' }
      ]
    },
    {
      id: '3',
      firstName: 'Julie',
      lastName: 'Bernard',
      email: 'julie.bernard@email.com',
      phone: '+33 6 11 22 33 44',
      totalDonated: 500,
      lastDonation: '2024-01-12',
      frequency: 'unique',
      tag: 'nouveau',
      campaigns: ['Éducation pour tous'],
      donationHistory: [
        { date: '2024-01-12', amount: 500, campaign: 'Éducation pour tous' }
      ]
    }
  ];

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'VIP': return 'bg-purple-100 text-purple-800';
      case 'régulier': return 'bg-blue-100 text-blue-800';
      case 'nouveau': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = `${donor.firstName} ${donor.lastName} ${donor.email}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterTag === 'all' || donor.tag === filterTag;
    return matchesSearch && matchesFilter;
  });

  const DonorModal = () => (
    <Modal 
      isOpen={showDonorModal} 
      onClose={() => setShowDonorModal(false)} 
      title={selectedDonor ? `${selectedDonor.firstName} ${selectedDonor.lastName}` : 'Nouveau donateur'}
      size="lg"
    >
      {selectedDonor && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Informations personnelles</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <p className="font-medium">{selectedDonor.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Téléphone</label>
                  <p className="font-medium">{selectedDonor.phone}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Statut</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTagColor(selectedDonor.tag)}`}>
                    {selectedDonor.tag}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Statistiques</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600">Total des dons</label>
                  <p className="font-medium text-lg text-success-600">{selectedDonor.totalDonated} €</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Dernier don</label>
                  <p className="font-medium">{new Date(selectedDonor.lastDonation).toLocaleDateString('fr-FR')}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Fréquence</label>
                  <p className="font-medium capitalize">{selectedDonor.frequency}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Historique des dons</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2">Date</th>
                    <th className="text-left py-2">Campagne</th>
                    <th className="text-right py-2">Montant</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedDonor.donationHistory.map((donation: any, index: number) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-2">{new Date(donation.date).toLocaleDateString('fr-FR')}</td>
                      <td className="py-2">{donation.campaign}</td>
                      <td className="py-2 text-right font-medium text-success-600">{donation.amount} €</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button className="flex-1">
              <Mail className="h-4 w-4 mr-2" />
              Envoyer un email
            </Button>
            <Button variant="outline" className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" />
              Envoyer SMS
            </Button>
            <Button variant="outline" className="flex-1">
              <Phone className="h-4 w-4 mr-2" />
              Appeler
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );

  return (
    <div className="space-y-6">
      <Header title="CRM Donateurs" />
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Stats
          title="Total donateurs"
          value="1,247"
          change="+23 ce mois"
          changeType="positive"
          icon={<Users className="h-6 w-6 text-primary-500" />}
        />
        <Stats
          title="Donateurs VIP"
          value="89"
          change="+5 ce mois"
          changeType="positive"
          icon={<Star className="h-6 w-6 text-purple-500" />}
        />
        <Stats
          title="Don moyen"
          value="187 €"
          change="+12% ce mois"
          changeType="positive"
          icon={<TrendingUp className="h-6 w-6 text-success-500" />}
        />
        <Stats
          title="Taux de rétention"
          value="73%"
          change="+2.1% ce mois"
          changeType="positive"
          icon={<Calendar className="h-6 w-6 text-blue-500" />}
        />
      </div>

      {/* Filters and Search */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un donateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="VIP">VIP</option>
              <option value="régulier">Régulier</option>
              <option value="nouveau">Nouveau</option>
            </select>
            
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtres avancés
            </Button>
            
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter donateur
            </Button>
          </div>
        </div>
      </Card>

      {/* Donors Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 font-medium text-gray-900">Donateur</th>
                <th className="text-left py-4 px-4 font-medium text-gray-900">Contact</th>
                <th className="text-left py-4 px-4 font-medium text-gray-900">Total des dons</th>
                <th className="text-left py-4 px-4 font-medium text-gray-900">Dernier don</th>
                <th className="text-left py-4 px-4 font-medium text-gray-900">Fréquence</th>
                <th className="text-left py-4 px-4 font-medium text-gray-900">Statut</th>
                <th className="text-center py-4 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonors.map((donor) => (
                <tr key={donor.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="font-medium text-primary-600">
                          {donor.firstName.charAt(0)}{donor.lastName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{donor.firstName} {donor.lastName}</p>
                        <p className="text-sm text-gray-500">{donor.campaigns.length} campagne(s)</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-sm text-gray-900">{donor.email}</p>
                      <p className="text-sm text-gray-500">{donor.phone}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-success-600">{donor.totalDonated} €</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-900">
                      {new Date(donor.lastDonation).toLocaleDateString('fr-FR')}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-900 capitalize">{donor.frequency}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTagColor(donor.tag)}`}>
                      {donor.tag}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedDonor(donor);
                          setShowDonorModal(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-700">
            Affichage de 1 à {filteredDonors.length} sur {donors.length} donateurs
          </p>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">Précédent</Button>
            <Button variant="outline" size="sm">Suivant</Button>
          </div>
        </div>
      </Card>

      <DonorModal />
    </div>
  );
};