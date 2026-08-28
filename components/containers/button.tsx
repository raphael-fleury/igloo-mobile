import { ButtonVariant, IconSize, Spacing } from "@/constants/theme";
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
  const color = variant === 'link' ? 'accent' : variant;
  const backgroundColor = useThemeColor(color);
  
  return (
    <Pressable
      disabled={disabled}
      accessibilityRole="button"
      style={(state) => [
        { 
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: variant === 'link' ? 'transparent' : backgroundColor + opacityToHex(getBgOpacity(state)),
          borderRadius: Spacing[size] / 2,
          padding: Spacing[size] / 2,
          gap: Spacing[size] / 2,
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
