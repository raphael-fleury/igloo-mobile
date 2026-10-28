import { Text } from '@/components/atoms/text';
import { ColorName } from '@/constants/theme/colors';
import { TextVariant } from '@/constants/theme/typography';
import { Profile } from '@/services/api-types';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
} from 'react-native';
import type { ReactNode } from 'react';

type ProfileLinkProps = {
  profile: Profile;
  accessibilityLabel: string;
  children: ReactNode;
  variant?: TextVariant;
  colorName?: ColorName;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
};

export function ProfileLink({
  profile,
  accessibilityLabel,
  children,
  variant,
  colorName,
  style,
  numberOfLines,
}: Readonly<ProfileLinkProps>) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={accessibilityLabel}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      onPress={(event) => {
        event.stopPropagation();
        router.push({
          pathname: '/profiles/[id]',
          params: { id: profile.id },
        });
      }}
    >
      <Text
        variant={variant}
        colorName={colorName}
        numberOfLines={numberOfLines}
        style={[style, isHovered && styles.hovered]}
      >
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hovered: {
    textDecorationLine: 'underline',
  },
});
