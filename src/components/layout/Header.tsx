import React from 'react';
import { Bell, Search, User, Globe, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeaderProps {
  title: string;
  showSearch?: boolean;
  showNotifications?: boolean;
  showLanguageSelector?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showSearch = true,
  showNotifications = true,
  showLanguageSelector = true,
}) => {
  return (
    <header className="bg-gradient-to-r from-white via-gray-50/50 to-white backdrop-blur-sm border-b border-gray-200/60 px-6 py-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-12 pr-4 py-3 border border-gray-300 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-72 shadow-sm hover:shadow-md transition-all duration-300"
              />
            </div>
          )}
          
          {showLanguageSelector && (
            <div className="relative">
              <Button variant="ghost" size="sm" className="rounded-xl">
                <Globe className="h-5 w-5 mr-2" />
                FR
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
          
          {showNotifications && (
            <Button variant="ghost" size="sm" className="relative rounded-xl">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg animate-pulse"></span>
            </Button>
          )}
          
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
              <User className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-800">Association XYZ</span>
          </div>
        </div>
      </div>
    </header>
  );
};