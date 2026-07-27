import { Text } from '@/components/atoms/text';
import { Spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

export type TabItem = {
  id: string;
  label: string;
};

type TabsProps = {
  tabs: TabItem[];
  activeTabId: string;
  onTabPress: (tabId: string) => void;
  style?: StyleProp<ViewStyle>;
  centered?: boolean;
};

export function Tabs({
  tabs,
  activeTabId,
  onTabPress,
  style,
  centered = false,
}: Readonly<TabsProps>) {
  const accentColor = useThemeColor('accent');
  const defaultColor = useThemeColor('default');
  const borderColor = useThemeColor('divider');

  return (
    <View style={[styles.container, { borderBottomColor: borderColor }, style]}>
      {centered ? (
        <View style={styles.centeredContent}>
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;

            return (
              <Pressable
                key={tab.id}
                onPress={() => onTabPress(tab.id)}
                style={[
                  styles.tab,
                  {
                    borderBottomColor: isActive ? accentColor : 'transparent',
                  },
                ]}
              >
                <Text
                  variant="body"
                  colorName={isActive ? 'accent' : 'muted'}
                  style={{ fontWeight: isActive ? '600' : '400' }}
                >
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;

            return (
              <Pressable
                key={tab.id}
                onPress={() => onTabPress(tab.id)}
                style={[
                  styles.tab,
                  {
                    borderBottomColor: isActive ? accentColor : 'transparent',
                  },
                ]}
              >
                <Text
                  variant="body"
                  colorName={isActive ? 'accent' : 'muted'}
                  style={{ fontWeight: isActive ? '600' : '400' }}
                >
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  centeredContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 2,
  },
});
