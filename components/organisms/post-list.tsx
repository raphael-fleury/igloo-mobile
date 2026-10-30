import { Text } from '@/components/atoms/text';
import { Post } from '@/components/organisms/post';
import { Spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import type { PostsPage } from '@/services/api-types';
import type { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import type { ReactElement } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

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
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetching]);

  if (isLoading && !header) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={accentColor} />
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(post) => post.id}
      renderItem={({ item }) => <Post post={item} />}
      ListHeaderComponent={header}
      ListEmptyComponent={
        isLoading ? (
          <ActivityIndicator style={styles.status} color={accentColor} />
        ) : (
          <View style={styles.status}>
            <Text variant="body" colorName="muted">
              {isError ? errorMessage : emptyMessage}
            </Text>
          </View>
        )
      }
      ListFooterComponent={
        isFetchingNextPage ? (
          <ActivityIndicator style={styles.footer} color={accentColor} />
        ) : isError && posts.length > 0 ? (
          <View style={styles.status}>
            <Text variant="body" colorName="muted">
              {loadMoreErrorMessage}
            </Text>
          </View>
        ) : null
      }
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      onRefresh={refetch}
      refreshing={isRefetching}
    />
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
