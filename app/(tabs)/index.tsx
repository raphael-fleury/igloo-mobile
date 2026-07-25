import { Text } from "@/components/atoms/text";
import { PageLayout } from "@/components/organisms/page-layout";
import { useThemeColor } from "@/hooks/use-theme-color";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <PageLayout rightSidebarSections={[]}>
    <View
      style={{
        backgroundColor: useThemeColor('background'),
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text variant="title" colorName="accent">Home</Text>
    </View>
    </PageLayout>
  );
}
