import { ButtonVariant, IconSize } from "@/constants/theme";
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
  const colorName = variant === 'link' ? 'accent' : variant;
  const size = getSize(textVariant);
  const buttonProps = { variant, size, disabled, style: buttonStyle, ...props };

  return (
    <Button {...buttonProps}>
      {(state) => (
        <>
          {icon && (
            <Icon name={icon} size={size} colorName={colorName} style={iconStyle} />
          )}
          {text && (
            <Text
              variant={textVariant}
              colorName={colorName}
              style={[
                { flex: 1, fontWeight: 600 },
                variant === 'link' && state.hovered && { textDecorationLine: 'underline' },
                textStyle
              ]}
            >
              {text}
            </Text>
          )}
        </>
      )}
    </Button>
  );
}

function getSize(textVariant: TextVariant) {
  return {
    hero: 'xxl',
    title: 'lg',
    body: 'md',
    input: 'md',
    caption: 'sm',
    label: 'sm'
  }[textVariant] as keyof typeof IconSize;
}
