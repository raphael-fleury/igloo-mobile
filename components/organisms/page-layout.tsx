import { PageScrollView } from '@/components/organisms/page-scroll-view';
import { RightSidebar, SidebarSectionItem } from '@/components/organisms/right-sidebar';
import { Breakpoints } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import React, { ReactNode, useState } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    useWindowDimensions,
} from 'react-native';

type PageLayoutProps = {
  children: ReactNode;
  header?: ReactNode;
  rightSidebarSections?: {
    title: string;
    items: SidebarSectionItem[];
    onItemPress?: (itemId: string) => void;
  }[];
};

export function PageLayout({
  children,
  header,
  rightSidebarSections,
}: Readonly<PageLayoutProps>) {
  const { width } = useWindowDimensions();
  const backgroundColor = useThemeColor('background');
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [headerHeight, setHeaderHeight] = useState(0);
  const [mainWidth, setMainWidth] = useState(0);
  const showSidebar = width >= Breakpoints.xl && rightSidebarSections;
  const sidebarWidth = showSidebar ? viewport.width / 3 : 0;

  return (
    <View
      style={styles.container}
      onLayout={({ nativeEvent: { layout } }) => {
        setViewport((current) => current.width === layout.width && current.height === layout.height
          ? current
          : { width: layout.width, height: layout.height });
      }}
    >
      <PageScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { minHeight: viewport.height },
          Platform.OS !== 'web' && { paddingRight: sidebarWidth },
        ]}
      >
        <View
          style={[styles.mainContent, { paddingTop: header ? headerHeight : 0 }]}
          onLayout={({ nativeEvent: { layout } }) => setMainWidth(layout.width)}
        >
          {children}
        </View>
        {showSidebar && Platform.OS === 'web' && (
          <div
            style={{
              position: 'sticky',
              top: 0,
              alignSelf: 'flex-start',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              minWidth: 0,
              height: viewport.height,
            }}
          >
            <RightSidebar sections={rightSidebarSections} />
          </div>
        )}
      </PageScrollView>
      {header && (
        <View
          style={[styles.header, { backgroundColor, width: mainWidth }]}
          onLayout={({ nativeEvent: { layout } }) => setHeaderHeight(layout.height)}
        >
          {header}
        </View>
      )}
      {showSidebar && Platform.OS !== 'web' && (
        <View style={[styles.nativeSidebar, { width: sidebarWidth }]}>
          <RightSidebar sections={rightSidebarSections} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
  },
  mainContent: {
    flex: 2,
    minWidth: 0,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  nativeSidebar: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
  },
});
