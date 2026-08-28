import { Text } from "@/components/atoms/text";
import { IconButton } from "@/components/molecules/icon-button";
import { TextButton } from "@/components/molecules/text-button";
import { PageLayout } from "@/components/organisms/page-layout";
import { Spacing } from "@/constants/theme/spacing";
import { useThemeColor } from "@/hooks/use-theme-color";
import { View } from "react-native";

export default function DevelopmentScreen() {
  const sidebarSections = [
    {
      title: 'Development Info',
      items: [
        { id: '1', label: 'Component Library' },
        { id: '2', label: 'Style Guide' },
        { id: '3', label: 'Theme System' },
      ],
    },
  ];

  return (
    <PageLayout rightSidebarSections={sidebarSections}>
      <View
        style={{
          backgroundColor: useThemeColor('background'),
          flex: 1,
          padding: Spacing.md
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8 }}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text variant="hero" colorName="accent">Hero</Text>
            <Text variant="title" colorName="accent">Title</Text>
            <Text variant="body" colorName="default">Body Text</Text>
            <Text variant="input" colorName="muted">Input</Text>
            <Text variant="caption" colorName="muted">Caption</Text>
            <Text variant="label" colorName="muted">Label</Text>
          </View>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <TextButton variant="accent" textVariant="hero" text="Hero - Accent" icon="home" />
            <TextButton variant="accent" textVariant="title" text="Title - Accent" icon="home" />
            <TextButton variant="default" textVariant="body" text="Body - Default" icon="home" />
            <TextButton variant="accent" textVariant="input" text="Input - Accent" icon="home" />
            <TextButton variant="muted" textVariant="caption" text="Caption - Muted" icon="home" />
            <TextButton variant="link" textVariant="label" text="Label - Link" icon="home" />
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8 }}>
          <IconButton name="home" size="xs" variant="muted" />
          <IconButton name="home" size="sm" variant="default" />
          <IconButton name="home" size="md" variant="accent" />
          <IconButton name="home" size="lg" variant="default" />
          <IconButton name="home" size="xl" variant="muted" />
        </View>
      </View>
    </PageLayout>
  );
}
