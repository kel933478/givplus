import React, { useState } from 'react';
import { 
  CreditCard, 
  Copy, 
  Download, 
  Upload, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Search,
  Calendar,
  Check
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Header } from '../layout/Header';
import { Stats } from '../ui/Stats';

export const Banking: React.FC = () => {
  const [showCard, setShowCard] = useState(false);
  const [copied, setCopied] = useState(false);

  const transactions = [
    {
      id: '1',
      type: 'donation',
      amount: 250,
      description: 'Don - Campagne Éducation',
      date: '2024-01-15',
      status: 'completed',
      donor: 'Marie Dubois'
    },
    {
      id: '2',
      type: 'expense',
      amount: -45,
      description: 'Frais de communication SMS',
      date: '2024-01-14',
      status: 'completed'
    },
    {
      id: '3',
      type: 'donation',
      amount: 500,
      description: 'Don - Campagne Urgence',
      date: '2024-01-13',
      status: 'completed',
      donor: 'Pierre Martin'
    },
    {
      id: '4',
      type: 'refund',
      amount: -100,
      description: 'Remboursement don annulé',
      date: '2024-01-12',
      status: 'pending'
    }
  ];

  const handleCopyIban = () => {
    navigator.clipboard.writeText('FR76 1234 5678 9012 3456 7890 123');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Header title="Espace Banque" />
      
      {/* Account Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Stats
          title="Solde disponible"
          value="47,238.45 €"
          change="+12.5% ce mois"
          changeType="positive"
          icon={<TrendingUp className="h-6 w-6 text-success-500" />}
        />
        <Stats
          title="Entrées du mois"
          value="23,450 €"
          change="+8.3% vs mois dernier"
          changeType="positive"
          icon={<ArrowDownRight className="h-6 w-6 text-success-500" />}
        />
        <Stats
          title="Sorties du mois"
          value="1,234 €"
          change="-2.1% vs mois dernier"
          changeType="positive"
          icon={<ArrowUpRight className="h-6 w-6 text-red-500" />}
        />
      </div>

      {/* Account Details & Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* IBAN */}
        <Card>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Compte professionnel</h3>
              <div className="px-3 py-1 bg-success-100 text-success-800 rounded-full text-sm font-medium">
                Actif
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  IBAN
                </label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 p-3 bg-gray-50 rounded-lg border border-gray-300">
                    <p className="font-mono text-sm">FR76 1234 5678 9012 3456 7890 123</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyIban}
                    className={copied ? 'text-success-600' : ''}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  BIC
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-300">
                  <p className="font-mono text-sm">GIVEPLUSXXX</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titulaire
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-300">
                  <p className="text-sm">Association XYZ</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Virtual Card */}
        <Card>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Carte virtuelle</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCard(!showCard)}
              >
                {showCard ? 'Masquer' : 'Afficher'}
              </Button>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-r from-primary-500 to-success-500 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-sm opacity-90">Carte de débit</p>
                    <p className="text-lg font-semibold">GIVE PLUS++</p>
                  </div>
                  <CreditCard className="h-8 w-8" />
                </div>
                
                <div className="space-y-4">
                  <div className="font-mono text-lg tracking-wider">
                    {showCard ? '4532 •••• •••• 8901' : '•••• •••• •••• ••••'}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs opacity-75">Expire le</p>
                      <p className="font-mono">{showCard ? '12/27' : '••/••'}</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-75">CVV</p>
                      <p className="font-mono">{showCard ? '123' : '•••'}</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-75">Titulaire</p>
                      <p className="text-sm">Association XYZ</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                Bloquer
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Renouveler
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Transactions */}
      <Card>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Historique des transactions</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtrer
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une transaction..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Période
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Description</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Montant</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Statut</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm text-gray-900">
                      {new Date(transaction.date).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                        {transaction.donor && (
                          <p className="text-xs text-gray-500">Par {transaction.donor}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.type === 'donation' ? 'bg-success-100 text-success-800' :
                        transaction.type === 'expense' ? 'bg-red-100 text-red-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {transaction.type === 'donation' ? 'Don' :
                         transaction.type === 'expense' ? 'Dépense' : 'Remboursement'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={`font-medium ${
                        transaction.amount > 0 ? 'text-success-600' : 'text-red-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)} €
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.status === 'completed' ? 'bg-success-100 text-success-800' :
                        transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status === 'completed' ? 'Terminé' :
                         transaction.status === 'pending' ? 'En attente' : 'Échoué'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Affichage de 1 à 4 sur 156 transactions
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Précédent</Button>
              <Button variant="outline" size="sm">Suivant</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Upload Documents */}
      <Card>
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Justificatifs</h3>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-2">
              Glissez vos justificatifs ici ou
            </p>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Parcourir
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="h-10 w-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Download className="h-5 w-5 text-primary-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Relevé janvier 2024</p>
                <p className="text-xs text-gray-500">PDF • 245 KB</p>
              </div>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="h-10 w-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Download className="h-5 w-5 text-primary-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Relevé décembre 2023</p>
                <p className="text-xs text-gray-500">PDF • 198 KB</p>
              </div>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};