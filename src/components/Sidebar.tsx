
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Users, 
  Calendar, 
  DollarSign,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const SidebarLink = ({ 
  to, 
  icon: Icon, 
  label, 
  isActive 
}: { 
  to: string; 
  icon: any; 
  label: string; 
  isActive: boolean 
}) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        isActive 
          ? "bg-blue-100 text-blue-700 font-medium" 
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/tasks', icon: CheckSquare, label: 'Tasks' },
    { to: '/team', icon: Users, label: 'Team' },
    { to: '/meetings', icon: Calendar, label: 'Meetings' },
    { to: '/finance', icon: DollarSign, label: 'Finance' }
  ];

  return (
    <div 
      className={cn(
        "flex flex-col border-r bg-white transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-2 flex justify-end">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <div className="space-y-1 px-3 py-2">
        {navItems.map((item) => (
          <div key={item.to} className={cn(collapsed ? "justify-center" : "")}>
            <SidebarLink
              to={item.to}
              icon={item.icon}
              label={collapsed ? "" : item.label}
              isActive={location.pathname === item.to}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
