import { ButtonVariant, IconSize } from "@/constants/theme";
import { ColorName } from "@/constants/theme/colors";
import { TextVariant } from "@/constants/theme/typography";
import { ComponentProps } from "react";
import { Pressable, StyleProp, TextStyle, ViewStyle } from "react-native";
import { Icon } from "../atoms/icon";
import { Text } from "../atoms/text";
import { Button } from "../containers/button";
import { IconButton } from "./icon-button";

type ButtonProps = Omit<ComponentProps<typeof Pressable>, 'disabled' | 'style' | 'accessibilityRole'> & {
  variant: ButtonVariant;
  textVariant: TextVariant;
  icon?: ComponentProps<typeof IconButton>['name'];
  text?: string;
  disabled?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function TextButton({
  variant, textVariant, icon, text, disabled, buttonStyle, iconStyle, textStyle, ...props
}: Readonly<ButtonProps>) {
  const colorName = getColor(variant);
  const size = getSize(textVariant);
  const buttonProps = { variant, size, disabled, style: buttonStyle, ...props };

  return (
    <Button {...buttonProps}>
      {icon && (
        <Icon name={icon} size={size} colorName={colorName} style={iconStyle} />
      )}
      {text && (
        <Text
          variant={textVariant}
          colorName={colorName}
          style={[
            { flex: 1, fontWeight: 600 },
            textStyle
          ]}
        >
          {text}
        </Text>
      )}
    </Button>
  );
}

function getSize(textVariant: TextVariant) {
  return {
    title: 'lg',
    body: 'md',
    caption: 'sm',
    label: 'sm'
  }[textVariant] as keyof typeof IconSize;
}

function getColor(variant: ButtonVariant) {
  return {
    default: 'icon',
    muted: 'muted',
    accent: 'accent',
  }[variant] as ColorName;
}
