
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useUser } from './UserProvider';
import { LogIn, ArrowRight, Google, Github, Mail, CreditCard } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

type LoginView = 'login' | 'signup';

const LoginModal = () => {
  const { toast } = useToast();
  const { login, signup, allUsers, agencies } = useUser();
  
  // Login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // Signup state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupRole, setSignupRole] = useState('user');
  const [selectedAgency, setSelectedAgency] = useState(agencies[0]?.id || '');
  
  const [activeView, setActiveView] = useState<LoginView>('login');
  const [isOpen, setIsOpen] = useState(false);

  const handleEmailLogin = (e: React.FormEvent) => {
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

  const handleExternalLogin = (provider: 'google' | 'microsoft' | 'gmail' | 'github') => {
    // In a real app, this would trigger OAuth authentication
    // For this demo, we'll find a user with the matching provider
    
    const user = allUsers.find(user => user.authProvider === provider);
    
    if (user) {
      login(user);
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name}`,
      });
      setIsOpen(false);
    } else {
      // If no user exists with this provider, we'll create a new user
      const newUserData = {
        name: provider.charAt(0).toUpperCase() + provider.slice(1) + ' User',
        email: `${provider}user@example.com`,
        role: 'user' as UserRole,
        authProvider: provider as AuthProvider,
        agencies: [agencies[0]],
        activeAgencyId: agencies[0].id
      };
      
      signup(newUserData);
      
      toast({
        title: "Account created",
        description: `Welcome! You've signed up with ${provider}`,
      });
      
      setIsOpen(false);
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
      phoneNumber: signupPhone,
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
  
  const switchToSignup = () => {
    setActiveView('signup');
  };
  
  const switchToLogin = () => {
    setActiveView('login');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <LogIn className="h-4 w-4" />
          <span>Login</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-none bg-transparent shadow-none">
        <div className="rounded-2xl overflow-hidden bg-gradient-to-b from-blue-900 to-blue-950 text-white p-8 shadow-2xl border border-blue-800/50">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-blue-800/50 p-3">
              <div className="rounded-full border-2 border-blue-400/50 w-6 h-6 flex items-center justify-center">
                <div className="rounded-full bg-blue-400 w-3 h-3"></div>
              </div>
            </div>
          </div>
          
          <h2 className="text-center text-xl font-medium mb-2">
            {activeView === 'login' ? 'Welcome back' : 'Create Account'}
          </h2>
          
          <p className="text-center text-blue-300 text-sm mb-6">
            {activeView === 'login' 
              ? 'Please enter your details to sign in.' 
              : 'Please fill in the information below.'
            }
          </p>
          
          {activeView === 'login' ? (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-blue-200">Email</Label>
                <div className="relative">
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-blue-800/30 border-blue-700 text-white placeholder:text-blue-400 pr-10"
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    className="absolute right-1 top-1 bottom-1 rounded-full bg-blue-500 hover:bg-blue-400"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                  className="bg-blue-800/30 border-blue-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                <Label htmlFor="remember" className="text-blue-200 text-sm">Remember me</Label>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-blue-700"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-blue-900 px-2 text-blue-400">OR</span>
                </div>
              </div>
              
              <Button 
                type="button" 
                onClick={() => handleExternalLogin('google')} 
                variant="outline" 
                className="w-full justify-between border-blue-700 bg-blue-800/30 text-white hover:bg-blue-800/50 hover:text-white"
              >
                <div className="flex items-center gap-2">
                  <Google className="h-4 w-4 text-blue-200" />
                  <span>Continue with Google</span>
                </div>
                <ArrowRight className="h-4 w-4" />
              </Button>
              
              <Button 
                type="button" 
                onClick={() => handleExternalLogin('github')} 
                variant="outline" 
                className="w-full justify-between border-blue-700 bg-blue-800/30 text-white hover:bg-blue-800/50 hover:text-white"
              >
                <div className="flex items-center gap-2">
                  <Github className="h-4 w-4 text-blue-200" />
                  <span>Continue with GitHub</span>
                </div>
                <ArrowRight className="h-4 w-4" />
              </Button>
              
              <Button 
                type="button" 
                onClick={() => handleExternalLogin('microsoft')} 
                variant="outline" 
                className="w-full justify-between border-blue-700 bg-blue-800/30 text-white hover:bg-blue-800/50 hover:text-white"
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-blue-200" />
                  <span>Continue with Microsoft</span>
                </div>
                <ArrowRight className="h-4 w-4" />
              </Button>
              
              <p className="text-center text-blue-400 text-sm">
                Don't have an account?{' '}
                <Button 
                  type="button" 
                  variant="link" 
                  className="p-0 text-blue-300 hover:text-blue-200" 
                  onClick={switchToSignup}
                >
                  Create Account
                </Button>
              </p>
              
              <div className="text-xs text-center text-blue-500 mt-4">
                For demo purpose, use any email from the mock users<br />
                or sign up with any provider to create a new account
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name" className="text-blue-200">Full Name</Label>
                <Input 
                  id="signup-name" 
                  type="text" 
                  placeholder="John Doe"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                  className="bg-blue-800/30 border-blue-700 text-white placeholder:text-blue-400"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-blue-200">Email</Label>
                <Input 
                  id="signup-email" 
                  type="email" 
                  placeholder="your@email.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                  className="bg-blue-800/30 border-blue-700 text-white placeholder:text-blue-400"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-phone" className="text-blue-200">Phone Number (Optional)</Label>
                <Input 
                  id="signup-phone" 
                  type="tel" 
                  placeholder="+1 (555) 000-0000"
                  value={signupPhone}
                  onChange={(e) => setSignupPhone(e.target.value)}
                  className="bg-blue-800/30 border-blue-700 text-white placeholder:text-blue-400"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-blue-200">Password</Label>
                <Input 
                  id="signup-password" 
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                  className="bg-blue-800/30 border-blue-700 text-white placeholder:text-blue-400"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-role" className="text-blue-200">Role</Label>
                <Select value={signupRole} onValueChange={setSignupRole}>
                  <SelectTrigger className="bg-blue-800/30 border-blue-700 text-white">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className="bg-blue-900 border-blue-700 text-white">
                    <SelectItem value="user" className="focus:bg-blue-800 focus:text-white">User</SelectItem>
                    <SelectItem value="admin" className="focus:bg-blue-800 focus:text-white">Admin</SelectItem>
                    <SelectItem value="cofounder" className="focus:bg-blue-800 focus:text-white">Co-founder</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-agency" className="text-blue-200">Agency</Label>
                <Select value={selectedAgency} onValueChange={setSelectedAgency}>
                  <SelectTrigger className="bg-blue-800/30 border-blue-700 text-white">
                    <SelectValue placeholder="Select an agency" />
                  </SelectTrigger>
                  <SelectContent className="bg-blue-900 border-blue-700 text-white">
                    {agencies.map(agency => (
                      <SelectItem 
                        key={agency.id} 
                        value={agency.id}
                        className="focus:bg-blue-800 focus:text-white"
                      >
                        {agency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-blue-500 hover:bg-blue-400 text-white"
              >
                Create Account
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-blue-700"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-blue-900 px-2 text-blue-400">OR</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <Button 
                  type="button" 
                  onClick={() => handleExternalLogin('google')} 
                  variant="outline" 
                  className="border-blue-700 bg-blue-800/30 text-white hover:bg-blue-800/50 hover:text-white"
                  size="icon"
                >
                  <Google className="h-4 w-4" />
                </Button>
                <Button 
                  type="button" 
                  onClick={() => handleExternalLogin('github')} 
                  variant="outline" 
                  className="border-blue-700 bg-blue-800/30 text-white hover:bg-blue-800/50 hover:text-white"
                  size="icon"
                >
                  <Github className="h-4 w-4" />
                </Button>
                <Button 
                  type="button" 
                  onClick={() => handleExternalLogin('microsoft')} 
                  variant="outline" 
                  className="border-blue-700 bg-blue-800/30 text-white hover:bg-blue-800/50 hover:text-white"
                  size="icon"
                >
                  <CreditCard className="h-4 w-4" />
                </Button>
              </div>
              
              <p className="text-center text-blue-400 text-sm">
                Already have an account?{' '}
                <Button 
                  type="button" 
                  variant="link" 
                  className="p-0 text-blue-300 hover:text-blue-200" 
                  onClick={switchToLogin}
                >
                  Sign in
                </Button>
              </p>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
