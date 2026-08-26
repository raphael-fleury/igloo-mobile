import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../services/api-client';
import { CreatePostRequest, PaginationParams, Post, PostListResponse, ProfileListResponse } from '../services/api-types';

// Queries
export const useFindPosts = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['posts', 'list', params],
    queryFn: async () => {
      const response = await apiClient.get<PostListResponse>('/posts/', { params });
      return response.data;
    },
  });
};

export const useGetPostById = (id: string) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const response = await apiClient.get<Post>(`/posts/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useGetPostLikes = (id: string, params?: PaginationParams) => {
  return useQuery({
    queryKey: ['post', id, 'likes', params],
    queryFn: async () => {
      const response = await apiClient.get<ProfileListResponse>(`/posts/${id}/likes`, { params });
      return response.data;
    },
    enabled: !!id,
  });
};

export const useGetPostReposts = (id: string, params?: PaginationParams) => {
  return useQuery({
    queryKey: ['post', id, 'reposts', params],
    queryFn: async () => {
      const response = await apiClient.get<PostListResponse>(`/posts/${id}/reposts`, { params });
      return response.data;
    },
    enabled: !!id,
  });
};

export const useGetPostReplies = (id: string, params?: PaginationParams) => {
  return useQuery({
    queryKey: ['post', id, 'replies', params],
    queryFn: async () => {
      const response = await apiClient.get<PostListResponse>(`/posts/${id}/replies`, { params });
      return response.data;
    },
    enabled: !!id,
  });
};

export const useGetPostQuotes = (id: string, params?: PaginationParams) => {
  return useQuery({
    queryKey: ['post', id, 'quotes', params],
    queryFn: async () => {
      const response = await apiClient.get<PostListResponse>(`/posts/${id}/quotes`, { params });
      return response.data;
    },
    enabled: !!id,
  });
};

// Mutations
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePostRequest) => {
      const response = await apiClient.post<Post>('/posts/', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', 'list'] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      await apiClient.delete(`/posts/${postId}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      await apiClient.post(`/posts/${postId}/likes`, {});
    },
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useUnlikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      await apiClient.delete(`/posts/${postId}/likes`);
    },
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useRepostPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      const response = await apiClient.post<Post>(`/posts/${postId}/reposts`, {});
      return response.data;
    },
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useUnrepostPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      await apiClient.delete(`/posts/${postId}/reposts`);
    },
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
