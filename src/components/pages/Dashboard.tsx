@@ .. @@
 import { MassSMSModal } from '../modals/MassSMSModal';
 import { MassEmailModal } from '../modals/MassEmailModal';
+import { QuickActions } from '../features/QuickActions';
 import type { Campaign } from "@shared/schema";
 import type { CampaignSelection } from '../../types';
 
+// Mock data for recent donations and top donors
+const recentDonations = [
+  { donor: 'Marie Dubois', campaign: 'Éducation pour tous', amount: 250, date: 'Il y a 2h' },
+  { donor: 'Pierre Martin', campaign: 'Soutien alimentaire', amount: 100, date: 'Il y a 4h' },
+  { donor: 'Julie Bernard', campaign: 'Accès à l\'eau potable', amount: 500, date: 'Il y a 6h' },
+  { donor: 'Thomas Leroy', campaign: 'Éducation pour tous', amount: 150, date: 'Il y a 8h' },
+  { donor: 'Sophie Moreau', campaign: 'Soutien alimentaire', amount: 75, date: 'Il y a 12h' }
+];
+
+const topDonors = [
+  { name: 'Marie Dubois', total: 2500, donations: 12 },
+  { name: 'Pierre Martin', total: 1800, donations: 8 },
+  { name: 'Julie Bernard', total: 1200, donations: 6 },
+  { name: 'Thomas Leroy', total: 950, donations: 5 },
+  { name: 'Sophie Moreau', total: 750, donations: 4 }
+];
+
 export const Dashboard = () => {