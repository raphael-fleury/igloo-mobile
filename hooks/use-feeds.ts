import { useInfiniteQuery } from '@tanstack/react-query';
import apiClient from '../services/api-client';
import { FeedResponse, PaginationParams } from '../services/api-types';

export type Feed = 'following' | 'trending';

export const useGetFeed = (feed: Feed, params?: Omit<PaginationParams, 'cursor'>) => {
  return useInfiniteQuery({
    queryKey: ['feeds', feed, params],
    queryFn: async ({ pageParam }) => {
      const response = await apiClient.get<FeedResponse>(`/feeds/${feed}`, {
        params: { ...params, cursor: pageParam },
      });
      return response.data;
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.items.at(-1)?.id : undefined,
  });
};
