import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../services/api-client';
import {
  NotificationsPage,
  NotificationsReadPayload,
  PaginationParams,
  SuccessResponse,
} from '../services/api-types';

export const useGetNotifications = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['notifications', params],
    queryFn: async () => {
      const response = await apiClient.get<NotificationsPage>('/notifications/', { params });
      return response.data;
    },
  });
};

export const useMarkNotificationsAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: NotificationsReadPayload) => {
      const response = await apiClient.post<SuccessResponse>('/notifications/read', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};
