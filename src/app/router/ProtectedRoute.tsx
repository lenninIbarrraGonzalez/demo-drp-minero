import { Outlet, Navigate } from 'react-router-dom'

export const ProtectedRoute = () => {
  // Etapa 2: const { user } = useAuthStore()
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}
