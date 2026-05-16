import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { Dropdown } from '@/shared/components/molecules/Dropdown'
import { renderWithProviders } from '../../../utils/renderWithProviders'

const options = [
  { label: 'Opción A', value: 'a' },
  { label: 'Opción B', value: 'b' },
  { label: 'Opción C', value: 'c' },
]

describe('Dropdown', () => {
  it('renderiza el elemento select', () => {
    renderWithProviders(<Dropdown options={options} aria-label="Seleccionar" />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renderiza todas las opciones', () => {
    renderWithProviders(<Dropdown options={options} aria-label="Seleccionar" />)
    expect(screen.getByRole('option', { name: 'Opción A' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Opción B' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Opción C' })).toBeInTheDocument()
  })

  it('las opciones tienen los values correctos', () => {
    renderWithProviders(<Dropdown options={options} aria-label="Seleccionar" />)
    expect(screen.getByRole('option', { name: 'Opción A' })).toHaveValue('a')
    expect(screen.getByRole('option', { name: 'Opción B' })).toHaveValue('b')
    expect(screen.getByRole('option', { name: 'Opción C' })).toHaveValue('c')
  })

  it('queda deshabilitado con disabled', () => {
    renderWithProviders(<Dropdown options={options} aria-label="Seleccionar" disabled />)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('renderiza sin opciones cuando options=[]', () => {
    renderWithProviders(<Dropdown options={[]} aria-label="Seleccionar" />)
    expect(screen.queryAllByRole('option')).toHaveLength(0)
  })
})
