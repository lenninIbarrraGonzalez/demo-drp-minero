import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { Sidebar } from '@/shared/components/organisms/Sidebar'
import { renderWithProviders } from '../../../utils/renderWithProviders'

describe('Sidebar', () => {
  it('renderiza los tres ítems de navegación', () => {
    renderWithProviders(<Sidebar />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Operaciones')).toBeInTheDocument()
    expect(screen.getByText('Equipos')).toBeInTheDocument()
  })

  it('el ítem activo tiene clase active cuando la ruta coincide', () => {
    renderWithProviders(<Sidebar />, { initialRoute: '/dashboard' })
    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveClass('active')
  })

  it('los ítems inactivos no tienen clase active', () => {
    renderWithProviders(<Sidebar />, { initialRoute: '/dashboard' })
    expect(screen.getByRole('link', { name: /operaciones/i })).not.toHaveClass('active')
    expect(screen.getByRole('link', { name: /equipos/i })).not.toHaveClass('active')
  })

  it('cambia ítem activo según la ruta', () => {
    renderWithProviders(<Sidebar />, { initialRoute: '/operations' })
    expect(screen.getByRole('link', { name: /operaciones/i })).toHaveClass('active')
    expect(screen.getByRole('link', { name: /dashboard/i })).not.toHaveClass('active')
  })

  it('todos los links son elementos anchor', () => {
    renderWithProviders(<Sidebar />)
    expect(screen.getAllByRole('link')).toHaveLength(3)
  })
})
