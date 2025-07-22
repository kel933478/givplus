import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  CreditCard,
  Globe,
  Palette,
  Database,
  Key,
  Mail,
  Phone,
  Save,
  Eye,
  EyeOff,
  Upload,
  Download,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Header } from '../layout/Header';
import { Modal } from '../ui/Modal';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: 'Association',
    lastName: 'XYZ',
    email: 'contact@association-xyz.org',
    phone: '+33 1 23 45 67 89',
    address: '123 Rue de la Solidarité, 75001 Paris',
    website: 'https://association-xyz.org',
    description: 'Association dédiée à l\'éducation et au développement durable'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    donationAlerts: true,
    campaignUpdates: true,
    weeklyReports: true,
    monthlyReports: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: '30',
    ipWhitelist: false
  });

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'billing', label: 'Facturation', icon: CreditCard },
    { id: 'preferences', label: 'Préférences', icon: Palette },
    { id: 'data', label: 'Données', icon: Database }
  ];

  const handleProfileUpdate = () => {
    console.log('Profile updated:', profileData);
    // API call to update profile
  };

  const handleNotificationUpdate = () => {
    console.log('Notifications updated:', notificationSettings);
    // API call to update notifications
  };

  const handleSecurityUpdate = () => {
    console.log('Security updated:', securitySettings);
    // API call to update security
  };

  const DeleteAccountModal = () => (
    <Modal 
      isOpen={showDeleteModal} 
      onClose={() => setShowDeleteModal(false)} 
      title="Supprimer le compte"
      size="md"
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg">
          <AlertTriangle className="h-6 w-6 text-red-600" />
          <div>
            <h4 className="font-semibold text-red-900">Action irréversible</h4>
            <p className="text-sm text-red-700">
              Cette action supprimera définitivement votre compte et toutes vos données.
            </p>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tapez "SUPPRIMER" pour confirmer
          </label>
          <input
            type="text"
            placeholder="SUPPRIMER"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
        
        <div className="flex space-x-3">
          <Button variant="outline" className="flex-1" onClick={() => setShowDeleteModal(false)}>
            Annuler
          </Button>
          <Button variant="danger" className="flex-1">
            <Trash2 className="h-4 w-4 mr-2" />
            Supprimer définitivement
          </Button>
        </div>
      </div>
    </Modal>
  );

  const PasswordModal = () => (
    <Modal 
      isOpen={showPasswordModal} 
      onClose={() => setShowPasswordModal(false)} 
      title="Changer le mot de passe"
      size="md"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mot de passe actuel
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nouveau mot de passe
          </label>
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirmer le nouveau mot de passe
          </label>
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        <div className="flex space-x-3">
          <Button variant="outline" className="flex-1" onClick={() => setShowPasswordModal(false)}>
            Annuler
          </Button>
          <Button className="flex-1">
            <Key className="h-4 w-4 mr-2" />
            Changer le mot de passe
          </Button>
        </div>
      </div>
    </Modal>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="h-24 w-24 bg-gradient-to-br from-primary-500 to-success-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  AX
                </div>
                <button className="absolute -bottom-2 -right-2 h-8 w-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                  <Upload className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Photo de profil</h3>
                <p className="text-gray-600">JPG, PNG ou GIF. Max 2MB.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Prénom"
                value={profileData.firstName}
                onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
              />
              <Input
                label="Nom"
                value={profileData.lastName}
                onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
              />
              <Input
                label="Email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                icon={<Mail className="h-4 w-4" />}
              />
              <Input
                label="Téléphone"
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                icon={<Phone className="h-4 w-4" />}
              />
            </div>
            
            <Input
              label="Adresse"
              value={profileData.address}
              onChange={(e) => setProfileData({...profileData, address: e.target.value})}
            />
            
            <Input
              label="Site web"
              value={profileData.website}
              onChange={(e) => setProfileData({...profileData, website: e.target.value})}
              icon={<Globe className="h-4 w-4" />}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={profileData.description}
                onChange={(e) => setProfileData({...profileData, description: e.target.value})}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <Button onClick={handleProfileUpdate} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder les modifications
            </Button>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Préférences de notification</h3>
              
              <div className="space-y-4">
                {Object.entries(notificationSettings).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {key === 'emailNotifications' && 'Notifications par email'}
                        {key === 'smsNotifications' && 'Notifications par SMS'}
                        {key === 'pushNotifications' && 'Notifications push'}
                        {key === 'donationAlerts' && 'Alertes de dons'}
                        {key === 'campaignUpdates' && 'Mises à jour de campagnes'}
                        {key === 'weeklyReports' && 'Rapports hebdomadaires'}
                        {key === 'monthlyReports' && 'Rapports mensuels'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {key === 'emailNotifications' && 'Recevoir les notifications par email'}
                        {key === 'smsNotifications' && 'Recevoir les notifications par SMS'}
                        {key === 'pushNotifications' && 'Recevoir les notifications push'}
                        {key === 'donationAlerts' && 'Être alerté des nouveaux dons'}
                        {key === 'campaignUpdates' && 'Recevoir les mises à jour de campagnes'}
                        {key === 'weeklyReports' && 'Recevoir un rapport hebdomadaire'}
                        {key === 'monthlyReports' && 'Recevoir un rapport mensuel'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          [key]: e.target.checked
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <Button onClick={handleNotificationUpdate} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder les préférences
            </Button>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Paramètres de sécurité</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Authentification à deux facteurs</h4>
                    <p className="text-sm text-gray-600">Ajouter une couche de sécurité supplémentaire</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={securitySettings.twoFactorAuth}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        twoFactorAuth: e.target.checked
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Alertes de connexion</h4>
                    <p className="text-sm text-gray-600">Être notifié des nouvelles connexions</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={securitySettings.loginAlerts}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        loginAlerts: e.target.checked
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Délai d'expiration de session (minutes)
                </label>
                <select
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => setSecuritySettings({
                    ...securitySettings,
                    sessionTimeout: e.target.value
                  })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 heure</option>
                  <option value="120">2 heures</option>
                  <option value="0">Jamais</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowPasswordModal(true)}
              >
                <Key className="h-4 w-4 mr-2" />
                Changer le mot de passe
              </Button>
              
              <Button onClick={handleSecurityUpdate} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder les paramètres
              </Button>
            </div>
          </div>
        );

      case 'data':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Gestion des données</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card variant="outline" className="p-4">
                  <div className="text-center space-y-3">
                    <Download className="h-8 w-8 text-primary-600 mx-auto" />
                    <h4 className="font-semibold text-gray-900">Exporter mes données</h4>
                    <p className="text-sm text-gray-600">Télécharger toutes vos données au format JSON</p>
                    <Button variant="outline" size="sm" className="w-full">
                      Télécharger
                    </Button>
                  </div>
                </Card>
                
                <Card variant="outline" className="p-4">
                  <div className="text-center space-y-3">
                    <Upload className="h-8 w-8 text-blue-600 mx-auto" />
                    <h4 className="font-semibold text-gray-900">Importer des données</h4>
                    <p className="text-sm text-gray-600">Importer des données depuis un fichier CSV</p>
                    <Button variant="outline" size="sm" className="w-full">
                      Importer
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                  <h4 className="font-semibold text-red-900">Zone de danger</h4>
                </div>
                <p className="text-sm text-red-700 mb-4">
                  Ces actions sont irréversibles. Assurez-vous de comprendre les conséquences.
                </p>
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer le compte
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <SettingsIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Sélectionnez un onglet pour voir les paramètres</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <Header title="Paramètres" />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card variant="elevated" className="lg:col-span-1">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Paramètres</h3>
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-800 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </Card>

        {/* Content */}
        <Card variant="elevated" className="lg:col-span-3">
          <div className="p-6">
            {renderTabContent()}
          </div>
        </Card>
      </div>

      <DeleteAccountModal />
      <PasswordModal />
    </div>
  );
};