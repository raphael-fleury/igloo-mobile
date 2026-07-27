import { PageLayout } from "@/components/organisms/page-layout";
import { Spacing } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useState } from "react";
import { View } from "react-native";

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('top');

  const handleFilterPress = () => {
    console.log('Filter button pressed');
  };

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
