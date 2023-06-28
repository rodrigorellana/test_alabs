import { useState, useEffect } from 'react';
import { IUser } from '../interfaces/jokes';

const useAuth = () => {
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

  return { user, signIn, signOut };
};

export default useAuth;