import { IconSize } from '@/constants/theme';
import { Image } from 'expo-image';
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';

type ProfilePhotoProps = Pick<PressableProps, 'onPress' | 'onHoverIn' | 'onHoverOut'> & {
  imageUrl?: string;
  size: keyof typeof IconSize;
  style?: StyleProp<ViewStyle>;
};

export function ProfilePhoto({
  imageUrl,
  size,
  style,
  ...pressableProps
}: Readonly<ProfilePhotoProps>) {
  const dimension = IconSize[size] * 2;
  console.log({ imageUrl, size, dimension });

  return (
    <Pressable
      {...pressableProps}
      style={[
        { width: dimension, height: dimension, borderRadius: dimension / 2, overflow: 'hidden' },
        style,
      ]}>
      <Image
        source={imageUrl}
        style={{ width: dimension, height: dimension }}
        contentFit="cover"
      />
    </Pressable>
  );
}