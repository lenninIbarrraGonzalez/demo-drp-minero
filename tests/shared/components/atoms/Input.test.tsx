import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { Input } from '@/shared/components/atoms/Input'
import { renderWithProviders } from '../../../utils/renderWithProviders'

describe('Input', () => {
  it('renderiza el input', () => {
    renderWithProviders(<Input aria-label="nombre" />)
    expect(screen.getByRole('textbox', { name: /nombre/i })).toBeInTheDocument()
  })

  it('acepta value controlado', () => {
    renderWithProviders(<Input aria-label="email" value="test@example.com" readOnly />)
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument()
  })

  it('renderiza con estado de error (error=true)', () => {
    renderWithProviders(<Input aria-label="campo" error />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('queda deshabilitado con disabled', () => {
    renderWithProviders(<Input aria-label="campo" disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('acepta placeholder', () => {
    renderWithProviders(<Input aria-label="campo" placeholder="Escribe aquí" />)
    expect(screen.getByPlaceholderText('Escribe aquí')).toBeInTheDocument()
  })
})
