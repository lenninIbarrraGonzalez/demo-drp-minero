import { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Button } from '@/shared/components/atoms/Button'
import { Modal } from '@/shared/components/molecules/Modal'
import { useEquipment } from '../hooks/useEquipment'
import { useEquipmentMutations } from '../hooks/useEquipmentMutations'
import { useEquipmentFiltersStore } from '../store/equipmentFiltersStore'
import { EquipmentTable } from './EquipmentTable'
import { EquipmentFilters } from './EquipmentFilters'
import { EquipmentForm } from './EquipmentForm'
import type { Equipment, CreateEquipmentDto } from '../types'

type ModalMode = null | 'create' | Equipment

function isEditingEquipment(mode: ModalMode): mode is Equipment {
  return mode !== null && mode !== 'create'
}

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

export function EquipmentPage() {
  const [modalMode, setModalMode] = useState<ModalMode>(null)
  const { page, pageSize, setPage } = useEquipmentFiltersStore()
  const { data, isLoading, isError } = useEquipment()
  const { createEquipment, updateEquipment, deleteEquipment } = useEquipmentMutations()

  const total = data?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  const isEditing = isEditingEquipment(modalMode)
  const isMutating = createEquipment.isPending || updateEquipment.isPending

  const handleSubmit = useCallback((dto: CreateEquipmentDto) => {
    if (isEditingEquipment(modalMode)) {
      updateEquipment.mutate(
        { id: modalMode.id, dto },
        { onSuccess: () => setModalMode(null) }
      )
    } else {
      createEquipment.mutate(dto, { onSuccess: () => setModalMode(null) })
    }
  }, [modalMode, createEquipment, updateEquipment])

  return (
    <Page>
      <TopBar>
        <PageTitle>Equipos</PageTitle>
        <Button variant="primary" size="sm" onClick={() => setModalMode('create')}>
          Nuevo Equipo
        </Button>
      </TopBar>

      <EquipmentFilters />

      <EquipmentTable
        data={data?.data}
        isLoading={isLoading}
        isError={isError}
        onEdit={(equipment) => setModalMode(equipment)}
        onDelete={(id) => deleteEquipment.mutate(id)}
      />

      <PaginationBar>
        <PaginationInfo>
          {total === 0
            ? 'Sin resultados'
            : `Mostrando ${start}–${end} de ${total} equipos`}
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

      <Modal
        isOpen={modalMode !== null}
        onClose={() => setModalMode(null)}
        title={isEditing ? 'Editar Equipo' : 'Nuevo Equipo'}
      >
        <EquipmentForm
          defaultValues={isEditingEquipment(modalMode) ? modalMode : undefined}
          onSubmit={handleSubmit}
          onCancel={() => setModalMode(null)}
          isLoading={isMutating}
        />
      </Modal>
    </Page>
  )
}
