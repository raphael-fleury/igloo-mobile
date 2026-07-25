import { PageLayout } from "@/components/organisms/page-layout";
import { useThemeColor } from "@/hooks/use-theme-color";
import { View } from "react-native";

export default function ExploreScreen() {
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
      <Text variant="title" colorName="accent">Explore</Text>
    </View>
    </PageLayout>
  );
}
