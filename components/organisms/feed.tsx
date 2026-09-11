import { Post } from '@/components/organisms/post';
import { Spacing } from '@/constants/theme';
import { Feed as FeedName, useGetFeed } from '@/hooks/use-feeds';
import { useThemeColor } from '@/hooks/use-theme-color';
import { PaginationParams } from '@/services/api-types';
import { useCallback, useMemo } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

type FeedProps = {
  feed: FeedName;
  params?: Omit<PaginationParams, 'cursor'>;
};

export function Feed({ feed, params }: Readonly<FeedProps>) {
  const accentColor = useThemeColor('accent');
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useGetFeed(feed, params);

  const posts = useMemo(
    () => data?.pages.flatMap((page) => page?.items ?? []) ?? [],
    [data]
  );

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={accentColor} />
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (item ? <Post post={item} /> : null)}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      onRefresh={refetch}
      refreshing={isRefetching}
      ListFooterComponent={
        isFetchingNextPage ? (
          <ActivityIndicator style={styles.footer} color={accentColor} />
        ) : null
      }
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
  footer: {
    paddingVertical: Spacing.lg,
  },
});
