import { Text } from "@/components/atoms/text";
import { PageHeader } from "@/components/molecules/page-header";
import { PageLayout } from "@/components/organisms/page-layout";
import { Profile } from "@/components/organisms/profile";
import { useAuth } from "@/contexts/auth-context";
import { useGetCurrentProfile } from "@/hooks/use-current-profile";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function MyProfileScreen() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return <ProfileContent />;
}

function ProfileContent() {
  const backgroundColor = useThemeColor('background');
  const accentColor = useThemeColor('accent');
  const { data: profile, isLoading, isError } = useGetCurrentProfile();

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
    <PageLayout
      rightSidebarSections={sidebarSections}
      header={<PageHeader title={profile?.displayName?.trim() || 'Profile'} />}
    >
      <View style={{ backgroundColor, flex: 1 }}>
        {profile ? (
          <Profile profile={profile} />
        ) : (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {isLoading && <ActivityIndicator color={accentColor} />}
            {isError && <Text colorName="error">Failed to load profile.</Text>}
          </View>
        )}
      </View>
    </PageLayout>
  );
}
