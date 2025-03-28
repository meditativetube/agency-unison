
import React, { createContext, useContext, useState } from 'react';

type UserRole = 'admin' | 'cofounder' | 'user';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface UserContextType {
  currentUser: User | null;
  isAdmin: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@agencyunison.com',
    role: 'admin',
  },
  {
    id: '2',
    name: 'John Cofounder',
    email: 'john@agencyunison.com',
    role: 'cofounder',
  },
  {
    id: '3',
    name: 'Sarah Team',
    email: 'sarah@agencyunison.com',
    role: 'user',
  }
];

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // For demo purposes, we'll start with the admin user logged in
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers[0]);

  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'cofounder';

  const login = (user: User) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ currentUser, isAdmin, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Custom hook for role-based access control
export const useRequireAdmin = () => {
  const { isAdmin } = useUser();
  return isAdmin;
};
