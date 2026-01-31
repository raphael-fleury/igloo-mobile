import { IconName } from '@/components/atoms/icon';
import { IconButton } from '@/components/atoms/icon-button';
import { Text } from '@/components/atoms/text';
import { Breakpoints, Spacing, Typography } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View
} from 'react-native';

type TabItem = {
  name: string;
  title: string;
  icon: IconName;
  onPress?: () => void;
};

type TabBarProps = {
  tabs: TabItem[];
  activeTab?: string;
  onTabPress?: (tabName: string) => void;
};

export function CustomTabBar({ tabs, activeTab, onTabPress }: Readonly<TabBarProps>) {
  const { width } = useWindowDimensions();

  const isMediumScreen = width >= Breakpoints.md;
  const isLargeScreen = width >= Breakpoints.lg;
  const isHorizontal = !isMediumScreen;

  if (isHorizontal) {
    return (
      <HorizontalTabBar
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={onTabPress}
      />
    );
  }

  return (
    <VerticalTabBar
      tabs={tabs}
      activeTab={activeTab}
      onTabPress={onTabPress}
      isLargeScreen={isLargeScreen}
    />
  );
}

type HorizontalTabBarProps = {
  tabs: TabItem[];
  activeTab?: string;
  onTabPress?: (tabName: string) => void;
};

function HorizontalTabBar({ tabs, activeTab, onTabPress }: Readonly<HorizontalTabBarProps>) {
  const [menuVisible, setMenuVisible] = useState(false);

  const backgroundColor = useThemeColor('background');
  const activeTabColor = useThemeColor('tabIconSelected');
  const inactiveTabColor = useThemeColor('tabIconDefault');
  const borderColor = useThemeColor('border');

  const regularTabs = tabs.filter(tab => !['configuration', 'logout'].includes(tab.name));
  const settingsTabs = tabs.filter(tab => ['configuration', 'logout'].includes(tab.name));

  return (
    <>
      <View style={[styles.horizontalContainer, { backgroundColor, borderTopColor: borderColor }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalContent}
        >
          {regularTabs.map((tab) => (
            <HorizontalTabButton
              key={tab.name}
              tab={tab}
              isActive={activeTab === tab.name}
              activeColor={activeTabColor}
              inactiveColor={inactiveTabColor}
              onPress={() => {
                onTabPress?.(tab.name);
                tab.onPress?.();
              }}
            />
          ))}

          <Pressable
            onPress={() => setMenuVisible(true)}
            style={[styles.horizontalTabButton]}
          >
            <IconButton
              name="menu"
              variant="default"
              size="md"
              onPress={() => setMenuVisible(true)}
            />
          </Pressable>
        </ScrollView>
      </View>

      <SettingsMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        tabs={settingsTabs}
        activeTab={activeTab}
        activeColor={activeTabColor}
        inactiveColor={inactiveTabColor}
        onTabPress={(tabName) => {
          onTabPress?.(tabName);
          setMenuVisible(false);
          const tab = settingsTabs.find(t => t.name === tabName);
          tab?.onPress?.();
        }}
      />
    </>
  );
}

type VerticalTabBarProps = {
  tabs: TabItem[];
  activeTab?: string;
  onTabPress?: (tabName: string) => void;
  isLargeScreen: boolean;
};

function VerticalTabBar({ tabs, activeTab, onTabPress, isLargeScreen }: Readonly<VerticalTabBarProps>) {
  const backgroundColor = useThemeColor('background');
  const activeTabColor = useThemeColor('tabIconSelected');
  const inactiveTabColor = useThemeColor('tabIconDefault');
  const borderColor = useThemeColor('border');

  return (
    <View style={[styles.verticalContainer, { backgroundColor, borderColor }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.verticalContent,
          isLargeScreen && { paddingRight: Spacing.lg }
        ]}
      >
        {tabs.filter(tab => tab.name !== 'logout').map((tab) => (
          <VerticalTabButton
            key={tab.name}
            tab={tab}
            isActive={activeTab === tab.name}
            isLarge={isLargeScreen}
            activeColor={activeTabColor}
            inactiveColor={inactiveTabColor}
            onPress={() => {
              onTabPress?.(tab.name);
              tab.onPress?.();
            }}
          />
        ))}
      </ScrollView>

      {/* Logout button at bottom */}
      {tabs.find(tab => tab.name === 'logout') && (
        <VerticalTabButton
          tab={tabs.find(tab => tab.name === 'logout')!}
          isActive={activeTab === 'logout'}
          isLarge={isLargeScreen}
          activeColor={activeTabColor}
          inactiveColor={inactiveTabColor}
          onPress={() => {
            const logoutTab = tabs.find(tab => tab.name === 'logout');
            onTabPress?.('logout');
            logoutTab?.onPress?.();
          }}
        />
      )}
    </View>
  );
}

type TabButtonProps = {
  tab: TabItem;
  isActive: boolean;
  activeColor: string;
  inactiveColor: string;
  onPress: () => void;
};

function HorizontalTabButton({
  tab,
  isActive,
  activeColor,
  inactiveColor,
  onPress,
}: Readonly<TabButtonProps>) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.horizontalTabButton,
        isActive && [styles.horizontalTabButtonActive, { borderBottomColor: activeColor }]
      ]}
    >
      <IconButton
        name={tab.icon}
        variant={isActive ? 'accent' : 'default'}
        size="md"
        onPress={onPress}
      />
    </Pressable>
  );
}

type VerticalTabButtonProps = TabButtonProps & {
  isLarge: boolean;
};

function VerticalTabButton({
  tab,
  isActive,
  isLarge,
  activeColor,
  inactiveColor,
  onPress,
}: Readonly<VerticalTabButtonProps>) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.verticalTabButton,
        isActive && [styles.verticalTabButtonActive, { borderLeftColor: activeColor }]
      ]}
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
            { color: isActive ? activeColor : inactiveColor }
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
  activeColor: string;
  inactiveColor: string;
  onPress: () => void;
};

function SettingsMenuItem({
  tab,
  isActive,
  activeColor,
  inactiveColor,
  onPress,
}: Readonly<SettingsMenuItemProps>) {
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
  activeColor: string;
  inactiveColor: string;
  onTabPress: (tabName: string) => void;
};

function SettingsMenu({
  visible,
  onClose,
  tabs,
  activeTab,
  activeColor,
  inactiveColor,
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
              key={tab.name}
              tab={tab}
              isActive={activeTab === tab.name}
              activeColor={activeColor}
              inactiveColor={inactiveColor}
              onPress={() => onTabPress(tab.name)}
            />
          ))}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  // Horizontal Layout
  horizontalContainer: {
    paddingHorizontal: Spacing.sm,
    borderTopWidth: 1
  },
  horizontalContent: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  horizontalTabButton: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.xs,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  horizontalTabButtonActive: {
    borderBottomWidth: 3,
  },

  // Vertical Layout
  verticalContainer: {
    paddingVertical: Spacing.sm,
    justifyContent: 'space-between',
    borderRightWidth: 1,
    width: 'auto',
  },
  verticalContent: {
    paddingHorizontal: Spacing.xs
  },
  verticalTabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.xs,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
    gap: Spacing.sm,
  },
  verticalTabButtonActive: {
    borderLeftWidth: 3,
  },
  tabLabel: {
    flexShrink: 1,
  },

  // Modal Menu
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  menuContent: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
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
    borderRadius: 8,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
  },
  menuItemText: {
    flex: 1,
  },
});
