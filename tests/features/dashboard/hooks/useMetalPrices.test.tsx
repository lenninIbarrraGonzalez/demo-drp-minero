import { renderHook, waitFor } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'styled-components'
import { describe, it, expect } from 'vitest'
import type { ReactNode } from 'react'
import { useMetalPrices } from '@/features/dashboard/hooks/useMetalPrices'
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

describe('useMetalPrices', () => {
  it('inicia en estado loading', () => {
    const { result } = renderHook(() => useMetalPrices(), { wrapper: createWrapper() })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeUndefined()
  })

  it('retorna array de MetalPrice en success', async () => {
    const { result } = renderHook(() => useMetalPrices(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toBeDefined()
    expect(result.current.data).toHaveLength(3)
    expect(result.current.data?.map((m) => m.metal)).toEqual(
      expect.arrayContaining(['gold', 'copper', 'lithium'])
    )
  })

  it('cada metal tiene price mayor que 0', async () => {
    const { result } = renderHook(() => useMetalPrices(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    for (const mp of result.current.data ?? []) {
      expect(mp.price).toBeGreaterThan(0)
    }
  })
})
