import { Spacing } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { StyleSheet, View } from "react-native";

type NavProps = {
  horizontal?: boolean,
  children: React.ReactNode
}

export function Nav({ horizontal = false, children }: NavProps) {
  const backgroundColor = useThemeColor('background');
  const borderColor = useThemeColor('border');

  return (
    <View style={[
      styles.container,
      horizontal ? styles.horizontalContainer : styles.verticalContainer,
      { backgroundColor, borderColor }
    ]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.sm
  },
  horizontalContainer: {
    width: '100%',
    borderTopWidth: 1
  },
  verticalContainer: {
    width: 'auto',
    borderRightWidth: 1
  }
});