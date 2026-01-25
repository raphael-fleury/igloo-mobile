import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/atoms/haptic-tab';
import { Icon } from '@/components/atoms/icon';
import { Breakpoints, Spacing, Typography } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useWindowDimensions } from 'react-native';

export default function TabLayout() {
  const backgroundColor = useThemeColor('background');
  const activeTabColor = useThemeColor("tabIconSelected");

  const { width } = useWindowDimensions();
  const isMediumScreen = width >= Breakpoints.md;
  const isLargeScreen = width >= Breakpoints.lg;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeTabColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarPosition: isMediumScreen ? 'left' : 'bottom',
        tabBarStyle: [
          { backgroundColor },
          isMediumScreen && { minWidth: 0 }
        ],
        tabBarItemStyle: [
          { padding: Spacing.xs }
        ],
        tabBarLabelStyle: [
          Typography.body,
          !isLargeScreen && { display: 'none' }
        ]
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <Icon size="sm" name="home" colorName={focused ? "tabIconSelected" : "tabIconDefault"} />
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => <Icon size="sm" name="search" colorName={focused ? "tabIconSelected" : "tabIconDefault"} />
        }}
      />
    </Tabs>
  );
}
