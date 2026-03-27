import { UserData } from '@/lib/http/types/user';
import { createContext, useContext } from 'react';

type UserContextValue = {
  user?: UserData;
  setUser: (user?: UserData) => void;
};

export const UserContext = createContext<UserContextValue | undefined>(
  undefined,
);

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUserContext must be use within UserProvider');
  }

  return context;
};
