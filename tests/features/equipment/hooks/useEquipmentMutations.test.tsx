import { renderHook, waitFor, act } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'styled-components'
import { describe, it, expect, vi, afterEach } from 'vitest'
import type { ReactNode } from 'react'
import { useEquipmentMutations } from '@/features/equipment/hooks/useEquipmentMutations'
import { resetEquipmentStore } from '@/shared/mocks/equipmentHandlers'
import { theme } from '@/app/styles/theme'
import { createTestQueryClient } from '../../../utils/renderWithProviders'

function createWrapper() {
  const queryClient = createTestQueryClient()

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </QueryClientProvider>
  )

  return { queryClient, wrapper }
}

describe('useEquipmentMutations', () => {
  afterEach(() => {
    resetEquipmentStore()
  })

  it('createEquipment invalida el queryKey equipment', async () => {
    const { queryClient, wrapper } = createWrapper()
    const spy = vi.spyOn(queryClient, 'invalidateQueries')

    const { result } = renderHook(() => useEquipmentMutations(), { wrapper })

    act(() => {
      result.current.createEquipment.mutate({
        name: 'Test Equipment',
        type: 'Excavadora',
        serialNumber: 'SN-TEST-111',
        status: 'operativo',
        mineId: 'mine-001',
        lastMaintenanceDate: '2026-05-01',
      })
    })

    await waitFor(() => expect(result.current.createEquipment.isSuccess).toBe(true))

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({ queryKey: ['equipment'] })
    )
  })

  it('updateEquipment invalida el queryKey equipment', async () => {
    const { queryClient, wrapper } = createWrapper()
    const spy = vi.spyOn(queryClient, 'invalidateQueries')

    const { result } = renderHook(() => useEquipmentMutations(), { wrapper })

    act(() => {
      result.current.updateEquipment.mutate({
        id: 'equip-001',
        dto: { status: 'mantenimiento' },
      })
    })

    await waitFor(() => expect(result.current.updateEquipment.isSuccess).toBe(true))

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({ queryKey: ['equipment'] })
    )
  })

  it('deleteEquipment invalida el queryKey equipment', async () => {
    const { queryClient, wrapper } = createWrapper()
    const spy = vi.spyOn(queryClient, 'invalidateQueries')

    const { result } = renderHook(() => useEquipmentMutations(), { wrapper })

    act(() => {
      result.current.deleteEquipment.mutate('equip-001')
    })

    await waitFor(() => expect(result.current.deleteEquipment.isSuccess).toBe(true))

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({ queryKey: ['equipment'] })
    )
  })
})
