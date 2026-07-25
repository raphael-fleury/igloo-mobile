import { Spacing } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { StyleSheet, View } from "react-native";

type NavProps = {
  horizontal?: boolean,
  children: React.ReactNode,
  style?: object
}

export function Nav({ horizontal = false, children, style }: NavProps) {
  const backgroundColor = useThemeColor('background');
  const borderColor = useThemeColor('border');

  return (
    <View style={[
      styles.container,
      horizontal ? styles.horizontalContainer : styles.verticalContainer,
      { backgroundColor, borderColor },
      style
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
    borderTopWidth: 1,
    flexDirection: 'row'
  },
  verticalContainer: {
    width: 'auto',
    borderRightWidth: 1
  }
});