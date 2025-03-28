
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useUser } from './UserProvider';
import { Google, Mail, LogIn, Microsoft } from 'lucide-react';

type LoginTab = 'credentials' | 'external';

const LoginModal = () => {
  const { toast } = useToast();
  const { login, allUsers } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<LoginTab>('credentials');
  const [isOpen, setIsOpen] = useState(false);

  const handleCredentialsLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = allUsers.find(user => user.email === email);
    
    if (user) {
      login(user);
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name}`,
      });
      setIsOpen(false);
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  const handleExternalLogin = (provider: 'google' | 'microsoft' | 'gmail') => {
    // In a real app, this would trigger OAuth authentication
    // For this demo, we'll find a user with the matching provider
    
    let authProvider = provider;
    if (provider === 'gmail') authProvider = 'gmail';
    
    const user = allUsers.find(user => user.authProvider === authProvider);
    
    if (user) {
      login(user);
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name}`,
      });
      setIsOpen(false);
    } else {
      toast({
        title: "Login failed",
        description: `No user found with ${provider} authentication`,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <LogIn className="h-4 w-4" />
          <span>Login</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Login to AgencyUnison</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="credentials" className="w-full" onValueChange={(value) => setActiveTab(value as LoginTab)}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="credentials">Email & Password</TabsTrigger>
            <TabsTrigger value="external">External Login</TabsTrigger>
          </TabsList>
          
          <TabsContent value="credentials">
            <form onSubmit={handleCredentialsLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button type="button" variant="link" size="sm" className="px-0">
                    Forgot password?
                  </Button>
                </div>
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">Login</Button>
              
              <div className="text-sm text-center text-muted-foreground">
                For demo purpose, use any email from: <br />
                admin@agencyunison.com, john@agencyunison.com, etc.
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="external">
            <div className="space-y-3">
              <Button 
                onClick={() => handleExternalLogin('google')} 
                variant="outline" 
                className="w-full justify-start gap-2"
              >
                <Google className="h-5 w-5 text-[#4285F4]" />
                <span>Continue with Google</span>
              </Button>
              
              <Button 
                onClick={() => handleExternalLogin('microsoft')} 
                variant="outline" 
                className="w-full justify-start gap-2"
              >
                <Microsoft className="h-5 w-5 text-[#00A4EF]" />
                <span>Continue with Microsoft</span>
              </Button>
              
              <Button 
                onClick={() => handleExternalLogin('gmail')} 
                variant="outline" 
                className="w-full justify-start gap-2"
              >
                <Mail className="h-5 w-5 text-[#D14836]" />
                <span>Continue with Gmail</span>
              </Button>
              
              <div className="text-sm text-center text-muted-foreground mt-4">
                For demo purposes, each provider logs in as a different user.
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
