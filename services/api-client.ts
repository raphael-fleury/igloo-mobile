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
  (config) => {
    // Token será adicionado aqui conforme necessário
    // Você pode recuperar o token do AsyncStorage ou Context
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
      // Tratar não autorizado
      console.log('Não autorizado - fazer logout');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
