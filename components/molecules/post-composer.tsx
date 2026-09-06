import { ProfilePhoto } from '@/components/atoms/profile-photo';
import { IconSize, Spacing, Typography } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import {
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import { TextButton } from './text-button';

type PostComposerProps = {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmitPress?: () => void;
  isLoading?: boolean;
};

export function PostComposer({
  placeholder = 'What\'s on your mind?',
  value,
  onChangeText,
  onSubmitPress,
  isLoading = false,
}: Readonly<PostComposerProps>) {
  const { loggedProfile } = useAuth();
  const textColor = useThemeColor('default');
  const mutedColor = useThemeColor('muted');
  const borderColor = useThemeColor('border');
  const avatarUrl = loggedProfile?.avatarPath
    ? `http://localhost:9000/public/${loggedProfile.avatarPath}`
    : undefined;

  return (
    <View style={[styles.container, { backgroundColor: 'transparent', borderBottomColor: borderColor }]}>
      <View style={[styles.inputWrapper, { borderBottomColor: borderColor }]}>
        <ProfilePhoto imageUrl={avatarUrl} size="md" />
        <TextInput
          style={[
            styles.input,
            {
              color: textColor,
              borderBottomColor: borderColor,
              outline: 'none',
            },
          ]}
          placeholder={placeholder}
          placeholderTextColor={mutedColor}
          value={value}
          onChangeText={onChangeText}
          multiline
          editable={!isLoading}
        />
      </View>
      <TextButton
        variant="accent"
        textVariant="body"
        text="Post"
        icon="send"
        onPress={onSubmitPress}
        disabled={isLoading || !value?.trim()}
        buttonStyle={styles.postButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
    borderBottomWidth: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: Typography.title.fontSize,
    fontFamily: Typography.title.fontFamily,
    textAlignVertical: 'top',
    // borderBottomWidth: 1,
    // minHeight: Typography.title.lineHeight * 3,
    marginTop: Typography.title.lineHeight - IconSize.md,
  },
  postButton: {
    alignSelf: 'flex-end',
  },
});
