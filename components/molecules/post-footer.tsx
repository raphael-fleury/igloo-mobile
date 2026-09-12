import { Text } from '@/components/atoms/text';
import { Popover } from '@/components/containers/popover';
import { IconButton } from '@/components/molecules/icon-button';
import { TextButton } from '@/components/molecules/text-button';
import { env } from '@/constants/env';
import { Spacing } from '@/constants/theme';
import { FeedItem } from '@/services/api-types';
import * as Clipboard from 'expo-clipboard';
import { ComponentProps, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

type PostFooterProps = {
  post: FeedItem;
  isLiked: boolean;
  isReposted: boolean;
  onLikePress: () => void;
  onRepostPress: () => void;
  onReplyPress: () => void;
};

export function PostFooter({
  post,
  isLiked,
  isReposted,
  onLikePress,
  onRepostPress,
  onReplyPress,
}: Readonly<PostFooterProps>) {
  const postUrl = `${env.WEB_BASE_URL}/posts/${post.id}`;
  
  const [isSharePopoverOpen, setIsSharePopoverOpen] = useState(false);
  const [sharePopoverPosition, setSharePopoverPosition] = useState({ top: 0, left: 0 });
  const shareButtonRef = useRef<View>(null);

  const [isRepostPopoverOpen, setIsRepostPopoverOpen] = useState(false);
  const [repostPopoverPosition, setRepostPopoverPosition] = useState({ top: 0, left: 0 });
  const repostButtonRef = useRef<View>(null);

  const handleRepostButtonPress = () => {
    if (isRepostPopoverOpen) {
      setIsRepostPopoverOpen(false);
      return;
    }

    repostButtonRef.current?.measureInWindow((x, y, width, height) => {
      setRepostPopoverPosition({
        top: y + height + Spacing.xs,
        left: Math.max(Spacing.sm, x + width - 140),
      });
      setIsRepostPopoverOpen(true);
    });
  };

  const handleSharePress = () => {
    if (isSharePopoverOpen) {
      setIsSharePopoverOpen(false);
      return;
    }

    shareButtonRef.current?.measureInWindow((x, y, width, height) => {
      setSharePopoverPosition({
        top: y + height + Spacing.xs,
        left: Math.max(Spacing.sm, x + width - 140),
      });
      setIsSharePopoverOpen(true);
    });
  };

  return (
    <>
      <View style={styles.footer}>
        <PostAction
          icon="message-circle"
          count={post.replies}
          onPress={onReplyPress}
        />
        <View ref={repostButtonRef} collapsable={false}>
          <PostAction
            icon="repeat"
            count={post.reposts + post.quotes}
            active={isReposted}
            onPress={handleRepostButtonPress}
          />
        </View>
        <PostAction
          icon="heart"
          count={post.likes}
          active={isLiked}
          onPress={onLikePress}
        />
        <View ref={shareButtonRef} collapsable={false}>
          <PostAction
            icon="share"
            active={isSharePopoverOpen}
            onPress={handleSharePress}
          />
        </View>
      </View>

      <Popover
        visible={isRepostPopoverOpen}
        onClose={() => setIsRepostPopoverOpen(false)}
        position={repostPopoverPosition}
      >
        <TextButton
          icon="repeat"
          text={isReposted ? 'Undo repost' : 'Repost'}
          variant="default"
          textVariant="caption"
          onPress={() => {
            setIsRepostPopoverOpen(false);
            onRepostPress();
          }}
        />
        <TextButton
          icon="edit-3"
          text="Quote"
          variant="default"
          textVariant="caption"
          onPress={() => {
            setIsRepostPopoverOpen(false);
          }}
        />
        <TextButton
          icon="list"
          text="See quotes"
          variant="default"
          textVariant="caption"
          onPress={() => {
            setIsRepostPopoverOpen(false);
          }}
        />
      </Popover>

      <Popover
        visible={isSharePopoverOpen}
        onClose={() => setIsSharePopoverOpen(false)}
        position={sharePopoverPosition}
      >
        <TextButton
          icon="link"
          text="Copy link"
          variant="default"
          textVariant="caption"
          onPress={async () => {
            setIsSharePopoverOpen(false);
            if (postUrl) {
              await Clipboard.setStringAsync(postUrl);
            }
          }}
        />
      </Popover>
    </>
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
