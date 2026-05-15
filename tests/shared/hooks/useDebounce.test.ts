import { renderHook, act } from '@testing-library/react'
import { vi } from 'vitest'
import { useDebounce } from '@/shared/hooks/useDebounce'

describe('useDebounce', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  test('retorna el valor inicial inmediatamente', () => {
    const { result } = renderHook(() => useDebounce('inicial', 300))
    expect(result.current).toBe('inicial')
  })

  test('no actualiza el valor antes de que expire el delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'a', delay: 300 } }
    )
    rerender({ value: 'b', delay: 300 })
    act(() => { vi.advanceTimersByTime(200) })
    expect(result.current).toBe('a')
  })

  test('actualiza el valor después de que expira el delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'a', delay: 300 } }
    )
    rerender({ value: 'b', delay: 300 })
    act(() => { vi.advanceTimersByTime(300) })
    expect(result.current).toBe('b')
  })

  test('reinicia el timer cuando el valor cambia antes de que expire', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'a', delay: 300 } }
    )
    rerender({ value: 'b', delay: 300 })
    act(() => { vi.advanceTimersByTime(200) })
    rerender({ value: 'c', delay: 300 })
    act(() => { vi.advanceTimersByTime(200) })
    expect(result.current).toBe('a')
    act(() => { vi.advanceTimersByTime(100) })
    expect(result.current).toBe('c')
  })
})
