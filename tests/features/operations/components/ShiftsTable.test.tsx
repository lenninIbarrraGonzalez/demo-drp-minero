import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from 'styled-components'
import { describe, it, expect } from 'vitest'
import { ShiftsTable } from '@/features/operations/components/ShiftsTable'
import type { Shift } from '@/features/operations/types'
import { theme } from '@/app/styles/theme'

function renderTable(props: Parameters<typeof ShiftsTable>[0]) {
  return render(
    <ThemeProvider theme={theme}>
      <ShiftsTable {...props} />
    </ThemeProvider>
  )
}

const SAMPLE_SHIFTS: Shift[] = [
  {
    id: 'shift-1',
    mineId: 'mine-001',
    date: '2026-05-10',
    type: 'dia',
    status: 'completado',
    operator: 'Carlos Mendoza',
    equipment: 'Excavadora CAT 390',
    production: 1200,
  },
  {
    id: 'shift-2',
    mineId: 'mine-001',
    date: '2026-05-09',
    type: 'noche',
    status: 'en_progreso',
    operator: 'Ana Torres',
    equipment: 'Camión Komatsu 930E',
    production: 950,
  },
  {
    id: 'shift-3',
    mineId: 'mine-001',
    date: '2026-05-08',
    type: 'dia',
    status: 'cancelado',
    operator: 'Luis Herrera',
    equipment: 'Perforadora Sandvik',
    production: 0,
  },
]

describe('ShiftsTable', () => {
  it('renderiza filas skeleton cuando isLoading es true', () => {
    renderTable({ data: undefined, isLoading: true, isError: false })
    const rows = screen.getAllByRole('row')
    // thead row + 5 skeleton rows
    expect(rows.length).toBeGreaterThanOrEqual(6)
  })

  it('renderiza mensaje de error cuando isError es true', () => {
    renderTable({ data: undefined, isLoading: false, isError: true })
    expect(screen.getByText(/error al cargar/i)).toBeInTheDocument()
  })

  it('renderiza empty state cuando data es array vacío', () => {
    renderTable({ data: [], isLoading: false, isError: false })
    expect(screen.getByText(/no se encontraron turnos/i)).toBeInTheDocument()
  })

  it('renderiza una fila por turno cuando data tiene elementos', () => {
    renderTable({ data: SAMPLE_SHIFTS, isLoading: false, isError: false })
    expect(screen.getByText('Carlos Mendoza')).toBeInTheDocument()
    expect(screen.getByText('Ana Torres')).toBeInTheDocument()
    expect(screen.getByText('Luis Herrera')).toBeInTheDocument()
  })

  it('muestra el badge correcto para cada status', () => {
    renderTable({ data: SAMPLE_SHIFTS, isLoading: false, isError: false })
    expect(screen.getByText('Completado')).toBeInTheDocument()
    expect(screen.getByText('En progreso')).toBeInTheDocument()
    expect(screen.getByText('Cancelado')).toBeInTheDocument()
  })

  it('muestra el badge correcto para cada tipo de turno', () => {
    renderTable({ data: SAMPLE_SHIFTS, isLoading: false, isError: false })
    const diaElems = screen.getAllByText('Día')
    const nocheElems = screen.getAllByText('Noche')
    expect(diaElems.length).toBeGreaterThanOrEqual(1)
    expect(nocheElems.length).toBeGreaterThanOrEqual(1)
  })

  it('las cabeceras sorteables muestran indicador de sort', () => {
    renderTable({ data: SAMPLE_SHIFTS, isLoading: false, isError: false })
    const fechaHeader = screen.getByRole('columnheader', { name: /fecha/i })
    expect(fechaHeader).toBeInTheDocument()
    expect(within(fechaHeader).getByText('↕')).toBeInTheDocument()
  })

  it('hacer click en Fecha invierte el orden de las filas', async () => {
    const user = userEvent.setup()
    renderTable({ data: SAMPLE_SHIFTS, isLoading: false, isError: false })

    const fechaHeader = screen.getByRole('columnheader', { name: /fecha/i })

    // Orden inicial: 2026-05-10, 2026-05-09, 2026-05-08
    const rowsBefore = screen.getAllByRole('row').slice(1) // quitar thead
    expect(rowsBefore[0]).toHaveTextContent('2026-05-10')

    // Click asc
    await user.click(fechaHeader)
    const rowsAsc = screen.getAllByRole('row').slice(1)
    expect(rowsAsc[0]).toHaveTextContent('2026-05-08')

    // Click desc
    await user.click(fechaHeader)
    const rowsDesc = screen.getAllByRole('row').slice(1)
    expect(rowsDesc[0]).toHaveTextContent('2026-05-10')
  })

  it('la producción se muestra formateada con separador de miles', () => {
    renderTable({ data: SAMPLE_SHIFTS, isLoading: false, isError: false })
    expect(screen.getByText('1.200')).toBeInTheDocument()
  })
})
