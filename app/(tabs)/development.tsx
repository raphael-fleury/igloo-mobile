import { Text } from "@/components/atoms/text";
import { IconButton } from "@/components/molecules/icon-button";
import { TextButton } from "@/components/molecules/text-button";
import { useThemeColor } from "@/hooks/use-theme-color";
import { View } from "react-native";

export default function DevelopmentScreen() {
  return (
    <View
      style={{
        backgroundColor: useThemeColor('background'),
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text variant="title" colorName="accent">Title</Text>
      <Text variant="body" colorName="default">Body Text</Text>
      <Text variant="caption" colorName="muted">Caption</Text>
      <Text variant="label" colorName="muted">Label</Text>

      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8 }}>
        <TextButton variant="accent" textVariant="title" text="Title - Accent" />
        <TextButton variant="default" textVariant="body" text="Body - Default" />
        <TextButton variant="muted" textVariant="caption" text="Caption - Muted" />
        <TextButton variant="muted" textVariant="label" text="Label - Muted" />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8 }}>
        <IconButton name="home" size="xs" variant="muted" />
        <IconButton name="home" size="sm" variant="default" />
        <IconButton name="home" size="md" variant="accent" />
        <IconButton name="home" size="lg" variant="default" />
        <IconButton name="home" size="xl" variant="muted" />
      </View>
    </View>
  );
}
