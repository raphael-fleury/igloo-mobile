import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../services/api-client';
import { PaginationParams, Profile, ProfileListResponse } from '../services/api-types';

// Queries
export const useGetProfileById = (id: string) => {
  return useQuery({
    queryKey: ['profile', id],
    queryFn: async () => {
      const response = await apiClient.get<Profile>(`/profiles/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useGetProfileFollowers = (id: string, params?: PaginationParams) => {
  return useQuery({
    queryKey: ['profile', id, 'followers', params],
    queryFn: async () => {
      const response = await apiClient.get<ProfileListResponse>(`/profiles/${id}/followers`, { params });
      return response.data;
    },
    enabled: !!id,
  });
};

export const useGetProfileFollowing = (id: string, params?: PaginationParams) => {
  return useQuery({
    queryKey: ['profile', id, 'following', params],
    queryFn: async () => {
      const response = await apiClient.get<ProfileListResponse>(`/profiles/${id}/following`, { params });
      return response.data;
    },
    enabled: !!id,
  });
};

// Mutations
export const useFollowProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileId: string) => {
      const response = await apiClient.post<Profile>(`/profiles/${profileId}/follow`, {});
      return response.data;
    },
    onSuccess: (_, profileId) => {
      queryClient.invalidateQueries({ queryKey: ['profile', profileId] });
      queryClient.invalidateQueries({ queryKey: ['profile', 'current', 'following'] });
    },
  });
};

export const useUnfollowProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileId: string) => {
      await apiClient.delete(`/profiles/${profileId}/follow`);
    },
    onSuccess: (_, profileId) => {
      queryClient.invalidateQueries({ queryKey: ['profile', profileId] });
      queryClient.invalidateQueries({ queryKey: ['profile', 'current', 'following'] });
    },
  });
};

export const useBlockProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileId: string) => {
      await apiClient.post(`/profiles/${profileId}/block`, {});
    },
    onSuccess: (_, profileId) => {
      queryClient.invalidateQueries({ queryKey: ['profile', profileId] });
      queryClient.invalidateQueries({ queryKey: ['profile', 'current', 'blocks'] });
    },
  });
};

export const useUnblockProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileId: string) => {
      await apiClient.delete(`/profiles/${profileId}/block`);
    },
    onSuccess: (_, profileId) => {
      queryClient.invalidateQueries({ queryKey: ['profile', profileId] });
      queryClient.invalidateQueries({ queryKey: ['profile', 'current', 'blocks'] });
    },
  });
};

export const useMuteProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileId: string) => {
      await apiClient.post(`/profiles/${profileId}/mute`, {});
    },
    onSuccess: (_, profileId) => {
      queryClient.invalidateQueries({ queryKey: ['profile', profileId] });
      queryClient.invalidateQueries({ queryKey: ['profile', 'current', 'mutes'] });
    },
  });
};

export const useUnmuteProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileId: string) => {
      await apiClient.delete(`/profiles/${profileId}/mute`);
    },
    onSuccess: (_, profileId) => {
      queryClient.invalidateQueries({ queryKey: ['profile', profileId] });
      queryClient.invalidateQueries({ queryKey: ['profile', 'current', 'mutes'] });
    },
  });
};
