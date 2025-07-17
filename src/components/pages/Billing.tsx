import React, { useState } from 'react';
import { 
  Receipt, 
  CreditCard, 
  Download, 
  Plus,
  Mail,
  MessageSquare,
  Phone,
  TrendingUp,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Header } from '../layout/Header';
import { Stats } from '../ui/Stats';
import { Modal } from '../ui/Modal';

export const Billing: React.FC = () => {
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState('');

  const billingData = {
    currentBalance: 47.50,
    monthlySpent: 23.80,
    smsCount: 156,
    emailCount: 1247,
    callMinutes: 23
  };

  const transactions = [
    {
      id: '1',
      type: 'sms',
      description: 'Campagne SMS - Rappel don',
      quantity: 45,
      unitPrice: 0.08,
      total: 3.60,
      date: '2024-01-15'
    },
    {
      id: '2',
      type: 'email',
      description: 'Newsletter mensuelle',
      quantity: 1200,
      unitPrice: 0.002,
      total: 2.40,
      date: '2024-01-14'
    },
    {
      id: '3',
      type: 'call',
      description: 'Appels donateurs VIP',
      quantity: 15,
      unitPrice: 0.12,
      total: 1.80,
      date: '2024-01-13'
    },
    {
      id: '4',
      type: 'recharge',
      description: 'Rechargement de solde',
      quantity: 1,
      unitPrice: 50.00,
      total: 50.00,
      date: '2024-01-10'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sms': return <MessageSquare className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'call': return <Phone className="h-4 w-4" />;
      case 'recharge': return <Plus className="h-4 w-4" />;
      default: return <Receipt className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sms': return 'bg-blue-100 text-blue-800';
      case 'email': return 'bg-green-100 text-green-800';
      case 'call': return 'bg-purple-100 text-purple-800';
      case 'recharge': return 'bg-success-100 text-success-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'sms': return 'SMS';
      case 'email': return 'Email';
      case 'call': return 'Appel';
      case 'recharge': return 'Rechargement';
      default: return type;
    }
  };

  const RechargeModal = () => (
    <Modal 
      isOpen={showRechargeModal} 
      onClose={() => setShowRechargeModal(false)} 
      title="Recharger mon solde"
      size="md"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Montant à recharger (€)
          </label>
          <input
            type="number"
            value={rechargeAmount}
            onChange={(e) => setRechargeAmount(e.target.value)}
            placeholder="50.00"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Tarifs de communication</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• SMS : 0,08 € par message</p>
            <p>• Email : 0,002 € par email</p>
            <p>• Appel : 0,12 € par minute</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Montants suggérés</h4>
          <div className="grid grid-cols-3 gap-2">
            {[25, 50, 100].map((amount) => (
              <button
                key={amount}
                onClick={() => setRechargeAmount(amount.toString())}
                className="p-3 border border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
              >
                {amount} €
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Button variant="outline" className="flex-1" onClick={() => setShowRechargeModal(false)}>
            Annuler
          </Button>
          <Button className="flex-1">
            <CreditCard className="h-4 w-4 mr-2" />
            Recharger {rechargeAmount} €
          </Button>
        </div>
      </div>
    </Modal>
  );

  return (
    <div className="space-y-6">
      <Header title="Facturation & Communication" />
      
      {/* Balance Alert */}
      {billingData.currentBalance < 20 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            <div>
              <p className="text-orange-800 font-medium">Solde faible</p>
              <p className="text-orange-700 text-sm">
                Votre solde est de {billingData.currentBalance} €. Rechargez pour continuer à utiliser nos services.
              </p>
            </div>
            <Button 
              size="sm" 
              onClick={() => setShowRechargeModal(true)}
              className="ml-auto"
            >
              Recharger
            </Button>
          </div>
        </div>
      )}
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Stats
          title="Solde actuel"
          value={`${billingData.currentBalance.toFixed(2)} €`}
          change={billingData.currentBalance < 20 ? "Solde faible" : "Solde correct"}
          changeType={billingData.currentBalance < 20 ? "negative" : "positive"}
          icon={<CreditCard className="h-6 w-6 text-primary-500" />}
        />
        <Stats
          title="Dépenses ce mois"
          value={`${billingData.monthlySpent.toFixed(2)} €`}
          change="+12% vs dernier mois"
          changeType="neutral"
          icon={<TrendingUp className="h-6 w-6 text-orange-500" />}
        />
        <Stats
          title="SMS envoyés"
          value={billingData.smsCount.toString()}
          change={`${(billingData.smsCount * 0.08).toFixed(2)} € ce mois`}
          changeType="neutral"
          icon={<MessageSquare className="h-6 w-6 text-blue-500" />}
        />
        <Stats
          title="Emails envoyés"
          value={billingData.emailCount.toString()}
          change={`${(billingData.emailCount * 0.002).toFixed(2)} € ce mois`}
          changeType="neutral"
          icon={<Mail className="h-6 w-6 text-success-500" />}
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Actions rapides</h3>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowRechargeModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Recharger solde
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export factures
            </Button>
          </div>
        </div>
      </Card>

      {/* Usage Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Utilisation mensuelle</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">SMS ({billingData.smsCount})</span>
                  <span className="font-medium">{(billingData.smsCount * 0.08).toFixed(2)} €</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Emails ({billingData.emailCount})</span>
                  <span className="font-medium">{(billingData.emailCount * 0.002).toFixed(2)} €</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-success-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Appels ({billingData.callMinutes} min)</span>
                  <span className="font-medium">{(billingData.callMinutes * 0.12).toFixed(2)} €</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Tarification</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-900">SMS</span>
                </div>
                <span className="font-semibold text-blue-900">0,08 € / message</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-success-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-success-600" />
                  <span className="font-medium text-success-900">Email</span>
                </div>
                <span className="font-semibold text-success-900">0,002 € / email</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-purple-600" />
                  <span className="font-medium text-purple-900">Appel</span>
                </div>
                <span className="font-semibold text-purple-900">0,12 € / minute</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">
                💡 <strong>Astuce :</strong> Les emails sont 40x moins chers que les SMS. 
                Privilégiez l'email pour vos communications de masse.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Historique des transactions</h3>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Description</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Quantité</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Prix unitaire</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Total</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm text-gray-900">
                      {new Date(transaction.date).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(transaction.type)}`}>
                        {getTypeIcon(transaction.type)}
                        <span className="ml-1">{getTypeName(transaction.type)}</span>
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900">{transaction.description}</td>
                    <td className="py-4 px-4 text-right text-sm text-gray-900">{transaction.quantity}</td>
                    <td className="py-4 px-4 text-right text-sm text-gray-900">
                      {transaction.type !== 'recharge' ? `${transaction.unitPrice.toFixed(3)} €` : '-'}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={`font-medium ${
                        transaction.type === 'recharge' ? 'text-success-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'recharge' ? '+' : '-'}{transaction.total.toFixed(2)} €
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Affichage de 1 à {transactions.length} sur {transactions.length} transactions
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Précédent</Button>
              <Button variant="outline" size="sm">Suivant</Button>
            </div>
          </div>
        </div>
      </Card>

      <RechargeModal />
    </div>
  );
};