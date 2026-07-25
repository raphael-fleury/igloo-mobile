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
        }}
      >
        <SearchBar
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFilterPress={handleFilterPress}
        />
        <Tabs
          tabs={EXPLORE_TABS}
          activeTabId={activeTab}
          onTabPress={setActiveTab}
          style={{
            paddingHorizontal: Spacing.md,
            gap: Spacing.md,
          }}
        />
        <View style={{ flex: 1 }} />
    </View>
    </PageLayout>
  );
}
