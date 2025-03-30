
import React, { useState, useEffect } from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Edit, Upload, Check } from 'lucide-react';
import { useUser } from '@/components/UserProvider';
import { useToast } from '@/hooks/use-toast';

const ProfileSettings = () => {
  const { currentUser, updateUserProfile } = useUser();
  const { toast } = useToast();
  
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phoneNumber || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Update form when current user changes
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setEmail(currentUser.email || '');
      setPhone(currentUser.phoneNumber || '');
    }
  }, [currentUser]);

  const handleSaveProfile = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      updateUserProfile({
        name,
        email,
        phoneNumber: phone,
      });
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
      
      setIsSaving(false);
    }, 600);
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
    
    setIsChangingPassword(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Password changed",
        description: "Your password has been successfully changed.",
      });
      
      setPassword('');
      setConfirmPassword('');
      setIsChangingPassword(false);
    }, 600);
  };

  const handleProfilePictureUpload = () => {
    // Simulate file upload and update
    setTimeout(() => {
      // Generate a new avatar with the current name
      const newAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff&size=256`;
      
      updateUserProfile({
        avatar: newAvatar
      });
      
      toast({
        title: "Picture uploaded",
        description: "Your profile picture has been updated.",
      });
    }, 600);
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
          <div className="flex items-center gap-4 mb-6">
            <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-blue-500/50">
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
                disabled={currentUser?.authProvider !== 'password'}
              />
              {currentUser?.authProvider !== 'password' && (
                <p className="text-xs text-muted-foreground">
                  Email can't be changed for accounts linked to {currentUser?.authProvider}
                </p>
              )}
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
            
            <div className="space-y-2">
              <Label>Authentication Provider</Label>
              <div className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-base text-muted-foreground md:text-sm">
                {currentUser?.authProvider === 'password' ? 'Email/Password' : 
                  currentUser?.authProvider === 'google' ? 'Google' :
                  currentUser?.authProvider === 'microsoft' ? 'Microsoft' :
                  currentUser?.authProvider === 'github' ? 'GitHub' :
                  currentUser?.authProvider}
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleSaveProfile} 
            className="mt-2"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <span className="mr-2">Saving...</span>
                <span className="animate-spin">⋯</span>
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
        
        {currentUser?.authProvider === 'password' && (
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
            
            <Button 
              onClick={handleChangePassword} 
              variant="outline" 
              className="mt-2"
              disabled={isChangingPassword || !password || !confirmPassword}
            >
              {isChangingPassword ? (
                <>
                  <span className="mr-2">Updating...</span>
                  <span className="animate-spin">⋯</span>
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </div>
        )}
        
        {currentUser?.authProvider !== 'password' && (
          <div className="rounded-md bg-blue-50 dark:bg-blue-900/20 p-4 text-sm text-blue-800 dark:text-blue-200">
            <p className="font-medium">External Authentication Provider</p>
            <p className="mt-1">
              Your account is linked to {currentUser?.authProvider}. Password management is handled by your authentication provider.
            </p>
          </div>
        )}
      </CardContent>
    </>
  );
};

export default ProfileSettings;
