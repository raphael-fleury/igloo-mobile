import { Text } from "@/components/atoms/text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { View } from "react-native";

export default function ProfileScreen() {
  return (
    <View
      style={{
        backgroundColor: useThemeColor('background'),
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text variant="title" colorName="tint">Profile</Text>
    </View>
  );
}
