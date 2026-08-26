import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/api-client';
import { FeedResponse, PaginationParams } from '../services/api-types';

// Queries
export const useGetFeed = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['feed', 'home', params],
    queryFn: async () => {
      const response = await apiClient.get<FeedResponse>('/feed/', { params });
      return response.data;
    },
  });
};

export const useGetFollowingFeed = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['feed', 'following', params],
    queryFn: async () => {
      const response = await apiClient.get<FeedResponse>('/feed/following', { params });
      return response.data;
    },
  });
};
