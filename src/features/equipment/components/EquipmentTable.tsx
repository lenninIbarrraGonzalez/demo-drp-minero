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
import { Button } from '@/shared/components/atoms/Button'
import type { BadgeVariant } from '@/shared/components/atoms/Badge'
import type { Equipment, EquipmentStatus } from '../types'
import { EQUIPMENT_STATUS_LABELS } from '../types'

interface EquipmentTableProps {
  data: Equipment[] | undefined
  isLoading: boolean
  isError: boolean
  onEdit: (equipment: Equipment) => void
  onDelete: (id: string) => void
}

const STATUS_VARIANT: Record<EquipmentStatus, BadgeVariant> = {
  operativo: 'success',
  mantenimiento: 'warning',
  fuera_de_servicio: 'danger',
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

const ActionsCell = styled(Td)`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  align-items: center;
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
const COL_COUNT = 7

export function EquipmentTable({ data, isLoading, isError, onEdit, onDelete }: EquipmentTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])

  const tableData = useMemo(() => data ?? [], [data])

  const columns: ColumnDef<Equipment>[] = useMemo(
    () => [
      { accessorKey: 'name', header: 'Nombre', enableSorting: true },
      { accessorKey: 'type', header: 'Tipo', enableSorting: true },
      { accessorKey: 'serialNumber', header: 'Nro. Serie', enableSorting: false },
      {
        accessorKey: 'status',
        header: 'Estado',
        enableSorting: false,
        cell: ({ getValue }) => {
          const val = getValue<EquipmentStatus>()
          return <Badge variant={STATUS_VARIANT[val]}>{EQUIPMENT_STATUS_LABELS[val]}</Badge>
        },
      },
      { accessorKey: 'lastMaintenanceDate', header: 'Últ. Mantención', enableSorting: true },
      {
        id: 'actions',
        header: 'Acciones',
        enableSorting: false,
        cell: ({ row }) => (
          <ActionsCell>
            <Button variant="ghost" size="sm" onClick={() => onEdit(row.original)}>
              Editar
            </Button>
            <Button variant="danger" size="sm" onClick={() => onDelete(row.original.id)}>
              Eliminar
            </Button>
          </ActionsCell>
        ),
      },
    ],
    [onEdit, onDelete]
  )

  const table = useReactTable({
    data: tableData,
    columns,
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
          {Array.from({ length: COL_COUNT }).map((_, colIdx) => (
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
          <ErrorCell colSpan={COL_COUNT}>Error al cargar los equipos. Intenta nuevamente.</ErrorCell>
        </tr>
      )
    }

    if (tableData.length === 0) {
      return (
        <tr>
          <CenterCell colSpan={COL_COUNT}>No se encontraron equipos con los filtros aplicados.</CenterCell>
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
