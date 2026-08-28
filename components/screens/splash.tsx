import { Icon } from '@/components/atoms/icon';
import { useThemeColor } from '@/hooks/use-theme-color';
import { View } from 'react-native';

export function SplashScreen() {
  return (
    <View
      style={{
        backgroundColor: useThemeColor('background'),
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Icon name="loader" size="md" colorName="default" />
    </View>
  );
}
