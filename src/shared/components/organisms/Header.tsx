import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store/authStore'
import { authService } from '@/features/auth/services/authService'
import { Button } from '@/shared/components/atoms/Button'
import { ROUTES } from '@/app/router/routes'

const HeaderContainer = styled.header`
  height: ${({ theme }) => theme.layout.headerHeight};
  background: ${({ theme }) => theme.colors.bg.card};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 ${({ theme }) => theme.spacing[6]};
  position: sticky;
  top: 0;
  z-index: 10;
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`

const UserName = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`

export function Header() {
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await authService.logout()
    useAuthStore.getState().logout()
    navigate(ROUTES.LOGIN, { replace: true })
  }

  return (
    <HeaderContainer>
      <UserInfo>
        {user && <UserName>{user.name}</UserName>}
        <Button variant="secondary" size="sm" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </UserInfo>
    </HeaderContainer>
  )
}
