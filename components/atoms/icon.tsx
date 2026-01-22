import { IconSize } from '@/constants/theme';
import { ColorName } from '@/constants/theme/colors';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Feather } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { StyleProp, TextStyle } from 'react-native';

type FeatherIconName = ComponentProps<typeof Feather>['name'];

type Props = {
    name: FeatherIconName;
    size: keyof typeof IconSize;
    colorName: ColorName;
    style?: StyleProp<TextStyle>;
    props?: Omit<ComponentProps<typeof Feather>, 'name' | 'size' | 'color' | 'style'>;
};

export function Icon({ name, size, colorName, style, ...props }: Readonly<Props>) {
    const color = useThemeColor(colorName);
    const iconSize = IconSize[size];

    return <Feather name={name} size={iconSize} color={color} style={style} {...props} />
}