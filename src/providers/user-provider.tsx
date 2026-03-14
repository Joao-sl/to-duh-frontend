'use client';

import { UserContext } from '@/contexts/user-context';
import { UserData } from '@/lib/http/get-current-user';
import { useEffect, useState } from 'react';

type UserProviderProps = {
  children: React.ReactNode;
  userData?: UserData;
};

export function UserProvider({ children, userData }: UserProviderProps) {
  const [user, setUser] = useState<UserData | undefined>(userData);

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
