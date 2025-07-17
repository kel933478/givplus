import React from 'react';
import { 
  Home, 
  Target, 
  CreditCard, 
  Users, 
  Bot, 
  Calendar, 
  Receipt, 
  Settings,
  LogOut
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const menuItems = [
  { path: '/dashboard', label: 'Accueil', icon: Home },
  { path: '/campaigns', label: 'Campagnes', icon: Target },
  { path: '/banking', label: 'Banque', icon: CreditCard },
  { path: '/donors', label: 'Donateurs', icon: Users },
  { path: '/ai-copilot', label: 'IA Copilote', icon: Bot },
  { path: '/events', label: 'Événements', icon: Calendar },
  { path: '/billing', label: 'Facturation', icon: Receipt },
  { path: '/settings', label: 'Paramètres', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentPath, onNavigate }) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-gradient-to-r from-primary-500 to-success-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">G+</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">GIVE PLUS++</h2>
            <p className="text-sm text-gray-500">Néo-banque solidaire</p>
          </div>
        </div>
      </div>
      
      <nav className="px-3 pb-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            
            return (
              <li key={item.path}>
                <button
                  onClick={() => onNavigate(item.path)}
                  className={cn(
                    'w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200',
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200">
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};