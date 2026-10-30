import { Text } from '@/components/atoms/text';
import { ColorName } from '@/constants/theme/colors';
import { TextVariant } from '@/constants/theme/typography';
import { Profile } from '@/services/api-types';
import { useRouter } from 'expo-router';
import type { ReactNode } from 'react';
import { useState } from 'react';
import {
  GestureResponderEvent,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
} from 'react-native';

type ProfileLinkProps = {
  profile: Profile;
  accessibilityLabel: string;
  children: ReactNode;
  variant?: TextVariant;
  colorName?: ColorName;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  inline?: boolean;
};

export function ProfileLink({
  profile,
  accessibilityLabel,
  children,
  variant,
  colorName,
  style,
  numberOfLines,
  inline = false,
}: Readonly<ProfileLinkProps>) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handlePress = (event: GestureResponderEvent) => {
    event.stopPropagation();
    router.push({
      pathname: '/profiles/[id]',
      params: { id: profile.id },
    });
  };

  if (inline) {
    return (
      <Text
        accessibilityRole="link"
        accessibilityLabel={accessibilityLabel}
        onPress={handlePress}
        onPointerEnter={Platform.OS === 'web' ? () => setIsHovered(true) : undefined}
        onPointerLeave={Platform.OS === 'web' ? () => setIsHovered(false) : undefined}
        variant={variant}
        colorName={colorName}
        numberOfLines={numberOfLines}
        style={[style, isHovered && styles.hovered]}
      >
        {children}
      </Text>
    );
  }

  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={accessibilityLabel}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      onPress={handlePress}
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
