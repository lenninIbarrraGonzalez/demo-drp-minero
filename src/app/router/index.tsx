import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { PageLayout } from '@/shared/components/organisms/PageLayout'

const LoginPage = () => <div>Login — Etapa 2</div>
const DashboardPage = () => <div>Dashboard — Etapa 4</div>
const OperationsPage = () => <div>Operaciones — Etapa 5</div>
const EquipmentPage = () => <div>Equipos — Etapa 6</div>

export const AppRouter = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route element={<ProtectedRoute />}>
      <Route element={<PageLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/operations" element={<OperationsPage />} />
        <Route path="/equipment" element={<EquipmentPage />} />
      </Route>
    </Route>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
)
