import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, AxiosInstance } from 'axios';

// Configurar a URL base da API
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

// Criar instância do Axios
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Interceptor para adicionar token de autenticação
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving token from AsyncStorage:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Tratamento centralizado de erros
    if (error.response?.status === 401) {
      // Tratar não autorizado - remover token e fazer logout
      AsyncStorage.removeItem('auth_token').catch((e) => console.error('Error removing token', e));
    }
    return Promise.reject(error);
  }
);

export default apiClient;
