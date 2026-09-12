import { useInfiniteQuery } from '@tanstack/react-query';
import apiClient from '../services/api-client';
import { PaginationParams, PostsPage } from '../services/api-types';

export type Feed = 'following' | 'trending';

export const useGetFeed = (feed: Feed, params?: Omit<PaginationParams, 'cursor'>) => {
  return useInfiniteQuery({
    queryKey: ['feeds', feed, params],
    queryFn: async ({ pageParam }) => {
      const response = await apiClient.get<PostsPage>(`/feeds/${feed}`, {
        params: { ...params, cursor: pageParam },
      });
      return response.data;
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.nextCursor : undefined),
  });
};
