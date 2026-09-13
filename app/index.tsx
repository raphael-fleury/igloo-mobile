import { Redirect } from 'expo-router';
import React from 'react';

import { useAuth } from '@/contexts/auth-context';

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated
    ? <Redirect href="/(tabs)" />
    : <Redirect href="/(auth)" />;
}
