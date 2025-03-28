
import React, { useState } from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { Bell, Mail, Phone, BellRing } from 'lucide-react';

const NotificationSettings = () => {
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState({
    taskAssigned: true,
    taskCompleted: true,
    newMeeting: true,
    documentShared: false,
    weeklyReport: true
  });
  
  const [smsNotifications, setSmsNotifications] = useState({
    taskAssigned: false,
    taskCompleted: false,
    newMeeting: true,
    documentShared: false,
    weeklyReport: false
  });
  
  const [pushNotifications, setPushNotifications] = useState({
    taskAssigned: true,
    taskCompleted: true,
    newMeeting: true,
    documentShared: true,
    weeklyReport: false
  });

  const handleSaveNotifications = () => {
    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated successfully.",
    });
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>
          Manage how you receive notifications and updates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-medium">Email Notifications</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="email-task-assigned" className="flex flex-col">
                <span>Task Assigned</span>
                <span className="text-sm font-normal text-muted-foreground">Receive an email when a task is assigned to you</span>
              </Label>
              <Switch 
                id="email-task-assigned" 
                checked={emailNotifications.taskAssigned} 
                onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, taskAssigned: checked})} 
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="email-task-completed" className="flex flex-col">
                <span>Task Completed</span>
                <span className="text-sm font-normal text-muted-foreground">Receive an email when a task you created is completed</span>
              </Label>
              <Switch 
                id="email-task-completed" 
                checked={emailNotifications.taskCompleted} 
                onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, taskCompleted: checked})} 
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="email-new-meeting" className="flex flex-col">
                <span>New Meeting</span>
                <span className="text-sm font-normal text-muted-foreground">Receive an email when you're invited to a meeting</span>
              </Label>
              <Switch 
                id="email-new-meeting" 
                checked={emailNotifications.newMeeting} 
                onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, newMeeting: checked})} 
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="email-document-shared" className="flex flex-col">
                <span>Document Shared</span>
                <span className="text-sm font-normal text-muted-foreground">Receive an email when a document is shared with you</span>
              </Label>
              <Switch 
                id="email-document-shared" 
                checked={emailNotifications.documentShared} 
                onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, documentShared: checked})} 
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="email-weekly-report" className="flex flex-col">
                <span>Weekly Report</span>
                <span className="text-sm font-normal text-muted-foreground">Receive a weekly summary of your team's activity</span>
              </Label>
              <Switch 
                id="email-weekly-report" 
                checked={emailNotifications.weeklyReport} 
                onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, weeklyReport: checked})} 
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-medium">SMS Notifications</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="sms-task-assigned" className="flex flex-col">
                <span>Task Assigned</span>
                <span className="text-sm font-normal text-muted-foreground">Receive an SMS when a task is assigned to you</span>
              </Label>
              <Switch 
                id="sms-task-assigned" 
                checked={smsNotifications.taskAssigned} 
                onCheckedChange={(checked) => setSmsNotifications({...smsNotifications, taskAssigned: checked})} 
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="sms-task-completed" className="flex flex-col">
                <span>Task Completed</span>
                <span className="text-sm font-normal text-muted-foreground">Receive an SMS when a task you created is completed</span>
              </Label>
              <Switch 
                id="sms-task-completed" 
                checked={smsNotifications.taskCompleted} 
                onCheckedChange={(checked) => setSmsNotifications({...smsNotifications, taskCompleted: checked})} 
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="sms-new-meeting" className="flex flex-col">
                <span>New Meeting</span>
                <span className="text-sm font-normal text-muted-foreground">Receive an SMS when you're invited to a meeting</span>
              </Label>
              <Switch 
                id="sms-new-meeting" 
                checked={smsNotifications.newMeeting} 
                onCheckedChange={(checked) => setSmsNotifications({...smsNotifications, newMeeting: checked})} 
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <BellRing className="h-5 w-5 text-orange-500" />
            <h3 className="text-lg font-medium">Push Notifications</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="push-task-assigned" className="flex flex-col">
                <span>Task Assigned</span>
                <span className="text-sm font-normal text-muted-foreground">Receive a push notification when a task is assigned to you</span>
              </Label>
              <Switch 
                id="push-task-assigned" 
                checked={pushNotifications.taskAssigned} 
                onCheckedChange={(checked) => setPushNotifications({...pushNotifications, taskAssigned: checked})} 
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="push-task-completed" className="flex flex-col">
                <span>Task Completed</span>
                <span className="text-sm font-normal text-muted-foreground">Receive a push notification when a task you created is completed</span>
              </Label>
              <Switch 
                id="push-task-completed" 
                checked={pushNotifications.taskCompleted} 
                onCheckedChange={(checked) => setPushNotifications({...pushNotifications, taskCompleted: checked})} 
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="push-new-meeting" className="flex flex-col">
                <span>New Meeting</span>
                <span className="text-sm font-normal text-muted-foreground">Receive a push notification when you're invited to a meeting</span>
              </Label>
              <Switch 
                id="push-new-meeting" 
                checked={pushNotifications.newMeeting} 
                onCheckedChange={(checked) => setPushNotifications({...pushNotifications, newMeeting: checked})} 
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="push-document-shared" className="flex flex-col">
                <span>Document Shared</span>
                <span className="text-sm font-normal text-muted-foreground">Receive a push notification when a document is shared with you</span>
              </Label>
              <Switch 
                id="push-document-shared" 
                checked={pushNotifications.documentShared} 
                onCheckedChange={(checked) => setPushNotifications({...pushNotifications, documentShared: checked})} 
              />
            </div>
          </div>
        </div>
        
        <Button onClick={handleSaveNotifications} className="mt-4">
          Save Notification Preferences
        </Button>
      </CardContent>
    </>
  );
};

export default NotificationSettings;
