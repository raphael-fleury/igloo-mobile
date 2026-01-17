import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/atoms/haptic-tab';
import { IconSymbol } from '@/components/atoms/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function TabLayout() {
  const activeTabColor = useThemeColor("tabIconSelected");

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeTabColor,
        headerShown: false,
        tabBarButton: HapticTab
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: () => <IconSymbol size="lg" name="house.fill" colorName="tabIconDefault" />
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: '',
          tabBarIcon: () => <IconSymbol size="lg" name="magnifyingglass" colorName="tabIconDefault" />
        }}
      />
    </Tabs>
  );
}
