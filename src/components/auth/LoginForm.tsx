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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-success-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-gradient-to-r from-primary-500 to-success-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">G+</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">GIVE PLUS++</h1>
          <p className="text-gray-600">Néo-banque solidaire</p>
        </div>

        <Card variant="elevated" padding="lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Connexion à votre espace
              </h2>
              <p className="text-gray-600">
                Accédez à votre tableau de bord association
              </p>
            </div>

            <Input
              label="Adresse email"
              type="email"
              placeholder="votre@association.org"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              icon={<Mail className="h-4 w-4 text-gray-400" />}
              required
            />

            <div className="relative">
              <Input
                label="Mot de passe"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                icon={<Lock className="h-4 w-4 text-gray-400" />}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Se souvenir de moi</span>
              </label>
              <a href="#" className="text-sm text-primary-600 hover:text-primary-500">
                Mot de passe oublié ?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full"
              loading={isLoading}
              disabled={!formData.email || !formData.password}
            >
              Se connecter
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Pas encore de compte ?{' '}
                <a href="#" className="text-primary-600 hover:text-primary-500 font-medium">
                  Ouvrir un compte gratuit
                </a>
              </p>
            </div>
          </form>
        </Card>

        {/* Language Selector */}
        <div className="mt-6 text-center">
          <Button variant="ghost" size="sm">
            <Globe className="h-4 w-4 mr-2" />
            Français
          </Button>
        </div>

        {/* Demo Access */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 mb-2">Accès démo pour test</p>
          <Button
            variant="outline"
            size="sm"
            onClick={onLogin}
            className="text-xs"
          >
            Accès démo instantané
          </Button>
        </div>
      </div>
    </div>
  );
};