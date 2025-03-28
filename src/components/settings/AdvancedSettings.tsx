
import React, { useState } from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from '@/hooks/use-toast';
import { Webhook, Key, FileText, Info } from 'lucide-react';

const AdvancedSettings = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState('api_k3y_xxxxxxxxxxxxxxxxxxxx');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhookEvents, setWebhookEvents] = useState({
    userCreated: true,
    userUpdated: true,
    taskCreated: false,
    taskCompleted: false,
    meetingScheduled: true
  });
  const [customFields, setCustomFields] = useState([
    { id: '1', name: 'Client ID', type: 'text' },
    { id: '2', name: 'Project Code', type: 'text' },
  ]);
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldType, setNewFieldType] = useState('text');

  const handleRegenerateApiKey = () => {
    const newKey = 'api_k3y_' + Math.random().toString(36).substring(2, 15);
    setApiKey(newKey);
    toast({
      title: "API key regenerated",
      description: "Your new API key has been generated. Make sure to save it.",
    });
  };

  const handleSaveWebhookSettings = () => {
    toast({
      title: "Webhook settings saved",
      description: "Your webhook configuration has been updated.",
    });
  };

  const handleAddCustomField = () => {
    if (!newFieldName) {
      toast({
        title: "Field name required",
        description: "Please enter a name for the custom field.",
        variant: "destructive"
      });
      return;
    }
    
    const newId = (customFields.length + 1).toString();
    setCustomFields([...customFields, { id: newId, name: newFieldName, type: newFieldType }]);
    toast({
      title: "Custom field added",
      description: `The "${newFieldName}" field has been added.`,
    });
    
    setNewFieldName('');
  };

  const handleRemoveCustomField = (id: string) => {
    setCustomFields(customFields.filter(field => field.id !== id));
    toast({
      title: "Custom field removed",
      description: "The custom field has been removed.",
      variant: "destructive"
    });
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Advanced Settings</CardTitle>
        <CardDescription>
          Advanced configuration options for developers and administrators
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-medium">API Access & Tokens</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="api-key">API Key</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Info className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium">About API Keys</h4>
                      <p className="text-sm">
                        API keys provide access to our API. Keep them secure and never share them publicly.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex gap-2">
                <Input 
                  id="api-key" 
                  value={apiKey} 
                  readOnly 
                  className="font-mono text-sm"
                />
                <Button onClick={handleRegenerateApiKey} variant="outline">
                  Regenerate
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                This key provides full access to the API. Keep it secure.
              </p>
            </div>
            
            <div className="p-4 bg-muted rounded-md">
              <h4 className="font-medium mb-2">API Documentation</h4>
              <p className="text-sm mb-3">
                Learn how to integrate with our API and use advanced features.
              </p>
              <Button variant="outline" className="text-sm">
                View API Documentation
              </Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Webhook className="h-5 w-5 text-purple-500" />
            <h3 className="text-lg font-medium">Webhooks Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input 
                id="webhook-url" 
                value={webhookUrl} 
                onChange={(e) => setWebhookUrl(e.target.value)} 
                placeholder="https://your-domain.com/webhook"
              />
              <p className="text-sm text-muted-foreground">
                Enter the URL that will receive webhook events from our system.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Webhook Events</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="event-user-created" className="cursor-pointer">
                    User Created
                  </Label>
                  <Switch 
                    id="event-user-created" 
                    checked={webhookEvents.userCreated} 
                    onCheckedChange={(checked) => setWebhookEvents({...webhookEvents, userCreated: checked})} 
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="event-user-updated" className="cursor-pointer">
                    User Updated
                  </Label>
                  <Switch 
                    id="event-user-updated" 
                    checked={webhookEvents.userUpdated} 
                    onCheckedChange={(checked) => setWebhookEvents({...webhookEvents, userUpdated: checked})} 
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="event-task-created" className="cursor-pointer">
                    Task Created
                  </Label>
                  <Switch 
                    id="event-task-created" 
                    checked={webhookEvents.taskCreated} 
                    onCheckedChange={(checked) => setWebhookEvents({...webhookEvents, taskCreated: checked})} 
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="event-task-completed" className="cursor-pointer">
                    Task Completed
                  </Label>
                  <Switch 
                    id="event-task-completed" 
                    checked={webhookEvents.taskCompleted} 
                    onCheckedChange={(checked) => setWebhookEvents({...webhookEvents, taskCompleted: checked})} 
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="event-meeting-scheduled" className="cursor-pointer">
                    Meeting Scheduled
                  </Label>
                  <Switch 
                    id="event-meeting-scheduled" 
                    checked={webhookEvents.meetingScheduled} 
                    onCheckedChange={(checked) => setWebhookEvents({...webhookEvents, meetingScheduled: checked})} 
                  />
                </div>
              </div>
            </div>
            
            <Button onClick={handleSaveWebhookSettings}>
              Save Webhook Settings
            </Button>
          </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-medium">Custom Fields for Agency</h3>
          </div>
          
          <div className="space-y-4">
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-3 font-medium text-muted-foreground">Field Name</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Type</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {customFields.map((field) => (
                      <tr key={field.id} className="hover:bg-muted/30">
                        <td className="p-3">{field.name}</td>
                        <td className="p-3 capitalize">{field.type}</td>
                        <td className="p-3">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleRemoveCustomField(field.id)}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-field-name">Field Name</Label>
                <Input 
                  id="new-field-name" 
                  value={newFieldName} 
                  onChange={(e) => setNewFieldName(e.target.value)} 
                  placeholder="e.g., Client Reference"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-field-type">Field Type</Label>
                <select
                  id="new-field-type"
                  value={newFieldType}
                  onChange={(e) => setNewFieldType(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="select">Dropdown</option>
                </select>
              </div>
              
              <div className="self-end">
                <Button onClick={handleAddCustomField} className="w-full">
                  Add Custom Field
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default AdvancedSettings;
