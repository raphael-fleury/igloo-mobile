import { Spacing } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Modal, Pressable, StyleSheet } from "react-native";
import { TextButton } from "../molecules/text-button";
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
            <TextButton
              key={tab.title}
              text={tab.title}
              icon={tab.icon}
              variant={activeTab === tab.page ? 'accent' : 'default'}
              textVariant="body"
              onPress={() => onTabPress(tab.page)}
              buttonStyle={styles.menuItem}
            />
          ))}
        </Pressable>
      </Pressable>
    </Modal>
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
    marginBottom: Spacing.sm,
    gap: Spacing.md,
  }
});
