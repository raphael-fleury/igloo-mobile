import { Typography } from '@/constants/theme';
import { ColorName } from '@/constants/theme/colors';
import { TextVariant } from '@/constants/theme/typography';
import { useThemeColor } from '@/hooks/use-theme-color';
import type { DOMAttributes } from 'react';
import { Text as RNText, TextProps, TextStyle } from 'react-native';

interface Props extends TextProps, Pick<DOMAttributes<HTMLElement>, 'onPointerEnter' | 'onPointerLeave'> {
  variant?: TextVariant;
  colorName?: ColorName;
}

export function Text({
  variant = 'body',
  colorName = 'default',
  style,
  ...props
}: Readonly<Props>) {
  const color = useThemeColor(colorName);

  return (
    <RNText
      {...props}
      style={[
        Typography[variant] as TextStyle,
        { color },
        style,
      ]}
    />
  );
}