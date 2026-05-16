import { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import styled, { keyframes } from 'styled-components'
import { Badge } from '@/shared/components/atoms/Badge'
import type { BadgeVariant } from '@/shared/components/atoms/Badge'
import type { Shift, ShiftStatus, ShiftType } from '../types'
import { SHIFT_STATUS_LABELS, SHIFT_TYPE_LABELS } from '../types'

interface ShiftsTableProps {
  data: Shift[] | undefined
  isLoading: boolean
  isError: boolean
}

const STATUS_VARIANT: Record<ShiftStatus, BadgeVariant> = {
  completado: 'success',
  en_progreso: 'warning',
  cancelado: 'danger',
}

const TYPE_VARIANT: Record<ShiftType, BadgeVariant> = {
  dia: 'info',
  noche: 'default',
}

const TableWrapper = styled.div`
  background: ${({ theme }) => theme.colors.bg.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
`

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const Thead = styled.thead`
  background: ${({ theme }) => theme.colors.bg.hover};
`

const Th = styled.th<{ $sortable?: boolean }>`
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  text-align: left;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
  cursor: ${({ $sortable }) => ($sortable ? 'pointer' : 'default')};
  user-select: none;

  &:hover {
    color: ${({ theme, $sortable }) => $sortable ? theme.colors.text.primary : theme.colors.text.secondary};
  }
`

const SortIndicator = styled.span`
  margin-left: ${({ theme }) => theme.spacing[1]};
  opacity: 0.7;
`

const Tr = styled.tr`
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    background: ${({ theme }) => theme.colors.bg.hover};
  }
`

const Td = styled.td`
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.primary};
`

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 0.8; }
`

const SkeletonCell = styled.div`
  height: 16px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.bg.hover};
  animation: ${pulse} 1.4s ease-in-out infinite;
  width: 80%;
`

const CenterCell = styled.td`
  padding: ${({ theme }) => theme.spacing[8]};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`

const ErrorCell = styled(CenterCell)`
  color: ${({ theme }) => theme.colors.accent.danger};
`

const SKELETON_ROWS = 5

const COLUMNS: ColumnDef<Shift>[] = [
  {
    accessorKey: 'date',
    header: 'Fecha',
    enableSorting: true,
  },
  {
    accessorKey: 'type',
    header: 'Turno',
    enableSorting: false,
    cell: ({ getValue }) => {
      const val = getValue<ShiftType>()
      return <Badge variant={TYPE_VARIANT[val]}>{SHIFT_TYPE_LABELS[val]}</Badge>
    },
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    enableSorting: false,
    cell: ({ getValue }) => {
      const val = getValue<ShiftStatus>()
      return <Badge variant={STATUS_VARIANT[val]}>{SHIFT_STATUS_LABELS[val]}</Badge>
    },
  },
  {
    accessorKey: 'operator',
    header: 'Operador',
    enableSorting: true,
  },
  {
    accessorKey: 'equipment',
    header: 'Equipo',
    enableSorting: false,
  },
  {
    accessorKey: 'production',
    header: 'Producción (t)',
    enableSorting: true,
    cell: ({ getValue }) => getValue<number>().toLocaleString('es-CL'),
  },
]

export function ShiftsTable({ data, isLoading, isError }: ShiftsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])

  const tableData = useMemo(() => data ?? [], [data])

  const table = useReactTable({
    data: tableData,
    columns: COLUMNS,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
  })

  function renderBody() {
    if (isLoading) {
      return Array.from({ length: SKELETON_ROWS }).map((_, rowIdx) => (
        <Tr key={rowIdx}>
          {COLUMNS.map((_, colIdx) => (
            <Td key={colIdx}>
              <SkeletonCell />
            </Td>
          ))}
        </Tr>
      ))
    }

    if (isError) {
      return (
        <tr>
          <ErrorCell colSpan={COLUMNS.length}>Error al cargar los turnos. Intenta nuevamente.</ErrorCell>
        </tr>
      )
    }

    if (tableData.length === 0) {
      return (
        <tr>
          <CenterCell colSpan={COLUMNS.length}>No se encontraron turnos con los filtros aplicados.</CenterCell>
        </tr>
      )
    }

    return table.getRowModel().rows.map((row) => (
      <Tr key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <Td key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </Td>
        ))}
      </Tr>
    ))
  }

  return (
    <TableWrapper>
      <StyledTable>
        <Thead>
          <tr>
            {table.getHeaderGroups().flatMap((hg) =>
              hg.headers.map((header) => {
                const sortable = header.column.getCanSort()
                const sorted = header.column.getIsSorted()
                return (
                  <Th
                    key={header.id}
                    $sortable={sortable}
                    onClick={sortable ? header.column.getToggleSortingHandler() : undefined}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {sortable && (
                      <SortIndicator>
                        {sorted === 'asc' ? '↑' : sorted === 'desc' ? '↓' : '↕'}
                      </SortIndicator>
                    )}
                  </Th>
                )
              })
            )}
          </tr>
        </Thead>
        <tbody>{renderBody()}</tbody>
      </StyledTable>
    </TableWrapper>
  )
}
