import axios, { type AxiosError } from 'axios'
import type { ApiError } from '../types/api'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
})

apiClient.interceptors.request.use(
  (config) => {
    // Etapa 2: inyectar Authorization header desde auth store
    return config
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const apiError: ApiError = {
      message:
        (error.response?.data as { message?: string })?.message ??
        error.message ??
        'Error de red',
      status: error.response?.status ?? 0,
      code: error.code,
    }
    return Promise.reject(apiError)
  }
)

export default apiClient
