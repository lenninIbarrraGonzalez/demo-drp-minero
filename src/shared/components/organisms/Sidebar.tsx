import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '@/app/router/routes'

const navItems = [
  {
    to: ROUTES.DASHBOARD,
    label: 'Dashboard',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <rect x="1" y="1" width="6" height="6" rx="1"/>
        <rect x="9" y="1" width="6" height="6" rx="1"/>
        <rect x="1" y="9" width="6" height="6" rx="1"/>
        <rect x="9" y="9" width="6" height="6" rx="1"/>
      </svg>
    ),
  },
  {
    to: ROUTES.OPERATIONS,
    label: 'Operaciones',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <rect x="1" y="3" width="14" height="2" rx="1"/>
        <rect x="1" y="7" width="14" height="2" rx="1"/>
        <rect x="1" y="11" width="14" height="2" rx="1"/>
      </svg>
    ),
  },
  {
    to: ROUTES.EQUIPMENT,
    label: 'Equipos',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M7 1a1 1 0 0 0-1 1v.5a4.5 4.5 0 0 0-1.9.79L3.65 2.84a1 1 0 0 0-1.41 1.41l.45.45A4.5 4.5 0 0 0 2 6.5H1.5a1 1 0 0 0 0 2H2a4.5 4.5 0 0 0 .69 1.8l-.45.45a1 1 0 0 0 1.41 1.41l.45-.45a4.5 4.5 0 0 0 1.9.79V13a1 1 0 0 0 2 0v-.5a4.5 4.5 0 0 0 1.9-.79l.45.45a1 1 0 0 0 1.41-1.41l-.45-.45A4.5 4.5 0 0 0 13 8.5h.5a1 1 0 0 0 0-2H13a4.5 4.5 0 0 0-.69-1.8l.45-.45a1 1 0 0 0-1.41-1.41l-.45.45A4.5 4.5 0 0 0 9 2.5V2a1 1 0 0 0-1-1H7zM8 5a2.5 2.5 0 1 1 0 5A2.5 2.5 0 0 1 8 5z"/>
      </svg>
    ),
  },
]

const SidebarContainer = styled.nav`
  width: ${({ theme }) => theme.layout.sidebarWidth};
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: ${({ theme }) => theme.colors.bg.sidebar};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing[4]};
  gap: ${({ theme }) => theme.spacing[1]};
`

const Brand = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: color 150ms ease, background 150ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.bg.hover};
  }

  &.active {
    color: ${({ theme }) => theme.colors.accent.primary};
    background: ${({ theme }) => theme.colors.accent.primary}15;
  }
`

export function Sidebar() {
  return (
    <SidebarContainer>
      <Brand>ERP Minero</Brand>
      {navItems.map(({ to, label, icon }) => (
        <NavItem key={to} to={to}>
          {icon}
          {label}
        </NavItem>
      ))}
    </SidebarContainer>
  )
}
