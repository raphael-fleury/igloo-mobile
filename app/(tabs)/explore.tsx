import { SearchBar } from "@/components/molecules/search-bar";
import { TabItem, Tabs } from "@/components/molecules/tabs";
import { PageLayout } from "@/components/organisms/page-layout";
import { Spacing } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useState } from "react";
import { View } from "react-native";

const EXPLORE_TABS: TabItem[] = [
  { id: 'top', label: 'Top' },
  { id: 'latest', label: 'Latest' },
  { id: 'profiles', label: 'Profiles' },
];

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('top');

  const handleFilterPress = () => {
    console.log('Filter button pressed');
  };

  const sidebarSections = [
    {
      title: 'Trending Now',
      items: [
        { id: '1', label: '#JavaScript', badge: 1230 },
        { id: '2', label: '#WebDevelopment', badge: 890 },
        { id: '3', label: '#Programming', badge: 2105 },
      ],
    },
    {
      title: 'Suggested Profiles',
      items: [
        { id: '1', label: 'Tech Creator', badge: 3 },
        { id: '2', label: 'Design Master' },
        { id: '3', label: 'Dev Community', badge: 12 },
      ],
    },
  ];

  return (
    <PageLayout rightSidebarSections={sidebarSections}>
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
