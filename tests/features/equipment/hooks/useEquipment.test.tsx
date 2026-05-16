import { renderHook, waitFor, act } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'styled-components'
import { describe, it, expect, afterEach } from 'vitest'
import type { ReactNode } from 'react'
import { useEquipment } from '@/features/equipment/hooks/useEquipment'
import { useEquipmentFiltersStore } from '@/features/equipment/store/equipmentFiltersStore'
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

describe('useEquipment', () => {
  afterEach(() => {
    useEquipmentFiltersStore.setState({
      page: 1,
      pageSize: 10,
      status: '',
      search: '',
    })
  })

  it('inicia en estado loading', () => {
    const { result } = renderHook(() => useEquipment(), { wrapper: createWrapper() })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeUndefined()
  })

  it('retorna PaginatedResponse<Equipment> en success', async () => {
    const { result } = renderHook(() => useEquipment(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toBeDefined()
    expect(result.current.data!.data).toBeInstanceOf(Array)
    expect(result.current.data!.total).toBeGreaterThan(0)
    expect(result.current.data!.page).toBe(1)
    expect(result.current.data!.pageSize).toBe(10)
  })

  it('cada equipo tiene la estructura Equipment completa', async () => {
    const { result } = renderHook(() => useEquipment(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    for (const eq of result.current.data!.data) {
      expect(eq).toMatchObject({
        id: expect.any(String),
        name: expect.any(String),
        type: expect.any(String),
        serialNumber: expect.any(String),
        status: expect.stringMatching(/^(operativo|mantenimiento|fuera_de_servicio)$/),
        mineId: expect.any(String),
        lastMaintenanceDate: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
      })
    }
  })

  it('cambiar de página devuelve resultados distintos', async () => {
    const { result } = renderHook(() => useEquipment(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const page1Ids = result.current.data!.data.map((e) => e.id)

    act(() => {
      useEquipmentFiltersStore.getState().setPage(2)
    })

    await waitFor(() => {
      const page2Ids = result.current.data?.data.map((e) => e.id)
      expect(page2Ids).toBeDefined()
      expect(page2Ids).not.toEqual(page1Ids)
    })
  })

  it('filtrar por status reduce el total de resultados', async () => {
    const { result: allResult } = renderHook(() => useEquipment(), { wrapper: createWrapper() })

    await waitFor(() => expect(allResult.current.isSuccess).toBe(true))
    const totalSinFiltro = allResult.current.data!.total

    act(() => {
      useEquipmentFiltersStore.getState().setStatus('operativo')
    })

    await waitFor(() => {
      const filtered = allResult.current.data
      expect(filtered).toBeDefined()
      expect(filtered!.total).toBeLessThan(totalSinFiltro)
    })

    const data = allResult.current.data!.data
    for (const eq of data) {
      expect(eq.status).toBe('operativo')
    }
  })
})
