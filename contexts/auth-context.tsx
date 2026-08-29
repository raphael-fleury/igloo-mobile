import apiClient from '@/services/api-client';
import { Profile, User } from '@/services/api-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  loggedUser: User | null;
  loggedProfile: Profile | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [loggedProfile, setLoggedProfile] = useState<Profile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    retrieveToken();
  }, []);

  const retrieveToken = async () => {
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

  const login = useCallback(async (newToken: string) => {
    try {
      await AsyncStorage.setItem('auth_token', newToken);
      setToken(newToken);
      setIsAuthenticated(true);
    } catch (e) {
      console.error('Failed to save token', e);
      throw e;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('auth_token');
      setToken(null);
      setIsAuthenticated(false);
      setLoggedUser(null);
      setLoggedProfile(null);
    } catch (e) {
      console.error('Failed to remove token', e);
      throw e;
    }
  }, []);

  const updateUserAndProfile = useCallback(async () => {
    const [userResponse, profileResponse] = await Promise.all([
      apiClient.get<User>('/me/'),
      apiClient.get<Profile>('/me/profile/'),
    ]);
    setLoggedUser(userResponse.data);
    setLoggedProfile(profileResponse.data);
  }, []);

  useEffect(() => {
    if (token) {
      updateUserAndProfile().catch((e) => {
        console.error('Failed to fetch user and profile on token change:', e);
      });
    } else {
      setLoggedUser(null);
      setLoggedProfile(null);
    }
  }, [token, updateUserAndProfile]);

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      token,
      loggedUser,
      loggedProfile,
      login,
      logout,
    }),
    [isAuthenticated, isLoading, token, loggedUser, loggedProfile, login, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>
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
