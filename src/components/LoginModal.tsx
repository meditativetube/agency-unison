
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useUser } from './UserProvider';
import { Mail, LogIn, GithubIcon, CreditCard, UserPlus, Building } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

type LoginTab = 'credentials' | 'external' | 'signup';

const LoginModal = () => {
  const { toast } = useToast();
  const { login, signup, allUsers, agencies } = useUser();
  
  // Login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Signup state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRole, setSignupRole] = useState('user');
  const [selectedAgency, setSelectedAgency] = useState(agencies[0]?.id || '');
  
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
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if email already exists
    const existingUser = allUsers.find(user => user.email === signupEmail);
    
    if (existingUser) {
      toast({
        title: "Signup failed",
        description: "Email already in use",
        variant: "destructive",
      });
      return;
    }
    
    // Create new user
    const agencyObj = agencies.find(agency => agency.id === selectedAgency);
    
    signup({
      name: signupName,
      email: signupEmail,
      role: signupRole as 'admin' | 'cofounder' | 'user',
      authProvider: 'password',
      agencies: agencyObj ? [agencyObj] : undefined,
      activeAgencyId: selectedAgency
    });
    
    toast({
      title: "Account created",
      description: `Welcome to AgencyUnison, ${signupName}!`,
    });
    
    setIsOpen(false);
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
          <DialogTitle className="text-center text-xl">
            {activeTab === 'signup' ? 'Create Account' : 'Login to AgencyUnison'}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="credentials" value={activeTab} onValueChange={(value) => setActiveTab(value as LoginTab)}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="credentials">Email</TabsTrigger>
            <TabsTrigger value="external">External</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
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
                <GithubIcon className="h-5 w-5 text-[#4285F4]" />
                <span>Continue with Google</span>
              </Button>
              
              <Button 
                onClick={() => handleExternalLogin('microsoft')} 
                variant="outline" 
                className="w-full justify-start gap-2"
              >
                <CreditCard className="h-5 w-5 text-[#00A4EF]" />
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
          
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input 
                  id="signup-name" 
                  type="text" 
                  placeholder="John Doe"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input 
                  id="signup-email" 
                  type="email" 
                  placeholder="your@email.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input 
                  id="signup-password" 
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-role">Role</Label>
                <Select value={signupRole} onValueChange={setSignupRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="cofounder">Co-founder</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-agency">Agency</Label>
                <Select value={selectedAgency} onValueChange={setSelectedAgency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an agency" />
                  </SelectTrigger>
                  <SelectContent>
                    {agencies.map(agency => (
                      <SelectItem key={agency.id} value={agency.id}>
                        {agency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button type="submit" className="w-full">Create Account</Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
