
import React, { useState } from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from '@/hooks/use-toast';
import { Lock, ShieldCheck, Activity, Smartphone } from 'lucide-react';

const SecuritySettings = () => {
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  const loginActivities = [
    { device: 'Chrome on Windows', location: 'New York, USA', time: 'Just now', current: true },
    { device: 'Safari on iPhone', location: 'Boston, USA', time: 'Yesterday at 2:45 PM' },
    { device: 'Firefox on Mac', location: 'San Francisco, USA', time: '3 days ago' }
  ];
  
  const connectedDevices = [
    { name: 'Windows PC', lastActive: 'Now', current: true },
    { name: 'iPhone 13', lastActive: '1 hour ago' },
    { name: 'MacBook Pro', lastActive: '3 days ago' }
  ];

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Password changed",
      description: "Your password has been successfully changed.",
    });
    
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleEnableTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast({
      title: twoFactorEnabled ? "Two-Factor Authentication Disabled" : "Two-Factor Authentication Enabled",
      description: twoFactorEnabled 
        ? "Two-factor authentication has been disabled for your account." 
        : "Two-factor authentication has been enabled for your account.",
    });
  };

  const handleRemoveDevice = (deviceName: string) => {
    toast({
      title: "Device removed",
      description: `${deviceName} has been removed from your devices.`,
      variant: "destructive"
    });
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>
          Manage your account security and authentication
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-medium">Change Password</h3>
          </div>
          
          <div className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input 
                id="current-password" 
                type="password" 
                value={currentPassword} 
                onChange={(e) => setCurrentPassword(e.target.value)} 
                placeholder="Enter your current password"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input 
                id="new-password" 
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                placeholder="Enter a new password"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input 
                id="confirm-password" 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                placeholder="Confirm your new password"
              />
            </div>
            
            <Button onClick={handleChangePassword}>
              Update Password
            </Button>
          </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account with two-factor authentication
                </p>
              </div>
              <Switch 
                checked={twoFactorEnabled} 
                onCheckedChange={handleEnableTwoFactor}
              />
            </div>
            
            {twoFactorEnabled && (
              <div className="mt-4 p-4 bg-muted rounded-md">
                <p className="text-sm mb-2">
                  Two-factor authentication is enabled for your account.
                </p>
                <Button variant="outline" size="sm">
                  Configure 2FA Settings
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-purple-500" />
            <h3 className="text-lg font-medium">Login Activity</h3>
          </div>
          
          <div className="space-y-3">
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-3 font-medium text-muted-foreground">Device</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Location</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Time</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {loginActivities.map((activity, index) => (
                      <tr key={index} className="hover:bg-muted/30">
                        <td className="p-3">{activity.device}</td>
                        <td className="p-3">{activity.location}</td>
                        <td className="p-3">{activity.time}</td>
                        <td className="p-3">
                          {activity.current ? (
                            <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full dark:bg-green-900/30 dark:text-green-300">
                              Current session
                            </span>
                          ) : (
                            <Button variant="ghost" size="sm">Sign out</Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <Button variant="outline" size="sm">
              Sign out from all devices
            </Button>
          </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-orange-500" />
            <h3 className="text-lg font-medium">Connected Devices</h3>
          </div>
          
          <div className="space-y-3">
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-3 font-medium text-muted-foreground">Device</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Last Activity</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {connectedDevices.map((device, index) => (
                      <tr key={index} className="hover:bg-muted/30">
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <span>{device.name}</span>
                            {device.current && (
                              <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full dark:bg-blue-900/30 dark:text-blue-300">
                                Current
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3">{device.lastActive}</td>
                        <td className="p-3">
                          {!device.current && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleRemoveDevice(device.name)}
                            >
                              Remove
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default SecuritySettings;
