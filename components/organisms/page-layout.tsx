import { RightSidebar, SidebarSectionItem } from '@/components/organisms/right-sidebar';
import { Breakpoints } from '@/constants/theme';
import React, { ReactNode } from 'react';
import {
    StyleSheet,
    View,
    useWindowDimensions,
} from 'react-native';

type PageLayoutProps = {
  children: ReactNode;
  rightSidebarSections?: Array<{
    title: string;
    items: SidebarSectionItem[];
    onItemPress?: (itemId: string) => void;
  }>;
};

export function PageLayout({
  children,
  rightSidebarSections,
}: Readonly<PageLayoutProps>) {
  const { width } = useWindowDimensions();
  const showSidebar = width >= Breakpoints.xl && rightSidebarSections;

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        {children}
      </View>
      {showSidebar && (
        <RightSidebar sections={rightSidebarSections} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  mainContent: {
    flex: 1,
  },
});
