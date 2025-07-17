import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Globe } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

interface LoginFormProps {
  onLogin: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-success-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="h-20 w-20 bg-gradient-to-br from-primary-500 via-primary-600 to-success-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl hover:scale-110 transition-transform duration-300">
            <span className="text-white font-bold text-3xl">G+</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">GIVE PLUS++</h1>
          <p className="text-lg font-semibold text-gray-600">Néo-banque solidaire</p>
        </div>

        <Card variant="glass" padding="lg" className="shadow-2xl backdrop-blur-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Connexion à votre espace
              </h2>
              <p className="text-gray-700 font-medium">
                Accédez à votre tableau de bord association
              </p>
            </div>

            <Input
              label="Adresse email"
              type="email"
              placeholder="votre@association.org"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              icon={<Mail className="h-5 w-5 text-gray-500" />}
              required
            />

            <div className="relative">
              <Input
                label="Mot de passe"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                icon={<Lock className="h-5 w-5 text-gray-500" />}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-9 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))}
                  className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded-md"
                />
                <span className="ml-3 text-sm font-medium text-gray-700">Se souvenir de moi</span>
              </label>
              <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200">
                Mot de passe oublié ?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full text-lg py-4"
              loading={isLoading}
              disabled={!formData.email || !formData.password}
            >
              Se connecter
            </Button>

            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">
                Pas encore de compte ?{' '}
                <a href="#" className="text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-200">
                  Ouvrir un compte gratuit
                </a>
              </p>
            </div>
          </form>
        </Card>

        {/* Language Selector */}
        <div className="mt-8 text-center">
          <Button variant="ghost" size="sm" className="hover:scale-105">
            <Globe className="h-5 w-5 mr-2" />
            Français
          </Button>
        </div>

        {/* Demo Access */}
        <div className="mt-6 text-center">
          <p className="text-sm font-medium text-gray-600 mb-3">Accès démo pour test</p>
          <Button
            variant="outline"
            size="md"
            onClick={onLogin}
            className="hover:scale-105"
          >
            Accès démo instantané
          </Button>
        </div>
      </div>
    </div>
  );
};