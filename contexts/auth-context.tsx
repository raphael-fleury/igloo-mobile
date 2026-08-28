import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  // Verificar se há um token salvo ao iniciar
  useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    try {
      const savedToken = await AsyncStorage.getItem('auth_token');
      if (savedToken) {
        setToken(savedToken);
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error('Failed to restore token', e);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (newToken: string) => {
    try {
      await AsyncStorage.setItem('auth_token', newToken);
      setToken(newToken);
      setIsAuthenticated(true);
    } catch (e) {
      console.error('Failed to save token', e);
      throw e;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('auth_token');
      setToken(null);
      setIsAuthenticated(false);
    } catch (e) {
      console.error('Failed to remove token', e);
      throw e;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}
