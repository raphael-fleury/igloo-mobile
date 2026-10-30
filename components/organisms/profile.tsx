import { ProfilePhoto } from '@/components/atoms/profile-photo';
import { Text } from '@/components/atoms/text';
import { Post } from '@/components/organisms/post';
import { env } from '@/constants/env';
import { IconSize, Spacing } from '@/constants/theme';
import { useGetProfilePosts } from '@/hooks/use-posts';
import { useThemeColor } from '@/hooks/use-theme-color';
import type { Profile as ProfileData } from '@/services/api-types';
import { Image } from 'expo-image';
import { useCallback, useMemo } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

type ProfileProps = {
  profile: ProfileData;
};

const HEADER_HEIGHT = 150;
const AVATAR_SIZE = IconSize.xxl * 2;

function toStorageUrl(path?: string | null) {
  return path ? `${env.STORAGE_BASE_URL}/public/${path}` : undefined;
}

export function Profile({ profile }: Readonly<ProfileProps>) {
  const surfaceColor = useThemeColor('surface');
  const backgroundColor = useThemeColor('background');
  const borderColor = useThemeColor('border');
  const accentColor = useThemeColor('accent');
  const headerUrl = toStorageUrl(profile.headerPath);
  const avatarUrl = toStorageUrl(profile.avatarPath);
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useGetProfilePosts(profile.username);
  const posts = useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data]
  );
  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <FlatList
      data={posts}
      keyExtractor={(post) => post.id}
      renderItem={({ item }) => <Post post={item} />}
      ListHeaderComponent={
        <View style={[styles.container, { borderBottomColor: borderColor }]}>
          <View style={[styles.header, { backgroundColor: surfaceColor }]}>
            {!!headerUrl && (
              <Image
                source={headerUrl}
                style={StyleSheet.absoluteFill}
                contentFit="cover"
                accessibilityLabel={`${profile.displayName}'s header`}
              />
            )}
          </View>
          <View style={styles.content}>
            <ProfilePhoto
              imageUrl={avatarUrl}
              size="xxl"
              style={[styles.avatar, { borderColor: backgroundColor }]}
            />
            <View style={styles.names}>
              <Text variant="title" numberOfLines={1}>
                {profile.displayName}
              </Text>
              <Text variant="caption" colorName="muted" numberOfLines={1}>
                @{profile.username}
              </Text>
            </View>
            {!!profile.bio && <Text variant="body">{profile.bio}</Text>}
          </View>
        </View>
      }
      ListEmptyComponent={
        isLoading ? (
          <ActivityIndicator style={styles.status} color={accentColor} />
        ) : isError ? (
          <View style={styles.status}>
            <Text variant="body" colorName="muted">
              Could not load posts.
            </Text>
          </View>
        ) : (
          <View style={styles.status}>
            <Text variant="body" colorName="muted">
              No posts yet.
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
              Could not load more posts.
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
  container: {
    width: '100%',
    borderBottomWidth: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    overflow: 'hidden',
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  avatar: {
    marginTop: -AVATAR_SIZE / 2,
    borderWidth: 4,
  },
  names: {
    gap: Spacing.none,
  },
  status: {
    alignItems: 'center',
    padding: Spacing.xl,
  },
  footer: {
    paddingVertical: Spacing.lg,
  },
});
