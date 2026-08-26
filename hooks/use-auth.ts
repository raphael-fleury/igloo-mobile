import { useMutation } from '@tanstack/react-query';
import apiClient from '../services/api-client';
import { AuthResponse, LoginRequest, RegisterRequest } from '../services/api-types';

// Mutations
export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      const response = await apiClient.post<AuthResponse>('/auth/register', data);
      return response.data;
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await apiClient.post<AuthResponse>('/auth/login', data);
      return response.data;
    },
  });
};
