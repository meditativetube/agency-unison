
import React, { createContext, useContext, useState } from 'react';

type UserRole = 'admin' | 'cofounder' | 'user';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  salary?: number;
  avatar?: string;
}

interface UserContextType {
  currentUser: User | null;
  isAdmin: boolean;
  allUsers: User[];
  login: (user: User) => void;
  logout: () => void;
  setUsers: (users: User[]) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@agencyunison.com',
    role: 'admin',
    salary: 95000,
  },
  {
    id: '2',
    name: 'John Cofounder',
    email: 'john@agencyunison.com',
    role: 'cofounder',
    salary: 110000,
  },
  {
    id: '3',
    name: 'Sarah Team',
    email: 'sarah@agencyunison.com',
    role: 'user',
    salary: 65000,
  },
  {
    id: '4',
    name: 'Mike Admin',
    email: 'mike@agencyunison.com',
    role: 'admin',
    salary: 90000,
  },
  {
    id: '5',
    name: 'Emma Designer',
    email: 'emma@agencyunison.com',
    role: 'user',
    salary: 72000,
  }
];

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // For demo purposes, we'll start with the admin user logged in
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers[0]);
  const [users, setUsers] = useState<User[]>(mockUsers);

  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'cofounder';

  const login = (user: User) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ 
      currentUser, 
      isAdmin, 
      allUsers: users,
      login, 
      logout,
      setUsers
    }}>
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
