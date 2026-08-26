import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../services/api-client';
import { PaginationParams, Profile, ProfileListResponse, UpdateProfileRequest } from '../services/api-types';

// Queries
export const useGetCurrentProfile = () => {
  return useQuery({
    queryKey: ['profile', 'current'],
    queryFn: async () => {
      const response = await apiClient.get<Profile>('/me/profile/');
      return response.data;
    },
  });
};

export const useGetCurrentProfileFollowers = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['profile', 'current', 'followers', params],
    queryFn: async () => {
      const response = await apiClient.get<ProfileListResponse>('/me/profile/followers', { params });
      return response.data;
    },
  });
};

export const useGetCurrentProfileFollowing = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['profile', 'current', 'following', params],
    queryFn: async () => {
      const response = await apiClient.get<ProfileListResponse>('/me/profile/following', { params });
      return response.data;
    },
  });
};

export const useGetCurrentProfileBlocks = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['profile', 'current', 'blocks', params],
    queryFn: async () => {
      const response = await apiClient.get<ProfileListResponse>('/me/profile/blocks', { params });
      return response.data;
    },
  });
};

export const useGetCurrentProfileMutes = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['profile', 'current', 'mutes', params],
    queryFn: async () => {
      const response = await apiClient.get<ProfileListResponse>('/me/profile/mutes', { params });
      return response.data;
    },
  });
};

// Mutations
export const useUpdateCurrentProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateProfileRequest) => {
      const response = await apiClient.patch<Profile>('/me/profile/', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', 'current'] });
    },
  });
};

export const useUploadCurrentProfileAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const response = await apiClient.post('/me/profile/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', 'current'] });
    },
  });
};

export const useDeleteCurrentProfileAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiClient.delete('/me/profile/avatar');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', 'current'] });
    },
  });
};

export const useUploadCurrentProfileHeader = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const response = await apiClient.post('/me/profile/header', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', 'current'] });
    },
  });
};

export const useDeleteCurrentProfileHeader = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiClient.delete('/me/profile/header');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', 'current'] });
    },
  });
};
