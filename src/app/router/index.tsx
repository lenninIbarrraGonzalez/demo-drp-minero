import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { PageLayout } from '@/shared/components/organisms/PageLayout'
import { LoginPage } from '@/features/auth/components/LoginPage'
import { LandingPage } from '@/features/landing/components/LandingPage'
import { DashboardPage } from '@/features/dashboard/components/DashboardPage'
import { OperationsPage } from '@/features/operations/components/OperationsPage'
import { EquipmentPage } from '@/features/equipment/components/EquipmentPage'
import { ROUTES } from './routes'

export { ROUTES } from './routes'

export const AppRouter = () => (
  <Routes>
    <Route path={ROUTES.LANDING} element={<LandingPage />} />
    <Route path={ROUTES.LOGIN} element={<LoginPage />} />
    <Route element={<ProtectedRoute />}>
      <Route element={<PageLayout />}>
        <Route path={ROUTES.DASHBOARD}  element={<DashboardPage />} />
        <Route path={ROUTES.OPERATIONS} element={<OperationsPage />} />
        <Route path={ROUTES.EQUIPMENT}  element={<EquipmentPage />} />
      </Route>
    </Route>
    <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
  </Routes>
)
