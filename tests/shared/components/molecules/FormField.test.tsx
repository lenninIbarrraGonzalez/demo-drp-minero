import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { FormField } from '@/shared/components/molecules/FormField'
import { renderWithProviders } from '../../../utils/renderWithProviders'

describe('FormField', () => {
  it('renderiza label e input asociados', () => {
    renderWithProviders(<FormField id="email" label="Email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('muestra error cuando se pasa error prop', () => {
    renderWithProviders(
      <FormField id="email" label="Email" error="El correo es requerido" />
    )
    expect(screen.getByRole('alert')).toHaveTextContent('El correo es requerido')
  })

  it('no muestra error sin error prop', () => {
    renderWithProviders(<FormField id="email" label="Email" />)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('muestra asterisco cuando required=true', () => {
    renderWithProviders(<FormField id="nombre" label="Nombre" required />)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('no muestra asterisco sin required', () => {
    renderWithProviders(<FormField id="nombre" label="Nombre" />)
    expect(screen.queryByText('*')).not.toBeInTheDocument()
  })

  it('conecta label con input via id', () => {
    renderWithProviders(<FormField id="campo-test" label="Campo" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'campo-test')
  })

  it('pasa placeholder al input', () => {
    renderWithProviders(<FormField id="name" label="Nombre" placeholder="Juan Pérez" />)
    expect(screen.getByPlaceholderText('Juan Pérez')).toBeInTheDocument()
  })
})
