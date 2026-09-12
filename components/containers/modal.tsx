import { IconButton } from '@/components/molecules/icon-button';
import { Spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ReactNode } from 'react';
import {
    Pressable,
    Modal as RNModal,
    ModalProps as RNModalProps,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';

export type ModalProps = Readonly<
  Omit<RNModalProps, 'children'> & {
    visible: boolean;
    onClose: () => void;
    children?: ReactNode;
    showCloseButton?: boolean;
    contentStyle?: StyleProp<ViewStyle>;
    overlayStyle?: StyleProp<ViewStyle>;
  }
>;

export function Modal({
  visible,
  onClose,
  children,
  showCloseButton = true,
  contentStyle,
  overlayStyle,
  animationType = 'fade',
  transparent = true,
  ...props
}: ModalProps) {
  const surfaceColor = useThemeColor('surface');
  const borderColor = useThemeColor('border');

  return (
    <RNModal
      visible={visible}
      transparent={transparent}
      animationType={animationType}
      onRequestClose={onClose}
      {...props}
    >
      <Pressable
        style={[styles.modalOverlay, overlayStyle]}
        onPress={onClose}
      >
        <Pressable
          style={[
            styles.modalContent,
            { backgroundColor: surfaceColor, borderColor },
            contentStyle,
          ]}
          onPress={(e) => e.stopPropagation()}
        >
          {showCloseButton && (
            <View style={styles.modalHeader}>
              <IconButton
                name="x"
                size="sm"
                variant="muted"
                onPress={onClose}
              />
            </View>
          )}
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
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
});
