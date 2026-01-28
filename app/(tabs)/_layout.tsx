import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/atoms/haptic-tab';
import { Icon, IconName } from '@/components/atoms/icon';
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
          tabBarIcon: getIcon('home')
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: getIcon('search')
        }}
      />
    </Tabs>
  );
}

type IconProps = Readonly<{ focused: boolean }>;

function getIcon(iconName: IconName) {
  return ({ focused }: IconProps) => (
    <Icon size="sm" name={iconName} colorName={focused ? "tabIconSelected" : "tabIconDefault"} />
  )
}