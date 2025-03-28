
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from '@/components/UserProvider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';
import ProfileSettings from '@/components/settings/ProfileSettings';
import AgencySettings from '@/components/settings/AgencySettings';
import UserManagement from '@/components/settings/UserManagement';
import NotificationSettings from '@/components/settings/NotificationSettings';
import SecuritySettings from '@/components/settings/SecuritySettings';
import AppPreferences from '@/components/settings/AppPreferences';
import SubscriptionBilling from '@/components/settings/SubscriptionBilling';
import DataBackup from '@/components/settings/DataBackup';
import SupportFeedback from '@/components/settings/SupportFeedback';
import LogoutDeactivate from '@/components/settings/LogoutDeactivate';
import AdvancedSettings from '@/components/settings/AdvancedSettings';

const Settings = () => {
  const { isAdmin } = useUser();
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="p-6 space-y-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      </div>

      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-64 flex-shrink-0">
            <Card>
              <CardContent className="p-4">
                <TabsList className="flex flex-col h-auto w-full gap-1 bg-transparent">
                  <TabsTrigger value="profile" className="justify-start w-full">Profile Settings</TabsTrigger>
                  {isAdmin && <TabsTrigger value="agency" className="justify-start w-full">Agency Settings</TabsTrigger>}
                  {isAdmin && <TabsTrigger value="users" className="justify-start w-full">User Management</TabsTrigger>}
                  <TabsTrigger value="notifications" className="justify-start w-full">Notification Settings</TabsTrigger>
                  <TabsTrigger value="security" className="justify-start w-full">Security Settings</TabsTrigger>
                  <TabsTrigger value="preferences" className="justify-start w-full">App Preferences</TabsTrigger>
                  <TabsTrigger value="subscription" className="justify-start w-full">Subscription & Billing</TabsTrigger>
                  <TabsTrigger value="data" className="justify-start w-full">Data & Backup</TabsTrigger>
                  <TabsTrigger value="support" className="justify-start w-full">Support & Feedback</TabsTrigger>
                  <TabsTrigger value="logout" className="justify-start w-full">Logout & Deactivate</TabsTrigger>
                  {isAdmin && <TabsTrigger value="advanced" className="justify-start w-full">Advanced Settings</TabsTrigger>}
                </TabsList>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1">
            <Card>
              {!isAdmin && activeTab === "agency" && (
                <Alert className="m-4 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                  <Shield className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
                  <AlertDescription>
                    You need admin privileges to access agency settings.
                  </AlertDescription>
                </Alert>
              )}
              
              {!isAdmin && activeTab === "users" && (
                <Alert className="m-4 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                  <Shield className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
                  <AlertDescription>
                    You need admin privileges to manage users.
                  </AlertDescription>
                </Alert>
              )}
              
              {!isAdmin && activeTab === "advanced" && (
                <Alert className="m-4 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                  <Shield className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
                  <AlertDescription>
                    You need admin privileges to access advanced settings.
                  </AlertDescription>
                </Alert>
              )}

              <TabsContent value="profile" className="m-0">
                <ProfileSettings />
              </TabsContent>
              
              <TabsContent value="agency" className="m-0">
                {isAdmin && <AgencySettings />}
              </TabsContent>
              
              <TabsContent value="users" className="m-0">
                {isAdmin && <UserManagement />}
              </TabsContent>
              
              <TabsContent value="notifications" className="m-0">
                <NotificationSettings />
              </TabsContent>
              
              <TabsContent value="security" className="m-0">
                <SecuritySettings />
              </TabsContent>
              
              <TabsContent value="preferences" className="m-0">
                <AppPreferences />
              </TabsContent>
              
              <TabsContent value="subscription" className="m-0">
                <SubscriptionBilling />
              </TabsContent>
              
              <TabsContent value="data" className="m-0">
                <DataBackup />
              </TabsContent>
              
              <TabsContent value="support" className="m-0">
                <SupportFeedback />
              </TabsContent>
              
              <TabsContent value="logout" className="m-0">
                <LogoutDeactivate />
              </TabsContent>
              
              <TabsContent value="advanced" className="m-0">
                {isAdmin && <AdvancedSettings />}
              </TabsContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Settings;
