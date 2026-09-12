import { IconButton } from '@/components/molecules/icon-button';
import { PostComposer } from '@/components/molecules/post-composer';
import { Spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

type PostComposerModalProps = {
  visible: boolean;
  onClose: () => void;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmitPress?: () => void;
  isLoading?: boolean;
};

export function PostComposerModal({
  visible,
  onClose,
  placeholder,
  value,
  onChangeText,
  onSubmitPress,
  isLoading = false,
}: Readonly<PostComposerModalProps>) {
  const surfaceColor = useThemeColor('surface');
  const borderColor = useThemeColor('border');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable
          style={[
            styles.modalContent,
            { backgroundColor: surfaceColor, borderColor },
          ]}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.modalHeader}>
            <IconButton
              name="x"
              size="sm"
              variant="muted"
              onPress={onClose}
            />
          </View>
          <PostComposer
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            onSubmitPress={onSubmitPress}
            isLoading={isLoading}
            containerStyle={styles.composerInModal}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  modalContent: {
    width: '100%',
    maxWidth: 600,
    borderRadius: Spacing.md,
    borderWidth: 1,
    padding: Spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingTop: Spacing.xs,
  },
  composerInModal: {
    borderBottomWidth: 0,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
});
