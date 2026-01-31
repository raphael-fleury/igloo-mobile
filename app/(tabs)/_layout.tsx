import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';

import { IconName } from '@/components/atoms/icon';
import { CustomTabBar } from '@/components/organisms/tab-bar';
import { Breakpoints } from '@/constants/theme';

export default function TabLayout() {
  const { width } = useWindowDimensions();
  const isMediumScreen = width >= Breakpoints.md;
  const [activeTab, setActiveTab] = useState('index');

  const tabItems = [
    { name: 'index', title: 'Home', icon: 'home' as IconName },
    { name: 'explore', title: 'Explore', icon: 'search' as IconName },
    { name: 'profile', title: 'Profile', icon: 'user' as IconName },
    { name: 'configuration', title: 'Configuration', icon: 'settings' as IconName },
    { name: 'logout', title: 'Logout', icon: 'log-out' as IconName, onPress: handleLogout },
  ];

  function handleLogout() {
    console.log('logout');
  }

  return (
    <Tabs
      tabBar={
        (props) => (
          <CustomTabBar
            tabs={tabItems}
            activeTab={activeTab}
            onTabPress={(tabName) => {
              setActiveTab(tabName);
              const tab = tabItems.find(t => t.name === tabName);
              if (tab?.onPress) {
                tab.onPress();
              } else {
                props.navigation.navigate(tabName);
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