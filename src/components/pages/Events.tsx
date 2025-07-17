import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Video, 
  QrCode,
  Download,
  Plus,
  Edit,
  Eye,
  Mail,
  Check,
  Clock,
  X
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Header } from '../layout/Header';
import { Modal } from '../ui/Modal';
import { Stats } from '../ui/Stats';

export const Events: React.FC = () => {
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const events = [
    {
      id: '1',
      title: 'Gala de charité annuel',
      description: 'Soirée de collecte de fonds pour nos projets éducatifs',
      date: '2024-03-15',
      location: 'Hôtel Plaza, Paris',
      maxParticipants: 200,
      registeredCount: 156,
      price: 150,
      image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1',
      zoomLink: null,
      participants: [
        { id: '1', name: 'Marie Dubois', email: 'marie@email.com', registrationDate: '2024-01-10', status: 'confirmed' },
        { id: '2', name: 'Pierre Martin', email: 'pierre@email.com', registrationDate: '2024-01-12', status: 'confirmed' },
        { id: '3', name: 'Julie Bernard', email: 'julie@email.com', registrationDate: '2024-01-15', status: 'pending' }
      ]
    },
    {
      id: '2',
      title: 'Webinaire : Impact de nos actions',
      description: 'Présentation des résultats de nos campagnes 2023',
      date: '2024-02-20',
      location: 'En ligne',
      maxParticipants: 500,
      registeredCount: 234,
      price: 0,
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1',
      zoomLink: 'https://zoom.us/j/123456789',
      participants: []
    },
    {
      id: '3',
      title: 'Journée portes ouvertes',
      description: 'Découvrez nos locaux et rencontrez notre équipe',
      date: '2024-04-10',
      location: 'Siège social, Lyon',
      maxParticipants: 100,
      registeredCount: 67,
      price: 0,
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1',
      zoomLink: null,
      participants: []
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-success-100 text-success-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const EventModal = () => (
    <Modal 
      isOpen={showEventModal} 
      onClose={() => setShowEventModal(false)} 
      title={selectedEvent ? selectedEvent.title : 'Nouvel événement'}
      size="xl"
    >
      {selectedEvent && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <img 
                src={selectedEvent.image} 
                alt={selectedEvent.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Détails de l'événement</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{new Date(selectedEvent.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{selectedEvent.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>{selectedEvent.registeredCount} / {selectedEvent.maxParticipants} participants</span>
                    </div>
                    {selectedEvent.zoomLink && (
                      <div className="flex items-center space-x-2">
                        <Video className="h-4 w-4 text-gray-400" />
                        <a href={selectedEvent.zoomLink} className="text-primary-600 hover:underline">
                          Lien Zoom
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    <QrCode className="h-4 w-4 mr-2" />
                    QR Code
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Certificats
                  </Button>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Participants ({selectedEvent.participants.length})</h4>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {selectedEvent.participants.map((participant: any) => (
                  <div key={participant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-primary-600">
                          {participant.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{participant.name}</p>
                        <p className="text-xs text-gray-500">{participant.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(participant.status)}`}>
                        {participant.status === 'confirmed' ? 'Confirmé' : 
                         participant.status === 'pending' ? 'En attente' : 'Annulé'}
                      </span>
                      <Button variant="ghost" size="sm">
                        <Mail className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex space-x-2">
                <Button variant="outline" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Email groupé
                </Button>
                <Button variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Export liste
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );

  return (
    <div className="space-y-6">
      <Header title="Gestion des événements" />
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Stats
          title="Événements actifs"
          value="12"
          change="+3 ce mois"
          changeType="positive"
          icon={<Calendar className="h-6 w-6 text-primary-500" />}
        />
        <Stats
          title="Participants inscrits"
          value="1,456"
          change="+234 ce mois"
          changeType="positive"
          icon={<Users className="h-6 w-6 text-success-500" />}
        />
        <Stats
          title="Revenus événements"
          value="23,450 €"
          change="+18% ce mois"
          changeType="positive"
          icon={<Calendar className="h-6 w-6 text-purple-500" />}
        />
        <Stats
          title="Taux de présence"
          value="87%"
          change="+5% vs dernier"
          changeType="positive"
          icon={<Check className="h-6 w-6 text-blue-500" />}
        />
      </div>

      {/* Actions */}
      <Card>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Mes événements</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export calendrier
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Nouvel événement
            </Button>
          </div>
        </div>
      </Card>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} variant="neo" className="overflow-hidden">
            <div className="relative">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  event.price > 0 ? 'bg-primary-100 text-primary-800' : 'bg-success-100 text-success-800'
                }`}>
                  {event.price > 0 ? `${event.price} €` : 'Gratuit'}
                </span>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">{event.title}</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(event.date).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>{event.registeredCount} / {event.maxParticipants} participants</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Inscriptions</span>
                  <span className="font-medium">{Math.round((event.registeredCount / event.maxParticipants) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary-500 to-success-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(event.registeredCount / event.maxParticipants) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => {
                    setSelectedEvent(event);
                    setShowEventModal(true);
                  }}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Voir
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card variant="neo">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Actions rapides</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16 flex-col">
              <QrCode className="h-6 w-6 mb-2" />
              <span>Générer QR Code</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <Download className="h-6 w-6 mb-2" />
              <span>Certificats PDF</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <Mail className="h-6 w-6 mb-2" />
              <span>Email de rappel</span>
            </Button>
          </div>
        </div>
      </Card>

      <EventModal />
    </div>
  );
};