import { Text } from '@/components/atoms/text';
import { SearchInput } from '@/components/molecules/search-input';
import { Spacing } from '@/constants/theme';
import { useActiveTab } from '@/contexts/active-tab';
import { useThemeColor } from '@/hooks/use-theme-color';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

export type SidebarSectionItem = {
  id: string;
  label: string;
  badge?: number;
};

type SidebarSectionProps = {
  title: string;
  items: SidebarSectionItem[];
  onItemPress?: (itemId: string) => void;
};

function SidebarSection({
  title,
  items,
  onItemPress,
}: Readonly<SidebarSectionProps>) {
  const surfaceColor = useThemeColor('surface');
  const borderColor = useThemeColor('border');
  const defaultColor = useThemeColor('default');
  const mutedColor = useThemeColor('muted');
  const accentColor = useThemeColor('accent');

  return (
    <View style={[styles.section, { borderColor, backgroundColor: surfaceColor }]}>
      <Text
        variant="title"
        colorName="default"
        style={{ fontWeight: '600', marginBottom: Spacing.md }}
      >
        {title}
      </Text>
      <View style={{ gap: Spacing.sm }}>
        {items.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Text variant="body" colorName="muted" style={{ flex: 1 }}>
              {item.label}
            </Text>
            {item.badge !== undefined && (
              <View style={[styles.badge, { backgroundColor: accentColor }]}>
                <Text
                  variant="caption"
                  colorName="default"
                  style={{ fontWeight: '600', color: 'white' }}
                >
                  {item.badge > 99 ? '99+' : item.badge}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

type RightSidebarProps = {
  sections: Array<{
    title: string;
    items: SidebarSectionItem[];
    onItemPress?: (itemId: string) => void;
  }>;
};

export function RightSidebar({ sections }: Readonly<RightSidebarProps>) {
  const backgroundColor = useThemeColor('background');
  const borderColor = useThemeColor('border');
  const activeTab = useActiveTab();
  const [searchQuery, setSearchQuery] = useState('');
  const showSearchBar = activeTab !== 'explore';

  return (
    <ScrollView
      style={[styles.container, { backgroundColor, borderColor }]}
      showsVerticalScrollIndicator={false}
    >
      {showSearchBar && (
        <View style={styles.searchBarWrapper}>
          <SearchInput
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      )}
      <View style={styles.content}>
        {sections.map((section, index) => (
          <SidebarSection
            key={`${section.title}-${index}`}
            title={section.title}
            items={section.items}
            onItemPress={section.onItemPress}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderLeftWidth: 1,
  },
  searchBarWrapper: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
  content: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.lg,
  },
  section: {
    padding: Spacing.md,
    borderRadius: 8,
    borderWidth: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 12,
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
