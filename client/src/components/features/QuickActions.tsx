import { 
  Plus, 
  Users, 
  Calendar,
  MessageSquare,
  DollarSign,
  TrendingUp
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const QuickActions = () => {
  const actions = [
    {
      title: 'Nouvelle campagne',
      description: 'Créer une campagne de collecte',
      icon: <Plus className="h-6 w-6" />,
      color: 'primary',
      href: '/create-campaign'
    },
    {
      title: 'Voir les donateurs',
      description: 'Gérer la base de donateurs',
      icon: <Users className="h-6 w-6" />,
      color: 'blue',
      href: '/donor-details'
    },
    {
      title: 'Nouvel événement',
      description: 'Organiser un événement',
      icon: <Calendar className="h-6 w-6" />,
      color: 'green',
      href: '/events'
    },
    {
      title: 'Communication',
      description: 'Envoyer SMS/Email',
      icon: <MessageSquare className="h-6 w-6" />,
      color: 'purple',
      action: 'communication'
    },
    {
      title: 'Transactions',
      description: 'Voir les paiements',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'orange',
      href: '/banking'
    },
    {
      title: 'Analytiques',
      description: 'Rapports et statistiques',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'indigo',
      href: '/dashboard'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      primary: 'bg-primary-100 text-primary-600 hover:bg-primary-200',
      blue: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
      green: 'bg-green-100 text-green-600 hover:bg-green-200',
      purple: 'bg-purple-100 text-purple-600 hover:bg-purple-200',
      orange: 'bg-orange-100 text-orange-600 hover:bg-orange-200',
      indigo: 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
    };
    return colors[color as keyof typeof colors] || colors.primary;
  };

  const handleAction = (action: any) => {
    if (action.href) {
      window.location.href = action.href;
    } else if (action.action === 'communication') {
      // This could trigger a modal or redirect to communication page
      console.log('Communication action triggered');
    }
  };

  return (
    <Card variant="elevated">
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Actions rapides</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleAction(action)}
              className="group p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300 text-left hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <div className={`h-12 w-12 rounded-lg flex items-center justify-center transition-colors ${getColorClasses(action.color)}`}>
                  {action.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {action.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {action.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};