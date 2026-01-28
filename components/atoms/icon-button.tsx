import { IconSize, IconVariant, Spacing } from '@/constants/theme';
import { ColorName } from "@/constants/theme/colors";
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
  variant = 'default',
  disabled = false,
  style,
  props
}: Readonly<Props>) {
  const [colorName, backgroundColorName] = getColors(variant);
  const backgroundColor = useThemeColor(backgroundColorName);

  return (
    <Pressable
      disabled={disabled}
      accessibilityRole="button"
      style={(state) => [
        {
          padding: Spacing[size] / 2,
          backgroundColor: backgroundColor + opacityToHex(getBgOpacity(state)),
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

function getColors(variant: IconVariant) {
  return {
    default: ['icon', 'icon'],
    muted: ['muted', 'muted'],
    accent: ['accent', 'accent'],
  }[variant] as [ColorName, ColorName];
}

function getBgOpacity(state: PressableStateCallbackType) {
  if (state.pressed) return 0.25;
  if (state.hovered) return 0.15;
  return 0;
}