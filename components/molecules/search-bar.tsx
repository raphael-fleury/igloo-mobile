import { Icon } from '@/components/atoms/icon';
import { Spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import {
    StyleSheet,
    TextInput,
    View
} from 'react-native';
import { IconButton } from './icon-button';

type SearchBarProps = {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onFilterPress?: () => void;
};

export function SearchBar({
  placeholder = 'Search...',
  value,
  onChangeText,
  onFilterPress,
}: Readonly<SearchBarProps>) {
  const backgroundColor = useThemeColor('surface');
  const borderColor = useThemeColor('border');
  const textColor = useThemeColor('default');
  const mutedColor = useThemeColor('muted');

  return (
    <View style={[styles.container, { backgroundColor: 'transparent' }]}>
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
            styles.input,
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
      <IconButton
        name="sliders"
        variant="default"
        size="md"
        onPress={onFilterPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'System',
  },
});
