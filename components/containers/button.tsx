import { ButtonVariant, IconSize, Spacing } from "@/constants/theme";
import { ColorName } from "@/constants/theme/colors";
import { useThemeColor } from "@/hooks/use-theme-color";
import { ComponentProps } from "react";
import { Pressable, PressableStateCallbackType, StyleProp, ViewStyle } from "react-native";

export type ButtonProps = Omit<ComponentProps<typeof Pressable>, 'disabled' | 'style' | 'accessibilityRole'> & {
  variant: ButtonVariant;
  size: keyof typeof IconSize;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({ variant, size, disabled, style, ...props }: Readonly<ButtonProps>) {
  const backgroundColor = useThemeColor(getBgColor(variant));
  
  return (
    <Pressable
      disabled={disabled}
      accessibilityRole="button"
      style={(state) => [
        { 
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: backgroundColor + opacityToHex(getBgOpacity(state)),
          borderRadius: Spacing[size],
          padding: Spacing[size],
          gap: Spacing[size],
        },
        disabled && { opacity: 0.5 },
        style
      ]}
      {...props}
    >
    </Pressable>
  );
}

function opacityToHex(opacity: number): string {
  const clamped = Math.min(1, Math.max(0, opacity));
  const hex = Math.round(clamped * 255).toString(16);
  return hex.padStart(2, '0').toUpperCase();
}

function getBgOpacity(state: PressableStateCallbackType) {
  if (state.pressed) return 0.25;
  if (state.hovered) return 0.15;
  return 0;
}

function getBgColor(variant: ButtonVariant) {
  return {
    default: 'icon',
    muted: 'muted',
    accent: 'accent',
  }[variant] as ColorName;
}