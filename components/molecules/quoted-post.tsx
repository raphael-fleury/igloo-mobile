import { ProfilePhoto } from '@/components/atoms/profile-photo';
import { Text } from '@/components/atoms/text';
import { env } from '@/constants/env';
import { Spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Post } from '@/services/api-types';
import { StyleSheet, View } from 'react-native';

type QuotedPostProps = {
  post: Post;
};

export function QuotedPost({ post }: Readonly<QuotedPostProps>) {
  const borderColor = useThemeColor('border');
  const avatarUrl = post.profile.avatarPath
    ? `${env.STORAGE_BASE_URL}/public/${post.profile.avatarPath}`
    : undefined;

  return (
    <View style={[styles.container, { borderColor }]}>
      <View style={styles.header}>
        <ProfilePhoto imageUrl={avatarUrl} size="xxs" />
        {Boolean(post.profile.displayName) && (
          <Text variant="body" style={styles.displayName} numberOfLines={1}>
            {post.profile.displayName}
          </Text>
        )}
        {Boolean(post.profile.username) && (
          <Text variant="caption" colorName="muted" numberOfLines={1}>
            @{post.profile.username}
          </Text>
        )}
        {Boolean(post.createdAt) && (
          <>
            <Text variant="caption" colorName="muted">
              ·
            </Text>
            <Text variant="caption" colorName="muted">
              {formatPostDate(post.createdAt)}
            </Text>
          </>
        )}
      </View>
      <Text variant="body">{post.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: Spacing.sm,
    padding: Spacing.md,
    gap: Spacing.xs,
    marginTop: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  displayName: {
    fontWeight: 600,
  },
});

function formatPostDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInSeconds = Math.max(0, Math.floor(diffInMs / 1000));
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    if (diffInMinutes < 1) {
      return '1m';
    }
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    }
    return `${diffInHours}h`;
  }

  const isCurrentYear = date.getFullYear() === now.getFullYear();
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    ...(isCurrentYear ? {} : { year: 'numeric' }),
  });
}
