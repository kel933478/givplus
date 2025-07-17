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
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-64"
              />
            </div>
          )}
          
          {showLanguageSelector && (
            <div className="relative">
              <Button variant="ghost" size="sm">
                <Globe className="h-4 w-4 mr-2" />
                FR
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
          
          {showNotifications && (
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
          )}
          
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary-500 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">Association XYZ</span>
          </div>
        </div>
      </div>
    </header>
  );
};