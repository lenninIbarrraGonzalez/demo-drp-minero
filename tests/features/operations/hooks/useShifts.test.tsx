import { renderHook, waitFor, act } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'styled-components'
import { describe, it, expect, afterEach } from 'vitest'
import type { ReactNode } from 'react'
import { useShifts } from '@/features/operations/hooks/useShifts'
import { useShiftsFiltersStore } from '@/features/operations/store/shiftsFiltersStore'
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

describe('useShifts', () => {
  afterEach(() => {
    useShiftsFiltersStore.setState({
      page: 1,
      pageSize: 10,
      status: '',
      type: '',
      search: '',
    })
    useMineStore.setState({ selectedMineId: 'mine-001' })
  })

  it('inicia en estado loading', () => {
    const { result } = renderHook(() => useShifts(), { wrapper: createWrapper() })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeUndefined()
  })

  it('retorna PaginatedResponse<Shift> en success', async () => {
    const { result } = renderHook(() => useShifts(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toBeDefined()
    expect(result.current.data!.data).toBeInstanceOf(Array)
    expect(result.current.data!.total).toBeGreaterThan(0)
    expect(result.current.data!.page).toBe(1)
    expect(result.current.data!.pageSize).toBe(10)
  })

  it('cada turno tiene la estructura Shift completa', async () => {
    const { result } = renderHook(() => useShifts(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    for (const shift of result.current.data!.data) {
      expect(shift).toMatchObject({
        id: expect.any(String),
        date: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
        type: expect.stringMatching(/^(dia|noche)$/),
        status: expect.stringMatching(/^(completado|en_progreso|cancelado)$/),
        operator: expect.any(String),
        equipment: expect.any(String),
        production: expect.any(Number),
      })
    }
  })

  it('cambiar de página actualiza la respuesta', async () => {
    const { result } = renderHook(() => useShifts(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const page1Ids = result.current.data!.data.map((s) => s.id)

    act(() => {
      useShiftsFiltersStore.getState().setPage(2)
    })

    await waitFor(() => {
      const page2Ids = result.current.data?.data.map((s) => s.id)
      expect(page2Ids).toBeDefined()
      expect(page2Ids).not.toEqual(page1Ids)
    })
  })

  it('filtrar por status reduce el total de resultados', async () => {
    const { result: allResult } = renderHook(() => useShifts(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(allResult.current.isSuccess).toBe(true))
    const totalSinFiltro = allResult.current.data!.total

    act(() => {
      useShiftsFiltersStore.getState().setStatus('completado')
    })

    await waitFor(() => {
      const filtered = allResult.current.data
      expect(filtered).toBeDefined()
      expect(filtered!.total).toBeLessThan(totalSinFiltro)
    })

    const data = allResult.current.data!.data
    for (const shift of data) {
      expect(shift.status).toBe('completado')
    }
  })
})
