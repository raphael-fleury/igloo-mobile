import { ProfilePhoto } from '@/components/atoms/profile-photo';
import { QuotedPost } from '@/components/molecules/quoted-post';
import { TextButton } from '@/components/molecules/text-button';
import { env } from '@/constants/env';
import { IconSize, Spacing, Typography } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';
import { useCreatePost } from '@/hooks/use-posts';
import { useThemeColor } from '@/hooks/use-theme-color';
import { PostDetailed } from '@/services/api-types';
import React, { useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';

type PostComposerProps = {
  repliedPost?: PostDetailed;
  quotedPost?: PostDetailed;
  containerStyle?: StyleProp<ViewStyle>;
  onSuccess?: () => void;
};

export function PostComposer({
  repliedPost,
  quotedPost,
  containerStyle,
  onSuccess,
}: Readonly<PostComposerProps>) {
  const [content, setContent] = useState('');
  const { loggedProfile } = useAuth();
  const textColor = useThemeColor('default');
  const mutedColor = useThemeColor('muted');
  const borderColor = useThemeColor('border');
  const avatarUrl = loggedProfile?.avatarPath
    ? `${env.STORAGE_BASE_URL}/public/${loggedProfile.avatarPath}`
    : undefined;

  const { mutate: createPost, isPending } = useCreatePost();

  const { height: windowHeight } = useWindowDimensions();
  const minInputHeight = Typography.title.lineHeight;
  const maxInputHeight = windowHeight * 0.5;
  const [inputHeight, setInputHeight] = React.useState(minInputHeight);

  const placeholder = repliedPost
    ? `Reply to @${repliedPost.profile.username}`
    : "What's on your mind?";

  const handleSubmit = () => {
    const trimmed = content.trim();
    if (!trimmed) return;

    createPost(
      {
        content: trimmed,
        repliedPostId: repliedPost?.id,
        quotedPostId: quotedPost?.id,
      },
      {
        onSuccess: () => {
          setContent('');
          onSuccess?.();
        },
      }
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: 'transparent', borderBottomColor: borderColor },
        containerStyle,
      ]}
    >
      <View style={[styles.inputWrapper, { borderBottomColor: borderColor }]}>
        <ProfilePhoto imageUrl={avatarUrl} size="md" />
        <TextInput
          style={[
            styles.input,
            {
              color: textColor,
              borderBottomColor: borderColor,
              outline: 'none',
              height: Math.min(Math.max(minInputHeight, inputHeight), maxInputHeight),
            },
          ]}
          placeholder={placeholder}
          placeholderTextColor={mutedColor}
          value={content}
          onChangeText={setContent}
          multiline
          scrollEnabled={inputHeight > maxInputHeight}
          onContentSizeChange={(e) => setInputHeight(e.nativeEvent.contentSize.height)}
          editable={!isPending}
        />
      </View>
      {quotedPost && <QuotedPost post={quotedPost} />}
      <TextButton
        variant="accent"
        textVariant="body"
        text="Post"
        icon="send"
        onPress={handleSubmit}
        disabled={isPending || !content.trim()}
        buttonStyle={styles.postButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    gap: Spacing.md,
    borderBottomWidth: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: Typography.title.fontSize,
    fontFamily: Typography.title.fontFamily,
    textAlignVertical: 'top',
    marginTop: Typography.title.lineHeight - IconSize.md,
  },
  postButton: {
    alignSelf: 'flex-end',
  },
});
