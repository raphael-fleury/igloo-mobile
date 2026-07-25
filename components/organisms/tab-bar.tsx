import { IconName } from '@/components/atoms/icon';
import { Nav } from '@/components/containers/nav';
import { IconButton } from '@/components/molecules/icon-button';
import { TextButton } from '@/components/molecules/text-button';
import { SettingsMenu } from '@/components/organisms/settings-menu';
import { Breakpoints, Spacing } from '@/constants/theme';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  useWindowDimensions
} from 'react-native';

export type TabItem = {
  page?: string;
  title: string;
  icon: IconName;
  onPress?: () => void;
};

type TabBarProps = {
  primaryTabs: TabItem[];
  secondaryTabs: TabItem[];
  activeTab?: string;
  onTabPress: (tabName?: string) => void;
};

export function CustomTabBar({ primaryTabs, secondaryTabs, activeTab, onTabPress }: Readonly<TabBarProps>) {
  const { width } = useWindowDimensions();
  const [menuVisible, setMenuVisible] = useState(false);

  const isMediumScreen = width >= Breakpoints.md;
  const isLargeScreen = width >= Breakpoints.lg;
  const isHorizontal = !isMediumScreen;

  return (
    <Nav horizontal={isHorizontal} style={[isLargeScreen && { width: width / 4 }]}>
      <ScrollView
        horizontal={isHorizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          isHorizontal ? styles.horizontalContent : styles.verticalContent
        }
      >
        {primaryTabs.map((tab) => (
          <TabButton
            key={tab.page}
            tab={tab}
            isActive={activeTab === tab.page}
            isLarge={isLargeScreen}
            onPress={() => {
              onTabPress(tab.page);
              tab.onPress?.();
            }}
          />
        ))}

        {isHorizontal && (
          <IconButton
            name="menu"
            variant="default"
            size="md"
            onPress={() => setMenuVisible(true)}
          />
        )}
      </ScrollView>

      {!isHorizontal && secondaryTabs.map((tab) => (
        <TabButton
          key={tab.page}
          tab={tab}
          isActive={activeTab === tab.page}
          isLarge={isLargeScreen}
          onPress={() => {
            onTabPress(tab.page);
            tab.onPress?.();
          }}
        />
      ))}

      {isHorizontal && (
        <SettingsMenu
          visible={menuVisible}
          onClose={() => setMenuVisible(false)}
          tabs={secondaryTabs}
          activeTab={activeTab}
          onTabPress={(page) => {
            onTabPress(page);
            setMenuVisible(false);
            const tab = secondaryTabs.find(t => t.page === page);
            tab?.onPress?.();
          }}
        />
      )}
    </Nav>
  )
}

type TabButtonProps = {
  tab: TabItem;
  isActive: boolean;
  isLarge: boolean;
  onPress: () => void;
};

function TabButton({ tab, isActive, isLarge, onPress }: Readonly<TabButtonProps>) {
  return isLarge ? (
    <TextButton
      icon={tab.icon}
      text={tab.title}
      variant={isActive ? 'accent' : 'default'}
      textVariant='body'
      buttonStyle={{ padding: Spacing.md / 2, gap: Spacing.md }}
      onPress={onPress}
    />
  ) : (
    <IconButton
      name={tab.icon}
      variant={isActive ? 'accent' : 'default'}
      size="md"
      onPress={onPress}
    />
  );
}

const styles = StyleSheet.create({
  horizontalContent: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  verticalContent: {
    gap: Spacing.xs
  }
});
