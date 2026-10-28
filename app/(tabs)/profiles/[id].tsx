import { Text } from '@/components/atoms/text';
import { PageLayout } from '@/components/organisms/page-layout';
import { Profile } from '@/components/organisms/profile';
import { Spacing } from '@/constants/theme';
import { useGetProfileById } from '@/hooks/use-profiles';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';

// TODO: Get profile by username
export default function ProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const backgroundColor = useThemeColor('background');
  const accentColor = useThemeColor('accent');
  const { data: profile, isLoading, isError } = useGetProfileById(id ?? '');

  const sidebarSections = [
    {
      title: 'Trending Topics',
      items: [
        { id: '1', label: '#ReactNative', badge: 234 },
        { id: '2', label: '#Expo', badge: 89 },
        { id: '3', label: '#Mobiledev' },
      ],
    },
    {
      title: 'Suggested Profiles',
      items: [
        { id: '1', label: 'Tech News Hub', badge: 45 },
        { id: '2', label: 'Design Tips' },
        { id: '3', label: 'Code Learning', badge: 128 },
      ],
    },
  ];

  return (
    <PageLayout rightSidebarSections={sidebarSections}>
      <View style={[styles.container, { backgroundColor }]}>
        {isLoading && (
          <View style={styles.centered}>
            <ActivityIndicator color={accentColor} />
          </View>
        )}

        {isError && (
          <View style={styles.centered}>
            <Text variant="body" colorName="muted">
              Could not load profile.
            </Text>
          </View>
        )}

        {!isLoading && !isError && profile && (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Profile profile={profile} />
          </ScrollView>
        )}

        {!isLoading && !isError && !profile && (
          <View style={styles.centered}>
            <Text variant="body" colorName="muted">
              Profile not found.
            </Text>
          </View>
        )}
      </View>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
