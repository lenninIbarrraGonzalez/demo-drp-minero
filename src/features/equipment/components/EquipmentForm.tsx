import { useEffect, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import styled from 'styled-components'
import { FormField } from '@/shared/components/molecules/FormField'
import { Button } from '@/shared/components/atoms/Button'
import { Label } from '@/shared/components/atoms/Label'
import { Dropdown } from '@/shared/components/molecules/Dropdown'
import { useMineStore } from '@/features/dashboard/store/mineStore'
import type { Equipment, CreateEquipmentDto, EquipmentStatus } from '../types'
import { EQUIPMENT_TYPES, EQUIPMENT_STATUS_LABELS } from '../types'

interface EquipmentFormProps {
  defaultValues?: Equipment
  onSubmit: (data: CreateEquipmentDto) => void
  onCancel: () => void
  isLoading: boolean
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing[4]};
`

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`

const ErrorText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.accent.danger};
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[2]};
`

const STATUS_OPTIONS = Object.entries(EQUIPMENT_STATUS_LABELS).map(([value, label]) => ({
  label,
  value: value as EquipmentStatus,
}))

const TYPE_OPTIONS = EQUIPMENT_TYPES.map((t) => ({ label: t, value: t }))

export function EquipmentForm({ defaultValues, onSubmit, onCancel, isLoading }: EquipmentFormProps) {
  const mines = useMineStore((s) => s.mines)

  const mineOptions = useMemo(() => mines.map((m) => ({ label: m.name, value: m.id })), [mines])

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateEquipmentDto>({
    defaultValues: defaultValues
      ? {
          name: defaultValues.name,
          type: defaultValues.type,
          serialNumber: defaultValues.serialNumber,
          status: defaultValues.status,
          mineId: defaultValues.mineId,
          lastMaintenanceDate: defaultValues.lastMaintenanceDate,
        }
      : {
          status: 'operativo',
          mineId: mines[0]?.id ?? '',
          type: EQUIPMENT_TYPES[0],
        },
  })

  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name,
        type: defaultValues.type,
        serialNumber: defaultValues.serialNumber,
        status: defaultValues.status,
        mineId: defaultValues.mineId,
        lastMaintenanceDate: defaultValues.lastMaintenanceDate,
      })
    }
  }, [defaultValues, reset])

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Row>
        <FormField
          id="name"
          label="Nombre"
          required
          error={errors.name?.message}
          {...register('name', {
            required: 'El nombre es requerido',
            minLength: { value: 2, message: 'Mínimo 2 caracteres' },
          })}
        />

        <FormField
          id="serialNumber"
          label="Número de serie"
          required
          error={errors.serialNumber?.message}
          {...register('serialNumber', { required: 'El número de serie es requerido' })}
        />
      </Row>

      <Row>
        <FieldGroup>
          <Label htmlFor="type" required>Tipo</Label>
          <Controller
            name="type"
            control={control}
            rules={{ required: 'El tipo es requerido' }}
            render={({ field }) => (
              <Dropdown
                id="type"
                options={TYPE_OPTIONS}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                aria-label="Tipo de equipo"
              />
            )}
          />
          {errors.type && <ErrorText role="alert">{errors.type.message}</ErrorText>}
        </FieldGroup>

        <FieldGroup>
          <Label htmlFor="status" required>Estado</Label>
          <Controller
            name="status"
            control={control}
            rules={{ required: 'El estado es requerido' }}
            render={({ field }) => (
              <Dropdown
                id="status"
                options={STATUS_OPTIONS}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value as EquipmentStatus)}
                aria-label="Estado del equipo"
              />
            )}
          />
          {errors.status && <ErrorText role="alert">{errors.status.message}</ErrorText>}
        </FieldGroup>
      </Row>

      <Row>
        <FieldGroup>
          <Label htmlFor="mineId" required>Mina</Label>
          <Controller
            name="mineId"
            control={control}
            rules={{ required: 'La mina es requerida' }}
            render={({ field }) => (
              <Dropdown
                id="mineId"
                options={mineOptions}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                aria-label="Mina asignada"
              />
            )}
          />
          {errors.mineId && <ErrorText role="alert">{errors.mineId.message}</ErrorText>}
        </FieldGroup>

        <FormField
          id="lastMaintenanceDate"
          label="Última mantención"
          type="date"
          required
          error={errors.lastMaintenanceDate?.message}
          {...register('lastMaintenanceDate', { required: 'La fecha de mantención es requerida' })}
        />
      </Row>

      <Actions>
        <Button type="button" variant="ghost" size="sm" onClick={onCancel} disabled={isLoading}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" size="sm" disabled={isLoading} isLoading={isLoading}>
          Guardar
        </Button>
      </Actions>
    </Form>
  )
}
