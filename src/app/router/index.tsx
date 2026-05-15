import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { PageLayout } from '@/shared/components/organisms/PageLayout'

export const ROUTES = {
  LOGIN:      '/login',
  DASHBOARD:  '/dashboard',
  OPERATIONS: '/operations',
  EQUIPMENT:  '/equipment',
} as const

const LoginPage     = () => <div>Login — Etapa 2</div>
const DashboardPage = () => <div>Dashboard — Etapa 4</div>
const OperationsPage = () => <div>Operaciones — Etapa 5</div>
const EquipmentPage  = () => <div>Equipos — Etapa 6</div>

export const AppRouter = () => (
  <Routes>
    <Route path={ROUTES.LOGIN} element={<LoginPage />} />
    <Route element={<ProtectedRoute />}>
      <Route element={<PageLayout />}>
        <Route path={ROUTES.DASHBOARD}  element={<DashboardPage />} />
        <Route path={ROUTES.OPERATIONS} element={<OperationsPage />} />
        <Route path={ROUTES.EQUIPMENT}  element={<EquipmentPage />} />
      </Route>
    </Route>
    <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
  </Routes>
)
