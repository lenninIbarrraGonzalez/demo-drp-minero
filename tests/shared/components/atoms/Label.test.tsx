import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { Label } from '@/shared/components/atoms/Label'
import { renderWithProviders } from '../../../utils/renderWithProviders'

describe('Label', () => {
  it('renderiza el texto', () => {
    renderWithProviders(<Label>Nombre</Label>)
    expect(screen.getByText('Nombre')).toBeInTheDocument()
  })

  it('muestra asterisco cuando required=true', () => {
    renderWithProviders(<Label required>Email</Label>)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('no muestra asterisco sin required', () => {
    renderWithProviders(<Label>Campo</Label>)
    expect(screen.queryByText('*')).not.toBeInTheDocument()
  })

  it('pasa htmlFor al elemento label', () => {
    renderWithProviders(<Label htmlFor="email-field">Correo</Label>)
    const label = screen.getByText('Correo').closest('label')
    expect(label).toHaveAttribute('for', 'email-field')
  })
})
