import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from 'styled-components'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import { EquipmentForm } from '@/features/equipment/components/EquipmentForm'
import type { Equipment } from '@/features/equipment/types'
import { theme } from '@/app/styles/theme'

function renderForm(props: Parameters<typeof EquipmentForm>[0]) {
  return render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <EquipmentForm {...props} />
      </ThemeProvider>
    </MemoryRouter>
  )
}

const DEFAULT_PROPS = {
  onSubmit: vi.fn(),
  onCancel: vi.fn(),
  isLoading: false,
}

const SAMPLE_EQUIPMENT: Equipment = {
  id: 'equip-001',
  name: 'Excavadora CAT 390',
  type: 'Excavadora',
  serialNumber: 'SN-2024-0001',
  status: 'operativo',
  mineId: 'mine-001',
  lastMaintenanceDate: '2026-04-01',
}

describe('EquipmentForm', () => {
  it('muestra los campos del formulario', () => {
    renderForm(DEFAULT_PROPS)

    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/número de serie/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/última mantención/i)).toBeInTheDocument()
  })

  it('muestra error de validación al intentar submit con nombre vacío', async () => {
    const user = userEvent.setup()
    renderForm(DEFAULT_PROPS)

    const nameInput = screen.getByLabelText(/nombre/i)
    await user.clear(nameInput)

    const submitBtn = screen.getByRole('button', { name: /guardar/i })
    await user.click(submitBtn)

    await waitFor(() => {
      expect(screen.getByText(/el nombre es requerido/i)).toBeInTheDocument()
    })
  })

  it('muestra error cuando el nombre tiene menos de 2 caracteres', async () => {
    const user = userEvent.setup()
    renderForm(DEFAULT_PROPS)

    const nameInput = screen.getByLabelText(/nombre/i)
    await user.clear(nameInput)
    await user.type(nameInput, 'A')

    const submitBtn = screen.getByRole('button', { name: /guardar/i })
    await user.click(submitBtn)

    await waitFor(() => {
      expect(screen.getByText(/mínimo 2 caracteres/i)).toBeInTheDocument()
    })
  })

  it('muestra error cuando el número de serie está vacío', async () => {
    const user = userEvent.setup()
    renderForm(DEFAULT_PROPS)

    const serialInput = screen.getByLabelText(/número de serie/i)
    await user.clear(serialInput)

    const submitBtn = screen.getByRole('button', { name: /guardar/i })
    await user.click(submitBtn)

    await waitFor(() => {
      expect(screen.getByText(/número de serie es requerido/i)).toBeInTheDocument()
    })
  })

  it('llama onSubmit con los datos correctos al completar el formulario', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    renderForm({ ...DEFAULT_PROPS, onSubmit })

    await user.type(screen.getByLabelText(/nombre/i), 'Camión Nuevo')
    await user.type(screen.getByLabelText(/número de serie/i), 'SN-2026-9999')
    await user.type(screen.getByLabelText(/última mantención/i), '2026-05-01')

    const submitBtn = screen.getByRole('button', { name: /guardar/i })
    await user.click(submitBtn)

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Camión Nuevo',
          serialNumber: 'SN-2026-9999',
          lastMaintenanceDate: '2026-05-01',
        }),
        expect.anything()
      )
    })
  })

  it('con defaultValues los campos vienen pre-rellenados', () => {
    renderForm({ ...DEFAULT_PROPS, defaultValues: SAMPLE_EQUIPMENT })

    expect(screen.getByLabelText(/nombre/i)).toHaveValue('Excavadora CAT 390')
    expect(screen.getByLabelText(/número de serie/i)).toHaveValue('SN-2024-0001')
  })

  it('botón Cancelar llama onCancel', async () => {
    const onCancel = vi.fn()
    const user = userEvent.setup()
    renderForm({ ...DEFAULT_PROPS, onCancel })

    await user.click(screen.getByRole('button', { name: /cancelar/i }))

    expect(onCancel).toHaveBeenCalledOnce()
  })

  it('botón Guardar está disabled mientras isLoading es true', () => {
    renderForm({ ...DEFAULT_PROPS, isLoading: true })

    const submitBtn = screen.getByRole('button', { name: /guardar/i })
    expect(submitBtn).toBeDisabled()
  })

  it('botón Cancelar está disabled mientras isLoading es true', () => {
    renderForm({ ...DEFAULT_PROPS, isLoading: true })

    const cancelBtn = screen.getByRole('button', { name: /cancelar/i })
    expect(cancelBtn).toBeDisabled()
  })
})
