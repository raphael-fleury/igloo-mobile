import { PostComposer } from "@/components/molecules/post-composer";
import { TabItem, Tabs } from "@/components/molecules/tabs";
import { PageLayout } from "@/components/organisms/page-layout";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useState } from "react";
import { View } from "react-native";

const HOME_TABS: TabItem[] = [
  { id: 'following', label: 'Following' },
  { id: 'trending', label: 'Trending' },
];

export default function HomeScreen() {
  const [postContent, setPostContent] = useState('');
  const [activeTab, setActiveTab] = useState('following');

  const handlePostSubmit = () => {
    console.log('Post submitted:', postContent);
    setPostContent('');
  };

  return (
    <PageLayout rightSidebarSections={[]}>
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
        <PostComposer
          placeholder="What's on your mind?"
          value={postContent}
          onChangeText={setPostContent}
          onSubmitPress={handlePostSubmit}
        />
        <View style={{ flex: 1 }} />
      </View>
    </PageLayout>
  );
}
