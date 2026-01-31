import { Text } from "@/components/atoms/text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { View } from "react-native";

export default function ConfigurationScreen() {
  return (
    <View
      style={{
        backgroundColor: useThemeColor('background'),
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text variant="title" colorName="tint">Configuration</Text>
    </View>
  );
}
