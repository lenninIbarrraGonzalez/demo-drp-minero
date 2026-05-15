import styled from 'styled-components'
import { Outlet } from 'react-router-dom'

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`

const SidebarNav = styled.nav`
  width: ${({ theme }) => theme.layout.sidebarWidth};
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: ${({ theme }) => theme.colors.bg.sidebar};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing[4]};
`

const MainContent = styled.main`
  margin-left: ${({ theme }) => theme.layout.sidebarWidth};
  flex: 1;
  display: flex;
  flex-direction: column;
`

const TopHeader = styled.header`
  height: ${({ theme }) => theme.layout.headerHeight};
  background: ${({ theme }) => theme.colors.bg.card};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing[6]};
  position: sticky;
  top: 0;
  z-index: 10;
`

const ContentArea = styled.div`
  padding: ${({ theme }) => theme.layout.contentPadding};
  flex: 1;
`

const NavPlaceholder = styled.span`
  color: ${({ theme }) => theme.colors.text.muted};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
`

const AppTitle = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`

export const PageLayout = () => (
  <LayoutContainer>
    <SidebarNav>
      <NavPlaceholder>Navegación — Etapa 3</NavPlaceholder>
    </SidebarNav>
    <MainContent>
      <TopHeader>
        <AppTitle>ERP Minero</AppTitle>
      </TopHeader>
      <ContentArea>
        <Outlet />
      </ContentArea>
    </MainContent>
  </LayoutContainer>
)
