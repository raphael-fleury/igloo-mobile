import { TabItem, Tabs } from "@/components/molecules/tabs";
import { Feed } from "@/components/organisms/feed";
import { PageLayout } from "@/components/organisms/page-layout";
import { PostComposer } from "@/components/organisms/post-composer";
import { Feed as FeedName } from "@/hooks/use-feeds";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useState } from "react";
import { View } from "react-native";

const HOME_TABS: TabItem[] = [
  { id: 'following', label: 'Following' },
  { id: 'trending', label: 'Trending' },
];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('following');

  const sidebarSections = [
    {
      title: 'Profiles to Follow',
      items: [
        { id: '1', label: 'John Developer', badge: 1 },
        { id: '2', label: 'Jane Designer' },
        { id: '3', label: 'Alex Engineer', badge: 5 },
      ],
    },
    {
      title: 'Trending Topics',
      items: [
        { id: '1', label: '#ReactNative', badge: 234 },
        { id: '2', label: '#Expo', badge: 89 },
        { id: '3', label: '#WebDevelopment', badge: 456 },
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
        <Tabs
          tabs={HOME_TABS}
          activeTabId={activeTab}
          onTabPress={setActiveTab}
          centered
        />
        <PostComposer />
        <Feed feed={activeTab as FeedName} />
      </View>
    </PageLayout>
  );
}
