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
    <aside className="w-72 bg-gradient-to-b from-white via-gray-50/30 to-white border-r border-gray-200/60 h-screen sticky top-0 shadow-xl">
      <div className="p-8">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-gradient-to-br from-primary-500 via-primary-600 to-success-500 rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
            <span className="text-white font-bold text-xl">G+</span>
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">GIVE PLUS++</h2>
            <p className="text-sm font-medium text-gray-600">Néo-banque solidaire</p>
          </div>
        </div>
      </div>
      
      <nav className="px-4 pb-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            
            return (
              <li key={item.path}>
                <button
                  onClick={() => onNavigate(item.path)}
                  className={cn(
                    'w-full flex items-center space-x-4 px-4 py-3 rounded-xl text-left transition-all duration-300 hover:scale-105',
                    isActive
                      ? 'bg-gradient-to-r from-primary-100 to-primary-50 text-primary-800 shadow-md border-r-4 border-primary-500 font-semibold'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 hover:text-gray-900 hover:shadow-sm'
                  )}
                >
                  <Icon className="h-6 w-6" />
                  <span className="font-semibold">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <button className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-700 transition-all duration-300 hover:scale-105 hover:shadow-sm">
          <LogOut className="h-6 w-6" />
          <span className="font-semibold">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};