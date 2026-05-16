import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`

const MainContent = styled.main`
  margin-left: ${({ theme }) => theme.layout.sidebarWidth};
  flex: 1;
  display: flex;
  flex-direction: column;
`

const ContentArea = styled.div`
  padding: ${({ theme }) => theme.layout.contentPadding};
  flex: 1;
`

export const PageLayout = () => (
  <LayoutContainer>
    <Sidebar />
    <MainContent>
      <Header />
      <ContentArea>
        <Outlet />
      </ContentArea>
    </MainContent>
  </LayoutContainer>
)
