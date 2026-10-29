import { Text } from '@/components/atoms/text';
import { IconButton } from '@/components/molecules/icon-button';
import { PageLayout } from '@/components/organisms/page-layout';
import { Post } from '@/components/organisms/post';
import { PostComposer } from '@/components/organisms/post-composer';
import { Spacing } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';
import { useGetPostById } from '@/hooks/use-posts';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';

export default function PostScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const backgroundColor = useThemeColor('background');
  const accentColor = useThemeColor('accent');
  const borderColor = useThemeColor('border');
  const { isAuthenticated } = useAuth();

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  const { data: post, isLoading, isError } = useGetPostById(id ?? '');

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
      <View
        style={[
          styles.container,
          { backgroundColor },
        ]}
      >
        <View style={[styles.header, { borderBottomColor: borderColor }]}>
          <IconButton
            name="arrow-left"
            variant="default"
            accessibilityLabel="Go back"
            onPress={handleBackPress}
          />
          <Text variant="title">Post</Text>
        </View>

        {isLoading && (
          <View style={styles.centered}>
            <ActivityIndicator color={accentColor} />
          </View>
        )}

        {isError && (
          <View style={styles.centered}>
            <Text variant="body" colorName="muted">
              Could not load post.
            </Text>
          </View>
        )}

        {!isLoading && !isError && post && (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Post post={post} />
            {isAuthenticated && <PostComposer repliedPost={post} />}
          </ScrollView>
        )}

        {!isLoading && !isError && !post && (
          <View style={styles.centered}>
            <Text variant="body" colorName="muted">
              Post not found.
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
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
