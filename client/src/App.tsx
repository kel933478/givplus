import { useState } from 'react';
import { Router, Route, Switch, useLocation } from 'wouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { Sidebar } from './components/layout/Sidebar';
import { LoginForm } from './components/auth/LoginForm';
import { LandingPage } from './components/pages/LandingPage';
import { Dashboard } from './components/pages/Dashboard';
import { CampaignDetails } from './components/pages/CampaignDetails';
import { CreateCampaign } from './components/pages/CreateCampaign';
import { DonorDetails } from './components/pages/DonorDetails';
import { CampaignEditor } from './components/pages/CampaignEditor';
import { Banking } from './components/pages/Banking';
import { AICopilot } from './components/pages/AICopilot';
import { DonorCRM } from './components/pages/DonorCRM';
import { Events } from './components/pages/Events';
import { Billing } from './components/pages/Billing';

function AuthenticatedApp() {
  const [location] = useLocation();
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/campaign/:id" component={CampaignDetails} />
            <Route path="/create-campaign" component={CreateCampaign} />
            <Route path="/donor-details" component={DonorDetails} />
            <Route path="/campaigns" component={CampaignEditor} />
            <Route path="/banking" component={Banking} />
            <Route path="/ai-copilot" component={AICopilot} />
            <Route path="/donors" component={DonorCRM} />
            <Route path="/events" component={Events} />
            <Route path="/billing" component={Billing} />
            <Route>
              <Dashboard />
            </Route>
          </Switch>
        </main>
      </div>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  if (showLogin && !isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <LoginForm onLogin={handleLogin} />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        {isAuthenticated ? (
          <AuthenticatedApp />
        ) : (
          <div className="min-h-screen bg-gray-50">
            <Route path="/" component={() => <LandingPage onShowLogin={handleShowLogin} />} />
            <Route path="/login" component={() => <LoginForm onLogin={handleLogin} />} />
          </div>
        )}
      </Router>
    </QueryClientProvider>
  );
}

export default App;