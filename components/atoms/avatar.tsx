import { Spacing } from '@/constants/theme';
import { Image, type ImageProps } from 'expo-image';
import { type StyleProp, type ImageStyle } from 'react-native';

type Props = Omit<ImageProps, 'style' | 'width' | 'height'> & {
  size: keyof typeof Spacing;
  style?: StyleProp<ImageStyle>;
};

export function Avatar({ size, style, ...props }: Readonly<Props>) {
  const dimension = Spacing[size];
  return (
    <Image
      {...props}
      style={[
        { width: dimension, height: dimension, borderRadius: dimension / 2 },
        style,
      ]}
    />
  );
}
