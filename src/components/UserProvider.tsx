
import React, { createContext, useContext, useState } from 'react';

type UserRole = 'admin' | 'cofounder' | 'user';
type AuthProvider = 'password' | 'google' | 'microsoft' | 'gmail';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  salary?: number;
  avatar?: string;
  authProvider?: AuthProvider;
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
    authProvider: 'password',
  },
  {
    id: '2',
    name: 'John Cofounder',
    email: 'john@agencyunison.com',
    role: 'cofounder',
    salary: 110000,
    authProvider: 'google',
    avatar: 'https://ui-avatars.com/api/?name=John+Cofounder&background=0D8ABC&color=fff',
  },
  {
    id: '3',
    name: 'Sarah Team',
    email: 'sarah@agencyunison.com',
    role: 'user',
    salary: 65000,
    authProvider: 'microsoft',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Team&background=00A36C&color=fff',
  },
  {
    id: '4',
    name: 'Mike Admin',
    email: 'mike@agencyunison.com',
    role: 'admin',
    salary: 90000,
    authProvider: 'gmail',
    avatar: 'https://ui-avatars.com/api/?name=Mike+Admin&background=D14836&color=fff',
  },
  {
    id: '5',
    name: 'Emma Designer',
    email: 'emma@agencyunison.com',
    role: 'user',
    salary: 72000,
    authProvider: 'password',
    avatar: 'https://ui-avatars.com/api/?name=Emma+Designer&background=551A8B&color=fff',
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
