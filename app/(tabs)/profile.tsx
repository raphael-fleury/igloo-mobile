import { Text } from "@/components/atoms/text";
import { PageLayout } from "@/components/organisms/page-layout";
import { useAuth } from "@/contexts/auth-context";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Redirect } from "expo-router";
import { View } from "react-native";

export default function ProfileScreen() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  const sidebarSections = [
    {
      title: 'My Following',
      items: [
        { id: '1', label: 'Tech News Hub', badge: 45 },
        { id: '2', label: 'Design Tips' },
        { id: '3', label: 'Code Learning', badge: 128 },
      ],
    },
    {
      title: 'My Interests',
      items: [
        { id: '1', label: '#ReactNative', badge: 234 },
        { id: '2', label: '#Expo', badge: 89 },
        { id: '3', label: '#Mobiledev' },
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
        <Text variant="title" colorName="accent">Profile</Text>
      </View>
    </PageLayout>
  );
}
