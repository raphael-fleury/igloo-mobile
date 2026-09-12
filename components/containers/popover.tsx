import { Spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ReactNode } from 'react';
import {
  Modal as RNModal,
  ModalProps as RNModalProps,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

export type PopoverPosition = {
  top: number;
  left: number;
};

export type PopoverProps = Readonly<
  Omit<RNModalProps, 'children'> & {
    visible: boolean;
    onClose: () => void;
    position: PopoverPosition;
    children?: ReactNode;
    contentStyle?: StyleProp<ViewStyle>;
    overlayStyle?: StyleProp<ViewStyle>;
  }
>;

export function Popover({
  visible,
  onClose,
  position,
  children,
  contentStyle,
  overlayStyle,
  animationType = 'none',
  transparent = true,
  ...props
}: PopoverProps) {
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
        style={[StyleSheet.absoluteFill, overlayStyle]}
        onPress={onClose}
      >
        <View
          style={[
            styles.popoverMenu,
            {
              top: position.top,
              left: position.left,
              backgroundColor: surfaceColor,
              borderColor,
            },
            contentStyle,
          ]}
        >
          {children}
        </View>
      </Pressable>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  popoverMenu: {
    position: 'absolute',
    minWidth: 140,
    borderRadius: Spacing.sm,
    borderWidth: 1,
    padding: Spacing.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
});
