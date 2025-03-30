
import React, { createContext, useContext, useState } from 'react';

type UserRole = 'admin' | 'cofounder' | 'user';
type AuthProvider = 'password' | 'google' | 'microsoft' | 'gmail' | 'github';

interface Agency {
  id: string;
  name: string;
  logo?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  salary?: number;
  avatar?: string;
  authProvider?: AuthProvider;
  phoneNumber?: string;
  agencies?: Agency[];
  activeAgencyId?: string;
}

interface UserContextType {
  currentUser: User | null;
  isAdmin: boolean;
  allUsers: User[];
  agencies: Agency[];
  activeAgency: Agency | null;
  login: (user: User) => void;
  logout: () => void;
  signup: (userData: Omit<User, 'id'>) => void;
  setUsers: (users: User[]) => void;
  switchAgency: (agencyId: string) => void;
  updateUserProfile: (updatedUser: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock agencies
const mockAgencies: Agency[] = [
  {
    id: 'a1',
    name: 'AgencyUnison',
    logo: 'https://ui-avatars.com/api/?name=Agency+Unison&background=0D8ABC&color=fff',
  },
  {
    id: 'a2',
    name: 'Creative Solutions',
    logo: 'https://ui-avatars.com/api/?name=Creative+Solutions&background=D14836&color=fff',
  },
  {
    id: 'a3',
    name: 'Digital Innovators',
    logo: 'https://ui-avatars.com/api/?name=Digital+Innovators&background=00A36C&color=fff',
  },
];

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@agencyunison.com',
    role: 'admin',
    salary: 95000,
    authProvider: 'password',
    agencies: [mockAgencies[0], mockAgencies[1]],
    activeAgencyId: 'a1',
  },
  {
    id: '2',
    name: 'John Cofounder',
    email: 'john@agencyunison.com',
    role: 'cofounder',
    salary: 110000,
    authProvider: 'google',
    avatar: 'https://ui-avatars.com/api/?name=John+Cofounder&background=0D8ABC&color=fff',
    agencies: [mockAgencies[0]],
    activeAgencyId: 'a1',
  },
  {
    id: '3',
    name: 'Sarah Team',
    email: 'sarah@agencyunison.com',
    role: 'user',
    salary: 65000,
    authProvider: 'microsoft',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Team&background=00A36C&color=fff',
    agencies: [mockAgencies[0], mockAgencies[2]],
    activeAgencyId: 'a1',
    phoneNumber: '+1 (555) 123-4567',
  },
  {
    id: '4',
    name: 'Mike Admin',
    email: 'mike@agencyunison.com',
    role: 'admin',
    salary: 90000,
    authProvider: 'gmail',
    avatar: 'https://ui-avatars.com/api/?name=Mike+Admin&background=D14836&color=fff',
    agencies: [mockAgencies[1]],
    activeAgencyId: 'a2',
  },
  {
    id: '5',
    name: 'Emma Designer',
    email: 'emma@agencyunison.com',
    role: 'user',
    salary: 72000,
    authProvider: 'password',
    avatar: 'https://ui-avatars.com/api/?name=Emma+Designer&background=551A8B&color=fff',
    agencies: [mockAgencies[2]],
    activeAgencyId: 'a3',
  },
  {
    id: '6',
    name: 'Alex Developer',
    email: 'alex@agencyunison.com',
    role: 'user',
    salary: 78000,
    authProvider: 'github',
    avatar: 'https://ui-avatars.com/api/?name=Alex+Developer&background=333&color=fff',
    agencies: [mockAgencies[0], mockAgencies[1]],
    activeAgencyId: 'a1',
    phoneNumber: '+1 (555) 987-6543',
  }
];

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // For demo purposes, we'll start with the admin user logged in
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers[0]);
  const [users, setUsers] = useState<User[]>(mockUsers);
  
  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'cofounder';
  
  const activeAgency = currentUser?.activeAgencyId
    ? mockAgencies.find(agency => agency.id === currentUser.activeAgencyId) || null
    : null;

  const login = (user: User) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };
  
  const signup = (userData: Omit<User, 'id'>) => {
    const newUserId = (users.length + 1).toString();
    
    // Generate avatar if not provided
    let userAvatar = userData.avatar;
    if (!userAvatar) {
      userAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=0D8ABC&color=fff`;
    }
    
    const newUser: User = {
      id: newUserId,
      ...userData,
      avatar: userAvatar,
      agencies: userData.agencies || [mockAgencies[0]],
      activeAgencyId: userData.activeAgencyId || mockAgencies[0].id
    };
    
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
  };
  
  const switchAgency = (agencyId: string) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        activeAgencyId: agencyId
      });
    }
  };
  
  const updateUserProfile = (updatedUser: Partial<User>) => {
    if (currentUser) {
      const updated = { ...currentUser, ...updatedUser };
      setCurrentUser(updated);
      
      // Also update the user in the users array
      setUsers(users.map(user => 
        user.id === currentUser.id ? updated : user
      ));
    }
  };

  return (
    <UserContext.Provider value={{ 
      currentUser, 
      isAdmin, 
      allUsers: users,
      agencies: mockAgencies,
      activeAgency,
      login, 
      logout,
      signup,
      setUsers,
      switchAgency,
      updateUserProfile
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
