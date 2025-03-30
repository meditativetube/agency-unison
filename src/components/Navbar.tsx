
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search, Settings, Sun, Moon, Building } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useTheme } from './ThemeProvider';
import { useUser } from './UserProvider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import LoginModal from './LoginModal';
import NotificationPopover, { Notification } from './NotificationPopover';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, logout, agencies, activeAgency, switchAgency } = useUser();
  
  // Mock notifications for demo purposes
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New task assigned',
      description: 'You have been assigned a new task: "Complete project proposal"',
      read: false,
      link: '/tasks',
      createdAt: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
    },
    {
      id: '2',
      title: 'Team meeting reminder',
      description: 'Don\'t forget about the team meeting today at 2:00 PM',
      read: false,
      link: '/meetings',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
    },
    {
      id: '3',
      title: 'Welcome to AgencyUnison',
      description: 'Welcome to the platform! Take a tour to learn about all features.',
      read: true,
      link: '/',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) // 2 days ago
    }
  ]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };
  
  const markNotificationAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id 
        ? { ...notification, read: true } 
        : notification
    ));
  };
  
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="border-b bg-white dark:bg-gray-900 dark:border-gray-800 sticky top-0 z-10">
      <div className="flex h-16 items-center px-4 sm:px-6">
        <div className="flex items-center gap-2 font-bold text-xl text-blue-600 dark:text-blue-400">
          <Link to="/">AgencyUnison</Link>
        </div>
        
        {currentUser && currentUser.agencies && currentUser.agencies.length > 1 && (
          <div className="ml-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Building className="h-4 w-4" />
                  <span>{activeAgency?.name || "Select Agency"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Switch Agency</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {currentUser.agencies.map((agency) => (
                  <DropdownMenuItem 
                    key={agency.id}
                    onClick={() => switchAgency(agency.id)}
                    className={agency.id === currentUser.activeAgencyId ? "bg-blue-50 dark:bg-blue-900/20" : ""}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={agency.logo} />
                        <AvatarFallback>{getInitials(agency.name)}</AvatarFallback>
                      </Avatar>
                      <span>{agency.name}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        
        <div className="ml-auto flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 md:w-[200px] lg:w-[300px] bg-gray-50 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>
          
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="transition-transform hover:rotate-12">
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          
          {currentUser && (
            <NotificationPopover 
              notifications={notifications} 
              markAsRead={markNotificationAsRead}
              clearAllNotifications={clearAllNotifications}
            />
          )}
          
          <Link to="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
          
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:scale-110 transition-transform">
                  <Avatar>
                    <AvatarImage src={currentUser?.avatar} />
                    <AvatarFallback className="bg-blue-500">{currentUser ? getInitials(currentUser.name) : 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="font-medium">{currentUser?.name}</div>
                  <div className="text-xs text-muted-foreground">{currentUser?.email}</div>
                  <div className="text-xs capitalize mt-1 inline-block bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded text-blue-800 dark:text-blue-300">
                    {currentUser?.role}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile" className="w-full">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/settings" className="w-full">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <LoginModal />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
