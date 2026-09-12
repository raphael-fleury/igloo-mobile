export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  WEB_BASE_URL: process.env.EXPO_PUBLIC_WEB_URL || 'http://localhost:8081',
  API_BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000',
  STORAGE_BASE_URL: process.env.EXPO_PUBLIC_STORAGE_URL || 'http://localhost:9000',
}