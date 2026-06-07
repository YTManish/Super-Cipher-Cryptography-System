'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, login as loginWithMockAuth, removeToken, setToken } from './auth';

type User = {
  uid: string;
  email: string | null;
  displayName?: string | null;
};

type LoginCredentials = { email: string; password: string };

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser ? {
      uid: currentUser.id,
      email: currentUser.email,
      displayName: currentUser.name ?? null,
    } : null);
    setLoading(false);
  }, []);

  const login = async ({ email, password }: LoginCredentials) => {
    try {
      const response = await loginWithMockAuth({ email, password });
      setToken(response.token);
      setUser({
        uid: response.user.id,
        email: response.user.email,
        displayName: response.user.name ?? null,
      });
      router.push('/');
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    removeToken();
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}