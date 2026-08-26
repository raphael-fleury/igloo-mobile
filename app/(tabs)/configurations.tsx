import { Text } from "@/components/atoms/text";
import { PageLayout } from "@/components/organisms/page-layout";
import { useThemeColor } from "@/hooks/use-theme-color";
import { View } from "react-native";

export default function ConfigurationScreen() {
  const sidebarSections = [
    {
      title: 'Help & Support',
      items: [
        { id: '1', label: 'Documentation' },
        { id: '2', label: 'FAQ' },
        { id: '3', label: 'Contact Support' },
      ],
    },
  ];

  return (
    <PageLayout rightSidebarSections={sidebarSections}>
      <View
        style={{
          backgroundColor: useThemeColor('background'),
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text variant="title" colorName="accent">Configuration</Text>
      </View>
    </PageLayout>
  );
}
