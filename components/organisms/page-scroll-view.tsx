import { useThemeColor } from '@/hooks/use-theme-color';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import type { ScrollViewProps } from 'react-native';

type Pagination = {
  onEndReached: () => void;
  onRefresh: () => void;
  refreshing: boolean;
};

const PageScrollContext = createContext<Dispatch<SetStateAction<Pagination | null>> | null>(null);

export function usePageScrollPagination(
  onEndReached: () => void,
  onRefresh: () => void,
  refreshing: boolean
) {
  const setPagination = useContext(PageScrollContext);
  if (!setPagination) {
    throw new Error('PostList must be rendered inside PageScrollView.');
  }

  useEffect(() => {
    const pagination = { onEndReached, onRefresh, refreshing };
    setPagination(pagination);
    return () => setPagination((current) => current === pagination ? null : current);
  }, [setPagination, onEndReached, onRefresh, refreshing]);
}

export function PageScrollView({
  children,
  contentContainerStyle,
  onScroll,
  onLayout,
  onContentSizeChange,
  ...props
}: Readonly<ScrollViewProps>) {
  const accentColor = useThemeColor('accent');
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const metrics = useRef({ offset: 0, viewport: 0, content: 0 });
  const checkEndReached = useCallback(() => {
    const { offset, viewport, content } = metrics.current;
    if (viewport > 0 && content > 0 && offset + viewport * 1.5 >= content) {
      pagination?.onEndReached();
    }
  }, [pagination]);

  useEffect(() => {
    checkEndReached();
  }, [checkEndReached]);

  return (
    <PageScrollContext.Provider value={setPagination}>
      <ScrollView
        {...props}
        contentContainerStyle={[styles.content, contentContainerStyle]}
        scrollEventThrottle={16}
        onScroll={(event) => {
          metrics.current.offset = event.nativeEvent.contentOffset.y;
          checkEndReached();
          onScroll?.(event);
        }}
        onLayout={(event) => {
          metrics.current.viewport = event.nativeEvent.layout.height;
          checkEndReached();
          onLayout?.(event);
        }}
        onContentSizeChange={(width, height) => {
          metrics.current.content = height;
          checkEndReached();
          onContentSizeChange?.(width, height);
        }}
        refreshControl={pagination ? (
          <RefreshControl
            refreshing={pagination.refreshing}
            onRefresh={pagination.onRefresh}
            tintColor={accentColor}
            colors={[accentColor]}
          />
        ) : undefined}
      >
        {children}
      </ScrollView>
    </PageScrollContext.Provider>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
});
