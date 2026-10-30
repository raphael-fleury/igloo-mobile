import { Text } from '@/components/atoms/text';
import { Post } from '@/components/organisms/post';
import { usePageScrollPagination } from '@/components/organisms/page-scroll-view';
import { Spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import type { PostsPage } from '@/services/api-types';
import type { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import type { ReactElement } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

type PostListQuery = Pick<
  UseInfiniteQueryResult<InfiniteData<PostsPage>>,
  | 'data'
  | 'isLoading'
  | 'isError'
  | 'isFetching'
  | 'fetchNextPage'
  | 'hasNextPage'
  | 'isFetchingNextPage'
  | 'refetch'
  | 'isRefetching'
>;

type PostListProps = {
  query: PostListQuery;
  header?: ReactElement;
  emptyMessage?: string;
  errorMessage?: string;
  loadMoreErrorMessage?: string;
};

export function PostList({
  query,
  header,
  emptyMessage = 'No posts yet.',
  errorMessage = 'Could not load posts.',
  loadMoreErrorMessage = 'Could not load more posts.',
}: Readonly<PostListProps>) {
  const accentColor = useThemeColor('accent');
  const {
    data,
    isLoading,
    isError,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = query;
  const posts = useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data]
  );
  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetching && !isError) {
      fetchNextPage({ cancelRefetch: false });
    }
  }, [fetchNextPage, hasNextPage, isFetching, isError]);
  usePageScrollPagination(handleEndReached, refetch, isRefetching);

  if (isLoading && !header) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={accentColor} />
      </View>
    );
  }

  return (
    <View>
      {header}
      {posts.map((post) => <Post key={post.id} post={post} />)}
      {posts.length === 0 && (
        isLoading ? (
          <ActivityIndicator style={styles.status} color={accentColor} />
        ) : (
          <View style={styles.status}>
            <Text variant="body" colorName="muted">
              {isError ? errorMessage : emptyMessage}
            </Text>
          </View>
        )
      )}
      {isFetchingNextPage ? (
        <ActivityIndicator style={styles.footer} color={accentColor} />
      ) : isError && posts.length > 0 ? (
        <View style={styles.status}>
          <Text variant="body" colorName="muted">
            {loadMoreErrorMessage}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl,
  },
  status: {
    alignItems: 'center',
    padding: Spacing.xl,
  },
  footer: {
    paddingVertical: Spacing.lg,
  },
});
