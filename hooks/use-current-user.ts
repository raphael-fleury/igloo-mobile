import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../services/api-client';
import { UpdateUserRequest, User } from '../services/api-types';

// Queries
export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ['user', 'current'],
    queryFn: async () => {
      const response = await apiClient.get<User>('/me/');
      return response.data;
    },
  });
};

// Mutations
export const useUpdateCurrentUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateUserRequest) => {
      const response = await apiClient.patch<User>('/me/', data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['user', 'current'] });
    },
  });
};
