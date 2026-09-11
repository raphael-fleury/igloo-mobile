import { ProfilePhoto } from '@/components/atoms/profile-photo';
import { Text } from '@/components/atoms/text';
import { IconButton } from '@/components/molecules/icon-button';
import { Spacing } from '@/constants/theme';
import {
    useLikePost,
    useRepostPost,
    useUnlikePost,
    useUnrepostPost,
} from '@/hooks/use-posts';
import { useThemeColor } from '@/hooks/use-theme-color';
import { FeedItem } from '@/services/api-types';
import { ComponentProps, useState } from 'react';
import { StyleSheet, View } from 'react-native';

type PostProps = {
  post: FeedItem;
};

export function Post({ post }: Readonly<PostProps>) {
  const borderColor = useThemeColor('border');
  const avatarUrl = post.profile.avatarPath
    ? `http://localhost:9000/public/${post.profile.avatarPath}`
    : undefined;

  const [isLiked, setIsLiked] = useState(post.isLiked ?? false);
  const [isReposted, setIsReposted] = useState(post.isReposted ?? false);

  const { mutate: likePost } = useLikePost();
  const { mutate: unlikePost } = useUnlikePost();
  const { mutate: repostPost } = useRepostPost();
  const { mutate: unrepostPost } = useUnrepostPost();

  const handleLikePress = () => {
    const nextIsLiked = !isLiked;
    setIsLiked(nextIsLiked);

    if (nextIsLiked) {
      likePost(post.id, { onError: () => setIsLiked(false) });
    } else {
      unlikePost(post.id, { onError: () => setIsLiked(true) });
    }
  };

  const handleRepostPress = () => {
    const nextIsReposted = !isReposted;
    setIsReposted(nextIsReposted);

    if (nextIsReposted) {
      repostPost(post.id, { onError: () => setIsReposted(false) });
    } else {
      unrepostPost(post.id, { onError: () => setIsReposted(true) });
    }
  };

  return (
    <View style={[styles.container, { borderBottomColor: borderColor }]}>
      <ProfilePhoto imageUrl={avatarUrl} size="md" />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text variant="body" style={styles.displayName} numberOfLines={1}>
            {post.profile.displayName}
          </Text>
          <Text variant="caption" colorName="muted" numberOfLines={1}>
            @{post.profile.username}
          </Text>
        </View>
        <Text variant="body">{post.content}</Text>
        <View style={styles.footer}>
          <PostAction icon="message-circle" count={post.replies} />
          <PostAction
            icon="repeat"
            count={post.reposts + post.quotes}
            active={isReposted}
            onPress={handleRepostPress}
          />
          <PostAction
            icon="heart"
            count={post.likes}
            active={isLiked}
            onPress={handleLikePress}
          />
          <PostAction icon="share" />
        </View>
      </View>
    </View>
  );
}

type PostActionProps = {
  icon: ComponentProps<typeof IconButton>['name'];
  count?: number;
  active?: boolean;
  onPress?: () => void;
};

function PostAction({ icon, count, active, onPress }: Readonly<PostActionProps>) {
  return (
    <View style={styles.action}>
      <IconButton
        name={icon}
        variant={active ? 'accent' : 'muted'}
        size="sm"
        onPress={onPress}
      />
      {count !== undefined && (
        <Text variant="caption" colorName={active ? 'accent' : 'muted'}>
          {count}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Spacing.lg,
    padding: Spacing.lg,
    borderBottomWidth: 1,
  },
  content: {
    flex: 1,
    gap: Spacing.xs,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.xs,
  },
  displayName: {
    fontWeight: 600,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: 320,
    marginTop: Spacing.xs,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
});
