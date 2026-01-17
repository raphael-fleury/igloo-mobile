import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/atoms/haptic-tab';
import { IconSymbol } from '@/components/atoms/icon-symbol';
import { Spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Platform, useWindowDimensions } from 'react-native';

export default function TabLayout() {
  const backgroundColor = useThemeColor('background');
  const activeTabColor = useThemeColor("tabIconSelected");

  const { width } = useWindowDimensions();
  const isLargeScreen = Platform.OS === 'web' && width >= 1024;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeTabColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarPosition: isLargeScreen ? 'left' : 'bottom',
        tabBarStyle: [
          { backgroundColor },
          isLargeScreen && {
            minWidth: 0
          }
        ],
        tabBarItemStyle: [
          { padding: Spacing.xs }
        ],
        tabBarLabelStyle: {
          display: 'none'
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <IconSymbol size="lg" name="house.fill" colorName={focused ? "tabIconSelected" : "tabIconDefault"} />
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => <IconSymbol size="lg" name="magnifyingglass" colorName={focused ? "tabIconSelected" : "tabIconDefault"} />
        }}
      />
    </Tabs>
  );
}
