import { Spacing, Typography } from '@/constants/theme';
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
  const textColor = useThemeColor('default');
  const mutedColor = useThemeColor('muted');
  const borderColor = useThemeColor('border');

  return (
    <View style={[styles.container, { backgroundColor: 'transparent', borderBottomColor: borderColor }]}>
      <View style={[styles.inputWrapper, { borderBottomColor: borderColor }]}>
        <TextInput
          style={[
            styles.input,
            {
              color: textColor,
              outline: "none",
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
    borderBottomWidth: 1,
    paddingVertical: Spacing.sm,
  },
  input: {
    fontSize: Typography.input.fontSize,
    fontFamily: Typography.input.fontFamily,
    textAlignVertical: 'top',
    // height: "auto",
  },
  postButton: {
    alignSelf: 'flex-end',
  },
});
