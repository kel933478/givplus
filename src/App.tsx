@@ .. @@
 import { CampaignDetails } from './components/pages/CampaignDetails';
 import { CreateCampaign } from './components/pages/CreateCampaign';
 import { DonorDetails } from './components/pages/DonorDetails';
+import { CampaignEditor } from './components/pages/CampaignEditor';
 import { Banking } from './components/pages/Banking';
 import { AICopilot } from './components/pages/AICopilot';
 import { DonorCRM } from './components/pages/DonorCRM';
@@ .. @@
             <Route path="/campaign/:id" component={CampaignDetails} />
import { Settings } from './components/pages/Settings';
             <Route path="/create-campaign" component={CreateCampaign} />
             <Route path="/donor-details" component={DonorDetails} />
+            <Route path="/campaigns" component={CampaignEditor} />
             <Route path="/banking" component={Banking} />
             <Route path="/ai-copilot" component={AICopilot} />
             <Route path="/donors" component={DonorCRM} />
             <Route path="/events" component={Events} />
             <Route path="/billing" component={Billing} />
            <Route path="/settings" component={Settings} />
+            <Route>
+              <Dashboard />
+            </Route>
           </Switch>
         </main>
       </div>