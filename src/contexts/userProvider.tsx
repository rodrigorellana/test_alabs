import React, { useState } from 'react';
import UserContext from './userContext';
import { IUser } from '../interfaces/jokes';
import { useEffect } from 'react';

export default function UserProvider({ children }: any) {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signIn = (user: IUser) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const signOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('page');
    localStorage.removeItem('limit');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

