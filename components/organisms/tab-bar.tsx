import { IconName } from '@/components/atoms/icon';
import { IconButton } from '@/components/atoms/icon-button';
import { Text } from '@/components/atoms/text';
import { Nav } from '@/components/containers/nav';
import { Breakpoints, Spacing, Typography } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
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
    <Nav horizontal={isHorizontal}>
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

function TabButton({
  tab,
  isActive,
  isLarge,
  onPress,
}: Readonly<TabButtonProps>) {
  const activeTabColor = useThemeColor('tabIconSelected');
  const inactiveTabColor = useThemeColor('tabIconDefault');

  return (
    <Pressable
      onPress={onPress}
      style={styles.tabButton}
    >
      <IconButton
        name={tab.icon}
        variant={isActive ? 'accent' : 'default'}
        size="md"
        onPress={onPress}
      />
      {isLarge && (
        <Text
          style={[
            Typography.body,
            styles.tabLabel,
            { color: isActive ? activeTabColor : inactiveTabColor }
          ]}
        >
          {tab.title}
        </Text>
      )}
    </Pressable>
  );
}

type SettingsMenuItemProps = {
  tab: TabItem;
  isActive: boolean;
  onPress: () => void;
};

function SettingsMenuItem({
  tab,
  isActive,
  onPress,
}: Readonly<SettingsMenuItemProps>) {
  const activeColor = useThemeColor('tabIconSelected');
  const inactiveColor = useThemeColor('tabIconDefault');

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.menuItem,
        isActive && { backgroundColor: `${activeColor}20` }
      ]}
    >
      <IconButton
        name={tab.icon}
        variant={isActive ? 'accent' : 'default'}
        size="md"
      />
      <Text
        style={[
          Typography.body,
          styles.menuItemText,
          { color: isActive ? activeColor : inactiveColor }
        ]}
      >
        {tab.title}
      </Text>
    </Pressable>
  );
}

type SettingsMenuProps = {
  visible: boolean;
  onClose: () => void;
  tabs: TabItem[];
  activeTab?: string;
  onTabPress: (page?: string) => void;
};

function SettingsMenu({
  visible,
  onClose,
  tabs,
  activeTab,
  onTabPress,
}: Readonly<SettingsMenuProps>) {
  const backgroundColor = useThemeColor('background');
  const borderColor = useThemeColor('border');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        style={styles.modalOverlay}
        onPress={onClose}
      >
        <Pressable
          style={[styles.menuContent, { backgroundColor, borderTopColor: borderColor }]}
          onPress={(e) => e.stopPropagation()}
        >
          {tabs.map((tab) => (
            <SettingsMenuItem
              key={tab.page}
              tab={tab}
              isActive={activeTab === tab.page}
              onPress={() => onTabPress(tab.page)}
            />
          ))}
        </Pressable>
      </Pressable>
    </Modal>
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
  },

  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  tabLabel: {
    flexShrink: 1,
    marginRight: Spacing.md,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  menuContent: {
    borderTopLeftRadius: Spacing.md,
    borderTopRightRadius: Spacing.md,
    paddingTop: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.lg,
    borderTopWidth: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: Spacing.sm,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
  },
  menuItemText: {
    flex: 1,
  },
});
