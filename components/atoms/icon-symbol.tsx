// Fallback for using MaterialIcons on Android and web.

import { Spacing } from '@/constants/theme';
import { ColorName } from '@/constants/theme/colors';
import { useThemeColor } from '@/hooks/use-theme-color';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'magnifyingglass': 'search',
  'house.fill': 'home'
} as IconMapping;


type Props = {
  name: IconSymbolName,
  size: keyof typeof Spacing,
  colorName: ColorName,
  weight?: SymbolWeight,
  style?: StyleProp<TextStyle>
}

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({ name, size, colorName, style }: Readonly<Props>) {
  const color = useThemeColor(colorName);

  return <MaterialIcons
    color={color}
    size={Spacing[size]}
    name={MAPPING[name]}
    style={style}
  />;
}
