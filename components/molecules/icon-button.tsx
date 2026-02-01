import { IconSize, IconVariant, Spacing } from '@/constants/theme';
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
  return (
    <Button
      variant={variant}
      size={size}
      disabled={disabled}
      style={[{
        borderRadius: (IconSize[size] + Spacing[size]) / 2,
        alignItems: 'center',
        justifyContent: 'center'
      }, buttonStyle]}
      {...props}
    >
      <Icon name={name} size={size} colorName={variant} style={iconStyle} />
    </Button>
  );
}
