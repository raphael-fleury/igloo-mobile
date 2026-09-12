import { ProfilePhoto } from '@/components/atoms/profile-photo';
import { env } from '@/constants/env';
import { IconSize, Spacing, Typography } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import { TextButton } from './text-button';

type PostComposerProps = {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmitPress?: () => void;
  isLoading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

export function PostComposer({
  placeholder = 'What\'s on your mind?',
  value,
  onChangeText,
  onSubmitPress,
  isLoading = false,
  containerStyle,
}: Readonly<PostComposerProps>) {
  const { loggedProfile } = useAuth();
  const textColor = useThemeColor('default');
  const mutedColor = useThemeColor('muted');
  const borderColor = useThemeColor('border');
  const avatarUrl = loggedProfile?.avatarPath
    ? `${env.STORAGE_BASE_URL}/public/${loggedProfile.avatarPath}`
    : undefined;

  const { height: windowHeight } = useWindowDimensions();
  const minInputHeight = Typography.title.lineHeight;
  const maxInputHeight = windowHeight * 0.5;
  const [inputHeight, setInputHeight] = React.useState(minInputHeight);

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
          value={value}
          onChangeText={onChangeText}
          multiline
          scrollEnabled={inputHeight > maxInputHeight}
          onContentSizeChange={(e) => setInputHeight(e.nativeEvent.contentSize.height)}
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
    // borderBottomWidth: 1,
    // minHeight: Typography.title.lineHeight * 3,
    marginTop: Typography.title.lineHeight - IconSize.md,
  },
  postButton: {
    alignSelf: 'flex-end',
  },
});
