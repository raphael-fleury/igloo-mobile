import { ProfilePhoto } from '@/components/atoms/profile-photo';
import { Text } from '@/components/atoms/text';
import { PostFooter } from '@/components/molecules/post-footer';
import { env } from '@/constants/env';
import { Spacing } from '@/constants/theme';
import {
  useCreatePost,
  useLikePost,
  useRepostPost,
  useUnlikePost,
  useUnrepostPost,
} from '@/hooks/use-posts';
import { useThemeColor } from '@/hooks/use-theme-color';
import { FeedItem } from '@/services/api-types';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal } from '../containers/modal';
import { PostComposer } from '../molecules/post-composer';

type PostProps = {
  post: FeedItem;
};

// TODO: Update like and repost counts when the user likes or reposts a post, instead of just toggling the state.
// TODO: Showing interaction counts as "10k", "1.2M", etc. instead of the exact number, when the counts are large.
// TODO: Show quoted post.
// TODO: Implement quote functionality for posts.
// TODO: Implement "See quotes" functionality for posts.
// TODO: Implement profile links.
export function Post({ post }: Readonly<PostProps>) {
  const borderColor = useThemeColor('border');
  const avatarUrl = post.profile.avatarPath
    ? `${env.STORAGE_BASE_URL}/public/${post.profile.avatarPath}`
    : undefined;

  const [isLiked, setIsLiked] = useState(post.isLiked ?? false);
  const [isReposted, setIsReposted] = useState(post.isReposted ?? false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const { mutate: likePost } = useLikePost();
  const { mutate: unlikePost } = useUnlikePost();
  const { mutate: repostPost } = useRepostPost();
  const { mutate: unrepostPost } = useUnrepostPost();
  const { mutate: createPost, isPending: isCreatingReply } = useCreatePost();

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

  const handleReplySubmit = () => {
    if (!replyContent.trim()) return;

    createPost(
      { content: replyContent.trim(), repliedPostId: post.id },
      {
        onSuccess: () => {
          setReplyContent('');
          setIsReplyModalOpen(false);
        },
      }
    );
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
          <Text variant="caption" colorName="muted">
            ·
          </Text>
          <Text variant="caption" colorName="muted">
            {formatPostDate(post.createdAt)}
          </Text>
        </View>
        {post.repliedPost && (
          <Text variant="caption" colorName="muted">
            Replying to @{post.repliedPost.profile.username}
          </Text>
        )}
        <Text variant="body">{post.content}</Text>
        <PostFooter
          post={post}
          isLiked={isLiked}
          isReposted={isReposted}
          onLikePress={handleLikePress}
          onRepostPress={handleRepostPress}
          onReplyPress={() => setIsReplyModalOpen(true)}
        />
      </View>

      <Modal
        visible={isReplyModalOpen}
        onClose={() => setIsReplyModalOpen(false)}
      >
        <PostComposer
          placeholder={`Reply to @${post.profile.username}`}
          value={replyContent}
          onChangeText={setReplyContent}
          onSubmitPress={handleReplySubmit}
          isLoading={isCreatingReply}
          containerStyle={styles.composerInModal}
        />
      </Modal>
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
  composerInModal: {
    borderBottomWidth: 0,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
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

