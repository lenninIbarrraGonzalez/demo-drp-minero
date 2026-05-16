import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/shared/components/atoms/Button'
import { renderWithProviders } from '../../../utils/renderWithProviders'

describe('Button', () => {
  it('renderiza children', () => {
    renderWithProviders(<Button>Guardar</Button>)
    expect(screen.getByRole('button', { name: /guardar/i })).toBeInTheDocument()
  })

  it('está deshabilitado cuando disabled=true', () => {
    renderWithProviders(<Button disabled>Acción</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('está deshabilitado cuando isLoading=true', () => {
    renderWithProviders(<Button isLoading>Guardando</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('muestra spinner cuando isLoading=true', () => {
    renderWithProviders(<Button isLoading>Guardando</Button>)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('no muestra spinner sin isLoading', () => {
    renderWithProviders(<Button>Acción</Button>)
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('llama onClick al hacer click', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    renderWithProviders(<Button onClick={onClick}>Acción</Button>)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('no llama onClick cuando está deshabilitado', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    renderWithProviders(<Button disabled onClick={onClick}>Acción</Button>)
    await user.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('renderiza variante secondary', () => {
    renderWithProviders(<Button variant="secondary">Cancelar</Button>)
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument()
  })

  it('renderiza variante danger', () => {
    renderWithProviders(<Button variant="danger">Eliminar</Button>)
    expect(screen.getByRole('button', { name: /eliminar/i })).toBeInTheDocument()
  })
})
