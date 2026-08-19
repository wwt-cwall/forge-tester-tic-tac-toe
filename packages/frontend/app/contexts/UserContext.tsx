// Changed by Forge v0.1.0
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserContextType {
  displayName: string | null;
  setDisplayName: (name: string) => void;
  clearDisplayName: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [displayName, setDisplayNameState] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load display name from sessionStorage on mount
  useEffect(() => {
    const storedName = sessionStorage.getItem('displayName');
    if (storedName) {
      setDisplayNameState(storedName);
    }
    setIsLoaded(true);
  }, []);

  const setDisplayName = (name: string) => {
    setDisplayNameState(name);
    sessionStorage.setItem('displayName', name);
  };

  const clearDisplayName = () => {
    setDisplayNameState(null);
    sessionStorage.removeItem('displayName');
  };

  // Don't render children until we've checked sessionStorage
  if (!isLoaded) {
    return null;
  }

  return (
    <UserContext.Provider value={{ displayName, setDisplayName, clearDisplayName }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
