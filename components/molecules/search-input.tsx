import { Icon } from '@/components/atoms/icon';
import { Spacing, Typography } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import {
  StyleSheet,
  TextInput,
  View
} from 'react-native';

type SearchInputProps = {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
};

export function SearchInput({
  placeholder = 'Search...',
  value,
  onChangeText,
}: Readonly<SearchInputProps>) {
  const backgroundColor = useThemeColor('surface');
  const borderColor = useThemeColor('border');
  const textColor = useThemeColor('default');
  const mutedColor = useThemeColor('muted');

  return (
    <View
      style={[
        styles.searchContainer,
        {
          backgroundColor,
          borderColor,
        },
      ]}
    >
      <Icon name="search" size="md" colorName="muted" />
      <TextInput
        style={[
          Typography.input,
          {
            color: textColor,
            outline: 'none'
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={mutedColor}
        value={value}
        onChangeText={onChangeText}
        editable
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    gap: Spacing.sm,
  }
});
