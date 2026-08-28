import { Text } from '@/components/atoms/text';
import { Spacing, Typography } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import {
    StyleSheet,
    TextInput,
    TextInputProps,
    View,
} from 'react-native';

type TextInputFieldProps = TextInputProps & {
  label?: string;
  error?: string;
};

export function TextInputField({
  label,
  error,
  style,
  ...props
}: Readonly<TextInputFieldProps>) {
  const textColor = useThemeColor('default');
  const backgroundColor = useThemeColor('surface');
  const errorColor = useThemeColor('error'); 
  const borderColor = useThemeColor('border');
  const mutedColor = useThemeColor('muted');

  return (
    <View style={styles.container}>
      {!!label && (
        <Text variant="label" colorName="default" style={[
            styles.label,
            error && { color: errorColor }
        ]}>
          {label}
        </Text>
      )}

      <TextInput
        style={[
          styles.input,
          {
            color: textColor,
            backgroundColor,
            borderColor,
          },
          error && { borderColor: errorColor },
          style,
        ]}
        placeholderTextColor={mutedColor}
        {...props}
      />

      {!!error && (
        <Text variant="caption" colorName="error" style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    marginBottom: Spacing.xs,
    display: 'flex',
  },
  input: {
    ...Typography.input,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderRadius: 8,
    outline: 'none',
  },
  error: {
    marginTop: Spacing.xs,
  },
});
