import { Text } from '@/components/atoms/text';
import { PageHeader } from '@/components/molecules/page-header';
import { PageLayout } from '@/components/organisms/page-layout';
import { Post } from '@/components/organisms/post';
import { PostComposer } from '@/components/organisms/post-composer';
import { PostList } from '@/components/organisms/post-list';
import { Spacing } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';
import { useGetPostById, useGetPostReplies } from '@/hooks/use-posts';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function PostScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const backgroundColor = useThemeColor('background');
  const accentColor = useThemeColor('accent');
  const { isAuthenticated } = useAuth();

  const { data: post, isLoading, isError } = useGetPostById(id ?? '');
  const repliesQuery = useGetPostReplies(id ?? '');

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
    <PageLayout
      rightSidebarSections={sidebarSections}
      header={<PageHeader title="Post" />}
    >
      <View
        style={[
          styles.container,
          { backgroundColor },
        ]}
      >
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
          <PostList
            query={repliesQuery}
            emptyMessage="No replies yet."
            errorMessage="Could not load replies."
            loadMoreErrorMessage="Could not load replies."
            header={
              <>
                <Post post={post} />
                {isAuthenticated && <PostComposer repliedPost={post} />}
              </>
            }
          />
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
});
