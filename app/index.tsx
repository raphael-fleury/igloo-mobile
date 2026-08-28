import { Redirect, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Text } from '@/components/atoms/text';
import { Button } from '@/components/containers/button';
import { Breakpoints } from '@/constants/theme';
import { Spacing } from '@/constants/theme/spacing';
import { useAuth } from '@/contexts/auth-context';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function LandingPage() {
  const router = useRouter();
  const backgroundColor = useThemeColor('background');
  const { isAuthenticated } = useAuth();

  // Redirect to tabs if already authenticated
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  const handleSignIn = () => {
    router.push('/(auth)/sign-in');
  };

  const handleSignUp = () => {
    router.push('/(auth)/sign-up');
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.content}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text variant="hero" colorName="accent" style={styles.title}>
            Igloo
          </Text>
          <Text variant="body" colorName="default" style={styles.subtitle}>
            Connect, Share, and Explore
          </Text>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text variant="title" colorName="default" style={styles.featureTitle}>
            Why Join Us?
          </Text>
          <View style={styles.featuresList}>
            <FeatureItem text="Share your moments with friends" />
            <FeatureItem text="Discover amazing content" />
            <FeatureItem text="Connect with your community" />
          </View>
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonsSection}>
          <Button
            variant="accent"
            size="md"
            onPress={handleSignUp}
            style={styles.button}
          >
            <Text variant="input" colorName="accent">
              Create Account
            </Text>
          </Button>

          <Button
            variant="default"
            size="md"
            onPress={handleSignIn}
            style={styles.button}
          >
            <Text variant="input" colorName="muted">
              Sign In
            </Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <View style={styles.featureItem}>
      <Text variant="body" colorName="default">
        ✓ {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    alignItems: 'stretch',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  title: {
    marginBottom: Spacing.lg,
  },
  subtitle: {
    textAlign: 'center',
  },
  featuresSection: {
    marginBottom: Spacing.xxl,
    maxWidth: Breakpoints.sm,
    alignSelf: 'center',
    width: '100%',
  },
  featureTitle: {
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  featuresList: {
    gap: Spacing.md,
  },
  featureItem: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  buttonsSection: {
    gap: Spacing.md,
    marginTop: Spacing.md,
    maxWidth: Breakpoints.sm,
    alignSelf: 'center',
    width: '100%',
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
  },
});
