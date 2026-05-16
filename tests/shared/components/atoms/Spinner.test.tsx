import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { Spinner } from '@/shared/components/atoms/Spinner'
import { renderWithProviders } from '../../../utils/renderWithProviders'

describe('Spinner', () => {
  it('renderiza con role status', () => {
    renderWithProviders(<Spinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('tiene aria-label cargando', () => {
    renderWithProviders(<Spinner />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'cargando')
  })

  it('renderiza con size sm', () => {
    renderWithProviders(<Spinner size="sm" />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('renderiza con size lg', () => {
    renderWithProviders(<Spinner size="lg" />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })
})
