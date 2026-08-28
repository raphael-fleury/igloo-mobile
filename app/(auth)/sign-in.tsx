import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

import { Text } from '@/components/atoms/text';
import { Button } from '@/components/containers/button';
import { TextInputField } from '@/components/molecules/text-input';
import { Breakpoints, Spacing } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';
import { useLogin } from '@/hooks/use-auth';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function LoginScreen() {
  const router = useRouter();
  const loginMutation = useLogin();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const backgroundColor = useThemeColor('background');

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!email.includes('@')) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const response = await loginMutation.mutateAsync({
        email,
        password,
      });

      // Save token and update auth state
      await login(response.token);
      
      // Navigate to home
      router.replace('/(tabs)');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      Alert.alert('Login Error', errorMessage);
    }
  };

  const handleSignUpPress = () => {
    router.push('/(auth)/sign-up');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text variant="hero" colorName="accent" style={styles.title}>
            Welcome Back
          </Text>
          <Text variant="body" colorName="muted" style={styles.subtitle}>
            Sign in to your account
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <TextInputField
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loginMutation.isPending}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            error={errors.email}
          />

          <TextInputField
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            editable={!loginMutation.isPending}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) setErrors({ ...errors, password: undefined });
            }}
            error={errors.password}
          />

          <Button
            variant="accent"
            size="md"
            onPress={handleLogin}
            disabled={loginMutation.isPending}
            style={styles.loginButton}
          >
            <Text
              variant="body"
              colorName="default"
              style={styles.loginButtonText}
            >
              {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
            </Text>
          </Button>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text variant="body" colorName="default">
            Don't have an account?{' '}
          </Text>
          <Button
            variant="default"
            size="md"
            onPress={handleSignUpPress}
            disabled={loginMutation.isPending}
            style={styles.signUpButton}
          >
            <Text variant="body" colorName="accent">
              Sign Up
            </Text>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  scrollContent: {
    flexGrow: 1,
    padding: Spacing.lg,
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: Spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: Spacing.sm,
  },
  subtitle: {
  },
  form: {
    marginBottom: Spacing.xl,
    width: '100%',
    maxWidth: Breakpoints.sm,
    alignSelf: 'center',
    alignItems: 'stretch',
  },
  loginButton: {
    marginTop: Spacing.lg,
    justifyContent: 'center',
    paddingVertical: Spacing.md,
  },
  loginButtonText: {
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.xl,
  },
  signUpButton: {
    padding: 0,
  },
});
