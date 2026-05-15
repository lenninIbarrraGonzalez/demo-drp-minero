import styled from 'styled-components'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { LoginForm } from './LoginForm'

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.bg.primary};
  padding: ${({ theme }) => theme.spacing[4]};
`

const Card = styled.div`
  background: ${({ theme }) => theme.colors.bg.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[8]};
  width: 100%;
  max-width: 440px;
`

export function LoginPage() {
  const user = useAuthStore((state) => state.user)

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <PageContainer>
      <Card>
        <LoginForm />
      </Card>
    </PageContainer>
  )
}
