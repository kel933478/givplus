export interface Association {
  id: string;
  name: string;
  email: string;
  logo?: string;
  description: string;
  createdAt: string;
  status: 'active' | 'pending' | 'suspended';
  balance: number;
  totalDonations: number;
  campaigns: Campaign[];
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  target: number;
  raised: number;
  deadline: string;
  image?: string;
  video?: string;
  status: 'active' | 'completed' | 'draft';
  donationType: 'unique' | 'recurring' | 'both';
  matching?: number;
  donors: Donor[];
}

export interface Donor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  totalDonated: number;
  lastDonation: string;
  frequency: 'unique' | 'monthly' | 'quarterly' | 'yearly';
  tag: 'VIP' | 'régulier' | 'nouveau';
  campaigns: string[];
}

export interface Transaction {
  id: string;
  type: 'donation' | 'expense' | 'refund';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  donor?: Donor;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  maxParticipants: number;
  registeredCount: number;
  price?: number;
  image?: string;
  zoomLink?: string;
  participants: EventParticipant[];
}

export interface EventParticipant {
  id: string;
  name: string;
  email: string;
  registrationDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface AIPrompt {
  id: string;
  content: string;
  tone: 'urgent' | 'inspirant' | 'solennel' | 'éducatif';
  generatedText: string;
  readabilityScore: number;
  recommendations: string[];
}