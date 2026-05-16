import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from '@/shared/components/molecules/Modal'
import { renderWithProviders } from '../../../utils/renderWithProviders'

describe('Modal', () => {
  it('no renderiza nada cuando isOpen=false', () => {
    renderWithProviders(<Modal isOpen={false} onClose={() => {}} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renderiza el dialog cuando isOpen=true', () => {
    renderWithProviders(<Modal isOpen onClose={() => {}} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('muestra el título cuando se pasa title', () => {
    renderWithProviders(<Modal isOpen onClose={() => {}} title="Confirmar acción" />)
    expect(screen.getByText('Confirmar acción')).toBeInTheDocument()
  })

  it('renderiza el contenido children', () => {
    renderWithProviders(
      <Modal isOpen onClose={() => {}}>
        <p>Contenido del modal</p>
      </Modal>
    )
    expect(screen.getByText('Contenido del modal')).toBeInTheDocument()
  })

  it('llama onClose al hacer click en el botón de cerrar', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    renderWithProviders(<Modal isOpen onClose={onClose} title="Test" />)
    await user.click(screen.getByRole('button', { name: /cerrar modal/i }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('el dialog tiene aria-modal=true', () => {
    renderWithProviders(<Modal isOpen onClose={() => {}} />)
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
  })

  it('no muestra botón de cerrar sin title', () => {
    renderWithProviders(<Modal isOpen onClose={() => {}} />)
    expect(screen.queryByRole('button', { name: /cerrar modal/i })).not.toBeInTheDocument()
  })
})
