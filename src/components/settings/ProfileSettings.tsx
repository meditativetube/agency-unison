
import React, { useState } from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from '@/components/UserProvider';
import { useToast } from '@/hooks/use-toast';
import { User, Edit, Upload } from 'lucide-react';

const ProfileSettings = () => {
  const { currentUser } = useUser();
  const { toast } = useToast();
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleChangePassword = () => {
    if (password !== confirmPassword) {
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
    setPassword('');
    setConfirmPassword('');
  };

  const handleProfilePictureUpload = () => {
    toast({
      title: "Picture uploaded",
      description: "Your profile picture has been updated.",
    });
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Manage your personal information and account settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Personal Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="flex gap-2">
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Your name"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="your@email.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>
          
          <Button onClick={handleSaveProfile} className="mt-2">
            Save Changes
          </Button>
        </div>
        
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-lg font-medium">Change Password</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input 
                id="new-password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="New password"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input 
                id="confirm-password" 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                placeholder="Confirm new password"
              />
            </div>
          </div>
          
          <Button onClick={handleChangePassword} variant="outline" className="mt-2">
            Update Password
          </Button>
        </div>
        
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-lg font-medium">Profile Picture</h3>
          
          <div className="flex items-center gap-4">
            <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
              {currentUser?.avatar ? (
                <img src={currentUser.avatar} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <User className="h-12 w-12 text-gray-400" />
              )}
            </div>
            
            <div className="space-y-2">
              <Button onClick={handleProfilePictureUpload} variant="outline" className="gap-2">
                <Upload className="h-4 w-4" />
                <span>Upload New Picture</span>
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                JPG, GIF or PNG. Max size 1MB.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default ProfileSettings;
