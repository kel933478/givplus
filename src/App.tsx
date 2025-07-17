import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { LoginForm } from './components/auth/LoginForm';
import { LandingPage } from './components/pages/LandingPage';
import { Dashboard } from './components/pages/Dashboard';
import { CampaignEditor } from './components/pages/CampaignEditor';
import { Banking } from './components/pages/Banking';
import { AICopilot } from './components/pages/AICopilot';
import { DonorCRM } from './components/pages/DonorCRM';
import { Events } from './components/pages/Events';
import { Billing } from './components/pages/Billing';

function App() {
  const [currentPath, setCurrentPath] = useState('/');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
    setCurrentPath('/dashboard');
  };

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <LandingPage onShowLogin={handleShowLogin} />;
      case '/dashboard':
        return <Dashboard />;
      case '/campaigns':
        return <CampaignEditor />;
      case '/banking':
        return <Banking />;
      case '/ai-copilot':
        return <AICopilot />;
      case '/donors':
        return <DonorCRM />;
      case '/events':
        return <Events />;
      case '/billing':
        return <Billing />;
      default:
        return <Dashboard />;
    }
  };

  // Show login form
  if (showLogin && !isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  // Show landing page or authenticated app
  if (currentPath === '/' || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        {renderPage()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentPath={currentPath} onNavigate={handleNavigate} />
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;