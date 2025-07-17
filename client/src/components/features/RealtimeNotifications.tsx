import { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { 
  Bell, 
  Heart, 
  TrendingUp, 
  User,
  X,
  CheckCircle
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface Notification {
  id: string;
  type: 'donation' | 'milestone' | 'new_donor' | 'campaign_update';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  amount?: number;
  campaignName?: string;
}

export const RealtimeNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'donation',
      title: 'Nouveau don reçu',
      message: 'Un don de 250€ a été effectué pour la campagne "Éducation pour tous"',
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      read: false,
      amount: 250,
      campaignName: 'Éducation pour tous'
    },
    {
      id: '2',
      type: 'milestone',
      title: 'Objectif atteint !',
      message: 'La campagne "Soutien alimentaire" a atteint 60% de son objectif',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      read: false,
      campaignName: 'Soutien alimentaire'
    },
    {
      id: '3',
      type: 'new_donor',
      title: 'Nouveau donateur',
      message: 'Thomas Leroy s\'est inscrit et a effectué son premier don',
      timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      read: true
    }
  ]);

  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch real-time updates
  const { data: recentDonations } = useQuery({
    queryKey: ['/api/donations/recent'],
    queryFn: async () => {
      const response = await fetch('/api/donations/recent?limit=5');
      if (!response.ok) return [];
      return response.json();
    },
    refetchInterval: 30000 // Refetch every 30 seconds
  });

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random new donation notification
      if (Math.random() > 0.8) {
        const amounts = [50, 100, 150, 200, 250, 300];
        const campaigns = ['Éducation pour tous', 'Soutien alimentaire', 'Accès à l\'eau potable'];
        const amount = amounts[Math.floor(Math.random() * amounts.length)];
        const campaign = campaigns[Math.floor(Math.random() * campaigns.length)];
        
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: 'donation',
          title: 'Nouveau don reçu',
          message: `Un don de ${amount}€ a été effectué pour "${campaign}"`,
          timestamp: new Date(),
          read: false,
          amount,
          campaignName: campaign
        };

        setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
      }
    }, 45000); // Check every 45 seconds

    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'donation':
        return <Heart className="h-5 w-5 text-green-600" />;
      case 'milestone':
        return <TrendingUp className="h-5 w-5 text-blue-600" />;
      case 'new_donor':
        return <User className="h-5 w-5 text-purple-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `il y a ${days}j`;
    if (hours > 0) return `il y a ${hours}h`;
    if (minutes > 0) return `il y a ${minutes}min`;
    return 'à l\'instant';
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative hover:scale-110"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>

      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-96 z-50">
          <Card variant="elevated" className="max-h-96 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <div className="flex items-center space-x-2">
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-xs"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Tout marquer lu
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDropdown(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <Bell className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p>Aucune notification</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">
                              {formatTimeAgo(notification.timestamp)}
                            </span>
                            {!notification.read && (
                              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        {notification.amount && (
                          <div className="mt-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              +{notification.amount}€
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};