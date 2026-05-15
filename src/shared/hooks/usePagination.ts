import { useState, useCallback } from 'react'

interface UsePaginationOptions {
  initialPage?: number
  initialPageSize?: number
}

export function usePagination({
  initialPage = 1,
  initialPageSize = 20,
}: UsePaginationOptions = {}) {
  const [page, setPage] = useState(initialPage)
  const [pageSize] = useState(initialPageSize)

  const nextPage = useCallback(() => setPage((p) => p + 1), [])
  const prevPage = useCallback(() => setPage((p) => Math.max(1, p - 1)), [])
  const goToPage = useCallback((n: number) => setPage(Math.max(1, n)), [])
  const reset = useCallback(() => setPage(initialPage), [initialPage])

  return { page, pageSize, nextPage, prevPage, goToPage, reset }
}
