import { IconSize, IconVariant, Spacing } from '@/constants/theme';
import { Feather } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { Pressable, PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { Icon } from './icon';

type FeatherIconName = ComponentProps<typeof Feather>['name'];

type Props = {
  name: FeatherIconName;
  variant: IconVariant;
  size?: keyof typeof IconSize;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  props?: Omit<ComponentProps<typeof Pressable>, 'disabled' | 'style' | 'accessibilityRole'>;
};

export function IconButton({
  name,
  size = 'md',
  variant,
  disabled = false,
  style,
  props
}: Readonly<Props>) {
  const colorName = variant === 'default' ? 'icon' : variant;
  const backgroundColor = useThemeColor(colorName);

  const getOpacity = ({ pressed, hovered }: PressableStateCallbackType) => {
    if (pressed) return 0.1;
    if (hovered) return 0.05;
    return 0;
  }

  return (
    <Pressable
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed, hovered }) => [
        {
          padding: Spacing[size] / 2,
          backgroundColor: backgroundColor + opacityToHex(getOpacity({ pressed, hovered })),
          borderRadius: (IconSize[size] + Spacing[size]) / 2,
          alignItems: 'center',
          justifyContent: 'center'
        },
        disabled && { opacity: 0.5 },
        style,
      ]}
      {...props}
    >
      <Icon name={name} size={size} colorName={colorName} />
    </Pressable>
  );
}

function opacityToHex(opacity: number): string {
  const clamped = Math.min(1, Math.max(0, opacity));
  const hex = Math.round(clamped * 255).toString(16);
  return hex.padStart(2, '0').toUpperCase();
}
