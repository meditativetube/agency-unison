import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from './ui/button';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export type Notification = {
  id: string;
  title: string;
  description: string;
  read: boolean;
  link?: string;
  createdAt: Date;
};

interface NotificationPopoverProps {
  notifications: Notification[];
  markAsRead: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationPopover = ({ 
  notifications,
  markAsRead,
  clearAllNotifications
}: NotificationPopoverProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    
    // If notification has a link, navigate to it
    if (notification.link) {
      navigate(notification.link);
    }
    
    toast({
      title: "Notification viewed",
      description: notification.title,
    });
  };
  
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    // If less than 24 hours, show hours ago
    if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      return hours === 0 ? 'Just now' : `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }
    
    // If less than 7 days, show days ago
    if (diff < 7 * 24 * 60 * 60 * 1000) {
      const days = Math.floor(diff / (24 * 60 * 60 * 1000));
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
    
    // Otherwise, show the date
    return date.toLocaleDateString();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0 bg-white dark:bg-gray-900">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium text-lg">Notifications</h3>
          {notifications.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              className="text-xs text-blue-500"
              onClick={clearAllNotifications}
            >
              Clear all
            </Button>
          )}
        </div>
        
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 px-4 text-center text-gray-500">
              <Bell className="h-12 w-12 mb-2 stroke-1" />
              <p>No notifications yet</p>
              <p className="text-sm">We'll notify you when something happens</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`
                  border-b last:border-b-0 p-4 cursor-pointer transition-colors
                  ${notification.read 
                    ? 'bg-white dark:bg-gray-900' 
                    : 'bg-blue-50 dark:bg-blue-900/20'
                  }
                  hover:bg-gray-100 dark:hover:bg-gray-800
                `}
              >
                <div className="flex justify-between mb-1">
                  <h4 className={`font-medium ${!notification.read ? 'text-blue-700 dark:text-blue-400' : ''}`}>
                    {notification.title}
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(notification.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {notification.description}
                </p>
                {notification.link && (
                  <div className="text-xs text-blue-500 mt-1">
                    Click to view
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopover;
