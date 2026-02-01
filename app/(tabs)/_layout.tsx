import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';

import { IconName } from '@/components/atoms/icon';
import { CustomTabBar, TabItem } from '@/components/organisms/tab-bar';
import { Breakpoints } from '@/constants/theme';

export default function TabLayout() {
  const { width } = useWindowDimensions();
  const isMediumScreen = width >= Breakpoints.md;
  const [activeTab, setActiveTab] = useState('index');

  const primaryTabs = [
    { page: 'index', title: 'Home', icon: 'home' as IconName },
    { page: 'explore', title: 'Explore', icon: 'search' as IconName },
    { page: 'profile', title: 'Profile', icon: 'user' as IconName },
  ] as TabItem[];

  const secondaryTabs = [
    { page: 'configuration', title: 'Configuration', icon: 'settings' as IconName },
    { title: 'Logout', icon: 'log-out' as IconName, onPress: handleLogout },
  ] as TabItem[];

  function handleLogout() {
    console.log('logout');
  }

  return (
    <Tabs
      tabBar={
        (props) => (
          <CustomTabBar
            primaryTabs={primaryTabs}
            secondaryTabs={secondaryTabs}
            activeTab={activeTab}
            onTabPress={(page) => {
              const tab = secondaryTabs.find(t => t.page === page) || primaryTabs.find(t => t.page === page);
              if (tab?.onPress) {
                tab.onPress();
              }
              if (page) {
                props.navigation.navigate(page);
                setActiveTab(page);
              }
            }}
          />
        )
      }
      screenOptions={{
        headerShown: false,
        tabBarPosition: isMediumScreen ? 'left' : 'bottom'
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
        listeners={{
          tabPress: () => setActiveTab('index'),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
        }}
        listeners={{
          tabPress: () => setActiveTab('explore'),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
        listeners={{
          tabPress: () => setActiveTab('profile'),
        }}
      />
      <Tabs.Screen
        name="configuration"
        options={{
          title: 'Configuration',
        }}
        listeners={{
          tabPress: () => setActiveTab('configuration'),
        }}
      />
    </Tabs>
  );
}