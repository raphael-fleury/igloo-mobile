import { Spacing } from '@/constants/theme';
import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { IconButton } from './icon-button';
import { SearchInput } from './search-input';

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
  return (
    <View style={styles.container}>
      <SearchInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
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
});
