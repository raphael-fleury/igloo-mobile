import { Spacing, Typography } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Modal, Pressable, StyleSheet } from "react-native";
import { IconButton } from "../atoms/icon-button";
import { Text } from "../atoms/text";
import { TabItem } from "./tab-bar";

type SettingsMenuProps = {
  visible: boolean;
  onClose: () => void;
  tabs: TabItem[];
  activeTab?: string;
  onTabPress: (page?: string) => void;
};

export function SettingsMenu({
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

const styles = StyleSheet.create({
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
