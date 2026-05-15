import { renderHook, act } from '@testing-library/react'
import { usePagination } from '@/shared/hooks/usePagination'

describe('usePagination', () => {
  test('inicia en página 1 por defecto', () => {
    const { result } = renderHook(() => usePagination())
    expect(result.current.page).toBe(1)
  })

  test('inicia en la página especificada', () => {
    const { result } = renderHook(() => usePagination({ initialPage: 3 }))
    expect(result.current.page).toBe(3)
  })

  test('nextPage incrementa la página', () => {
    const { result } = renderHook(() => usePagination())
    act(() => result.current.nextPage())
    expect(result.current.page).toBe(2)
  })

  test('prevPage decrementa la página', () => {
    const { result } = renderHook(() => usePagination({ initialPage: 3 }))
    act(() => result.current.prevPage())
    expect(result.current.page).toBe(2)
  })

  test('prevPage no va por debajo de página 1', () => {
    const { result } = renderHook(() => usePagination())
    act(() => result.current.prevPage())
    expect(result.current.page).toBe(1)
  })

  test('goToPage navega a la página indicada', () => {
    const { result } = renderHook(() => usePagination())
    act(() => result.current.goToPage(5))
    expect(result.current.page).toBe(5)
  })

  test('goToPage no va por debajo de página 1', () => {
    const { result } = renderHook(() => usePagination())
    act(() => result.current.goToPage(0))
    expect(result.current.page).toBe(1)
  })

  test('reset vuelve a la página inicial', () => {
    const { result } = renderHook(() => usePagination({ initialPage: 2 }))
    act(() => result.current.nextPage())
    act(() => result.current.nextPage())
    act(() => result.current.reset())
    expect(result.current.page).toBe(2)
  })

  test('pageSize default es 20', () => {
    const { result } = renderHook(() => usePagination())
    expect(result.current.pageSize).toBe(20)
  })
})
