import { Typography } from '@/constants/theme';
import { ColorName } from '@/constants/theme/colors';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Text as RNText, TextProps } from 'react-native';

interface Props extends TextProps {
  variant?: keyof typeof Typography;
  colorName?: ColorName;
}

export function Text({
  variant = 'body',
  colorName = 'text',
  style,
  ...props
}: Readonly<Props>) {
  const color = useThemeColor(colorName);

  return (
    <RNText
      {...props}
      style={[
        Typography[variant],
        { color },
        style,
      ]}
    />
  );
}