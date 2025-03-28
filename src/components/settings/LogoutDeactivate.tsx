
import React, { useState } from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUser } from '@/components/UserProvider';
import { useToast } from '@/hooks/use-toast';
import { LogOut, UserX } from 'lucide-react';

const LogoutDeactivate = () => {
  const { logout, currentUser } = useUser();
  const { toast } = useToast();
  const [confirmDeactivate, setConfirmDeactivate] = useState('');
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const handleDeactivateAccount = () => {
    if (confirmDeactivate !== currentUser?.email) {
      toast({
        title: "Email confirmation needed",
        description: "Please enter your email address to confirm account deactivation.",
        variant: "destructive"
      });
      return;
    }
    
    logout();
    toast({
      title: "Account deactivated",
      description: "Your account has been deactivated. We're sorry to see you go.",
      variant: "destructive"
    });
    
    setShowDeactivateDialog(false);
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Logout & Deactivate</CardTitle>
        <CardDescription>
          Log out of your account or deactivate your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <LogOut className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-medium">Logout</h3>
          </div>
          
          <div className="p-4 bg-muted rounded-md">
            <p className="text-sm mb-4">
              When you logout, you'll need to enter your credentials again to access your account.
            </p>
            <Button onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              <span>Logout Now</span>
            </Button>
          </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <UserX className="h-5 w-5 text-red-500" />
            <h3 className="text-lg font-medium">Deactivate Account</h3>
          </div>
          
          <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-md border border-red-200 dark:border-red-800">
            <p className="text-sm mb-1 text-red-800 dark:text-red-300 font-medium">
              Warning: This action cannot be undone
            </p>
            <p className="text-sm mb-4 text-red-700 dark:text-red-400">
              When you deactivate your account, all your data will be permanently deleted, and you won't be able to recover it.
            </p>
            
            <AlertDialog open={showDeactivateDialog} onOpenChange={setShowDeactivateDialog}>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="gap-2">
                  <UserX className="h-4 w-4" />
                  <span>Deactivate Account</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove all your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                
                <div className="space-y-2 my-4">
                  <Label htmlFor="confirm-deactivate">
                    Type your email to confirm: <span className="font-medium">{currentUser?.email}</span>
                  </Label>
                  <Input 
                    id="confirm-deactivate" 
                    value={confirmDeactivate} 
                    onChange={(e) => setConfirmDeactivate(e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>
                
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeactivateAccount();
                    }}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Deactivate Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default LogoutDeactivate;
