import { renderHook, waitFor, act } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'styled-components'
import { describe, it, expect, afterEach } from 'vitest'
import type { ReactNode } from 'react'
import { useProduction } from '@/features/dashboard/hooks/useProduction'
import { useMineStore } from '@/features/dashboard/store/mineStore'
import { theme } from '@/app/styles/theme'
import { createTestQueryClient } from '../../../utils/renderWithProviders'

const createWrapper = () => {
  const queryClient = createTestQueryClient()

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </QueryClientProvider>
  )
}

describe('useProduction', () => {
  afterEach(() => {
    useMineStore.setState({
      selectedMineId: 'mine-001',
      mines: [
        { id: 'mine-001', name: 'Mina El Teniente', location: 'Rancagua, Chile' },
        { id: 'mine-002', name: 'Mina Escondida', location: 'Antofagasta, Chile' },
        { id: 'mine-003', name: 'Mina Cerro Verde', location: 'Arequipa, Perú' },
      ],
    })
  })

  it('retorna datos de producción para la mina seleccionada', async () => {
    const { result } = renderHook(() => useProduction(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toBeDefined()
    expect(result.current.data!.length).toBeGreaterThan(0)

    const month = result.current.data![0]
    expect(month).toMatchObject({
      month: expect.stringMatching(/^\d{4}-\d{2}$/),
      production: expect.any(Number),
      target: expect.any(Number),
      efficiency: expect.any(Number),
    })
  })

  it('al cambiar la mina el query key cambia', async () => {
    const { result } = renderHook(() => useProduction(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    act(() => {
      useMineStore.getState().selectMine('mine-002')
    })

    await waitFor(() => {
      expect(useMineStore.getState().selectedMineId).toBe('mine-002')
    })
  })
})
