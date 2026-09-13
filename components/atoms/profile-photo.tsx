import { IconSize } from '@/constants/theme';
import { Image } from 'expo-image';
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';

const DEFAULT_PROFILE_IMAGE = require('@/assets/images/profile-default.jpeg');

type ProfilePhotoProps = Pick<PressableProps, 'onPress' | 'onHoverIn' | 'onHoverOut'> & {
  imageUrl?: string | null;
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
  const imageSource = (imageUrl ?? '').trim() || DEFAULT_PROFILE_IMAGE;

  return (
    <Pressable
      {...pressableProps}
      style={[
        { width: dimension, height: dimension, borderRadius: dimension / 2, overflow: 'hidden' },
        style,
      ]}>
      <Image
        source={imageSource}
        style={{ width: dimension, height: dimension }}
        contentFit="cover"
      />
    </Pressable>
  );
}