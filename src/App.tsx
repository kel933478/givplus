import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { LandingPage } from './components/pages/LandingPage';
import { Dashboard } from './components/pages/Dashboard';
import { CampaignEditor } from './components/pages/CampaignEditor';
import { Banking } from './components/pages/Banking';
import { AICopilot } from './components/pages/AICopilot';

function App() {
  const [currentPath, setCurrentPath] = useState('/');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    if (path === '/dashboard') {
      setIsAuthenticated(true);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPath('/dashboard');
  };

  const renderPage = () => {
    if (!isAuthenticated && currentPath !== '/') {
      return <LandingPage />;
    }

    switch (currentPath) {
      case '/':
        return <LandingPage />;
      case '/dashboard':
        return <Dashboard />;
      case '/campaigns':
        return <CampaignEditor />;
      case '/banking':
        return <Banking />;
      case '/ai-copilot':
        return <AICopilot />;
      default:
        return <Dashboard />;
    }
  };

  if (currentPath === '/' || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <button
          onClick={handleLogin}
          className="fixed top-4 right-4 z-50 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
        >
          Demo Login
        </button>
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