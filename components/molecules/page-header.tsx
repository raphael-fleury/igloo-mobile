import { Text } from '@/components/atoms/text';
import { IconButton } from '@/components/molecules/icon-button';
import { Spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

type PageHeaderProps = {
  title: string;
};

export function PageHeader({ title }: Readonly<PageHeaderProps>) {
  const router = useRouter();
  const borderColor = useThemeColor('border');

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={[styles.container, { borderBottomColor: borderColor }]}>
      <IconButton
        name="arrow-left"
        variant="default"
        accessibilityLabel="Go back"
        onPress={handleBackPress}
      />
      <Text variant="title" numberOfLines={1} style={styles.title}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
  },
  title: {
    flex: 1,
  },
});
