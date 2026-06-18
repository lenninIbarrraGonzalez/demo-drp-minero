import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store/authStore'

export const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.user !== null)

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />
}
