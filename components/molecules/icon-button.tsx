import { IconSize, IconVariant, Spacing } from '@/constants/theme';
import { ColorName } from "@/constants/theme/colors";
import { Feather } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { Icon } from '../atoms/icon';
import { Button, ButtonProps } from '../containers/button';

type FeatherIconName = ComponentProps<typeof Feather>['name'];

type Props = Omit<ButtonProps, 'style' | 'variant' | 'size' | 'disabled'> & {
  name: FeatherIconName;
  variant: IconVariant;
  size?: keyof typeof IconSize;
  disabled?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle>;
};

export function IconButton({
  name,
  size = 'md',
  variant = 'default',
  disabled = false,
  buttonStyle,
  iconStyle,
  ...props
}: Readonly<Props>) {
  const colorName = getColor(variant);

  return (
    <Button
      variant={variant}
      size={size}
      disabled={disabled}
      style={[{
        padding: Spacing[size] / 2,
        borderRadius: (IconSize[size] + Spacing[size]) / 2,
        alignItems: 'center',
        justifyContent: 'center'
      }, buttonStyle]}
      {...props}
    >
      <Icon name={name} size={size} colorName={colorName} style={iconStyle} />
    </Button>
  );
}

function getColor(variant: IconVariant) {
  return {
    default: 'icon',
    muted: 'muted',
    accent: 'accent',
  }[variant] as ColorName;
}