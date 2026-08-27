import { Text } from '@/components/atoms/text';
import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import { View } from 'react-native';

export default function SignUpScreen() {
  return (
    <View
      style={{
        backgroundColor: useThemeColor('background'),
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text variant="title" colorName="accent">Sign Up</Text>
    </View>
  );
}
