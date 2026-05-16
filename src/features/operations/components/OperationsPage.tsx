import { useMemo } from 'react'
import styled from 'styled-components'
import { Button } from '@/shared/components/atoms/Button'
import { Dropdown } from '@/shared/components/molecules/Dropdown'
import { useShifts } from '../hooks/useShifts'
import { useShiftsFiltersStore } from '../store/shiftsFiltersStore'
import { useMineStore } from '@/features/dashboard/store/mineStore'
import { ShiftFilters } from './ShiftFilters'
import { ShiftsTable } from './ShiftsTable'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
`

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[4]};
`

const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`

const MineSelector = styled.div`
  width: 260px;
`

const PaginationBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};
`

const PaginationInfo = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const PaginationControls = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
`

export function OperationsPage() {
  const { mines, selectedMineId, selectMine } = useMineStore()
  const { page, pageSize, setPage } = useShiftsFiltersStore()
  const { data, isLoading, isError } = useShifts()

  const mineOptions = useMemo(
    () => mines.map((m) => ({ label: m.name, value: m.id })),
    [mines]
  )

  const total = data?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  return (
    <Page>
      <TopBar>
        <PageTitle>Operaciones</PageTitle>
        <MineSelector>
          <Dropdown
            options={mineOptions}
            value={selectedMineId}
            onChange={(e) => selectMine(e.target.value)}
            aria-label="Seleccionar mina"
          />
        </MineSelector>
      </TopBar>

      <ShiftFilters />

      <ShiftsTable data={data?.data} isLoading={isLoading} isError={isError} />

      <PaginationBar>
        <PaginationInfo>
          {total === 0
            ? 'Sin resultados'
            : `Mostrando ${start}–${end} de ${total} turnos`}
        </PaginationInfo>

        <PaginationControls>
          <Button
            variant="secondary"
            size="sm"
            disabled={page <= 1 || isLoading}
            onClick={() => setPage(page - 1)}
          >
            Anterior
          </Button>
          <Button
            variant="secondary"
            size="sm"
            disabled={page >= totalPages || isLoading}
            onClick={() => setPage(page + 1)}
          >
            Siguiente
          </Button>
        </PaginationControls>
      </PaginationBar>
    </Page>
  )
}
