import { Text } from "@/components/atoms/text";
import { PageLayout } from "@/components/organisms/page-layout";
import { useAuth } from "@/contexts/auth-context";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Redirect } from "expo-router";
import { View } from "react-native";

export default function ConfigurationScreen() {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/sign-in" />;
  }
  
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
