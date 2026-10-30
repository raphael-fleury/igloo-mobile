import { ProfilePhoto } from '@/components/atoms/profile-photo';
import { Text } from '@/components/atoms/text';
import { ProfileLink } from '@/components/molecules/profile-link';
import { PostContent } from '@/components/molecules/post-content';
import { PostFooter } from '@/components/molecules/post-footer';
import { QuotedPost } from '@/components/molecules/quoted-post';
import { env } from '@/constants/env';
import { Spacing } from '@/constants/theme';
import {
  useLikePost,
  useRepostPost,
  useUnlikePost,
  useUnrepostPost,
} from '@/hooks/use-posts';
import { useThemeColor } from '@/hooks/use-theme-color';
import { PostDetailed } from '@/services/api-types';
import { usePathname, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Modal } from '../containers/modal';
import { PostComposer } from './post-composer';

type PostProps = {
  post: PostDetailed;
};

// TODO: Update like and repost counts when the user likes or reposts a post, instead of just toggling the state.
// TODO: Showing interaction counts as "10k", "1.2M", etc. instead of the exact number, when the counts are large.
// TODO: Implement "See quotes" functionality for posts.
export function Post({ post }: Readonly<PostProps>) {
  const router = useRouter();
  const pathname = usePathname();
  const isPostDetail = pathname === `/posts/${post.id}`;
  const borderColor = useThemeColor('border');
  const avatarUrl = post.profile.avatarPath
    ? `${env.STORAGE_BASE_URL}/public/${post.profile.avatarPath}`
    : undefined;

  // The API does not currently report the viewer's like/repost state, so it starts unset.
  const [isLiked, setIsLiked] = useState(false);
  const [isReposted, setIsReposted] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

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
    <Pressable
      style={[styles.container, { borderBottomColor: borderColor }]}
      accessibilityRole={isPostDetail ? undefined : 'link'}
      accessibilityLabel={`View post by ${post.profile.displayName}`}
      disabled={isPostDetail}
      onPress={() => router.push({
        pathname: '/(tabs)/posts/[id]',
        params: { id: post.id },
      })}
    >
      <ProfilePhoto
        imageUrl={avatarUrl}
        size="md"
        accessibilityRole="link"
        accessibilityLabel={`View profile of ${post.profile.displayName}`}
        onPress={(event) => {
          event.stopPropagation();
          router.push({
            pathname: '/profiles/[id]',
            params: { id: post.profile.id },
          });
        }}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <ProfileLink
            profile={post.profile}
            accessibilityLabel={`View profile of ${post.profile.displayName}`}
            variant="body"
            style={styles.displayName}
            numberOfLines={1}
          >
            {post.profile.displayName}
          </ProfileLink>
          <ProfileLink
            profile={post.profile}
            accessibilityLabel={`View profile of ${post.profile.username}`}
            variant="caption"
            colorName="muted"
            numberOfLines={1}
          >
            @{post.profile.username}
          </ProfileLink>
          <Text variant="caption" colorName="muted">
            ·
          </Text>
          <Text variant="caption" colorName="muted">
            {formatPostDate(post.createdAt)}
          </Text>
        </View>
        {!!post.repliedPost && (
          <View style={styles.replyingTo}>
            <Text variant="caption" colorName="muted">
              Replying to{' '}
            </Text>
            <ProfileLink
              profile={post.repliedPost.profile}
              accessibilityLabel={`View profile of ${post.repliedPost.profile.username}`}
              variant="caption"
              colorName="muted"
            >
              @{post.repliedPost.profile.username}
            </ProfileLink>
          </View>
        )}
        <PostContent content={post.content} mentions={post.mentions} />
        {!!post.quotedPost && <QuotedPost post={post.quotedPost} />}
        <Pressable
          accessible={false}
          onPress={(event) => event.stopPropagation()}
        >
          <PostFooter
            post={post}
            isLiked={isLiked}
            isReposted={isReposted}
            onLikePress={handleLikePress}
            onRepostPress={handleRepostPress}
            onReplyPress={() => setIsReplyModalOpen(true)}
            onQuotePress={() => setIsQuoteModalOpen(true)}
          />
        </Pressable>
      </View>

      <Modal
        visible={isReplyModalOpen}
        onClose={() => setIsReplyModalOpen(false)}
      >
        <PostComposer
          repliedPost={post}
          onSuccess={() => setIsReplyModalOpen(false)}
          containerStyle={styles.composerInModal}
        />
      </Modal>

      <Modal
        visible={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      >
        <PostComposer
          quotedPost={post}
          onSuccess={() => setIsQuoteModalOpen(false)}
          containerStyle={styles.composerInModal}
        />
      </Modal>
    </Pressable>
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
  replyingTo: {
    flexDirection: 'row',
    alignItems: 'baseline',
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
