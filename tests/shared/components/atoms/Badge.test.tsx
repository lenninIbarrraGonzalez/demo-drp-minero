import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { Badge } from '@/shared/components/atoms/Badge'
import { renderWithProviders } from '../../../utils/renderWithProviders'

describe('Badge', () => {
  it('renderiza el texto', () => {
    renderWithProviders(<Badge>Activo</Badge>)
    expect(screen.getByText('Activo')).toBeInTheDocument()
  })

  it('renderiza con variante default por omisión', () => {
    const { container } = renderWithProviders(<Badge>Default</Badge>)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renderiza con variante success', () => {
    renderWithProviders(<Badge variant="success">Operativo</Badge>)
    expect(screen.getByText('Operativo')).toBeInTheDocument()
  })

  it('renderiza con variante danger', () => {
    renderWithProviders(<Badge variant="danger">Fuera de servicio</Badge>)
    expect(screen.getByText('Fuera de servicio')).toBeInTheDocument()
  })

  it('renderiza con variante warning', () => {
    renderWithProviders(<Badge variant="warning">Mantenimiento</Badge>)
    expect(screen.getByText('Mantenimiento')).toBeInTheDocument()
  })

  it('renderiza con variante info', () => {
    renderWithProviders(<Badge variant="info">En revisión</Badge>)
    expect(screen.getByText('En revisión')).toBeInTheDocument()
  })
})
