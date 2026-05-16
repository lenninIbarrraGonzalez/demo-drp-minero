import { useCallback } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { equipmentService } from '../services/equipmentService'
import type { ApiError } from '@/shared/types/api'
import type { Equipment, CreateEquipmentDto, UpdateEquipmentDto } from '../types'

export function useEquipmentMutations() {
  const queryClient = useQueryClient()

  const invalidate = useCallback(
    () => queryClient.invalidateQueries({ queryKey: ['equipment'] }),
    [queryClient]
  )

  const createEquipment = useMutation<Equipment, ApiError, CreateEquipmentDto>({
    mutationFn: (dto) => equipmentService.createEquipment(dto),
    onSuccess: invalidate,
  })

  const updateEquipment = useMutation<Equipment, ApiError, { id: string; dto: UpdateEquipmentDto }>({
    mutationFn: ({ id, dto }) => equipmentService.updateEquipment(id, dto),
    onSuccess: invalidate,
  })

  const deleteEquipment = useMutation<void, ApiError, string>({
    mutationFn: (id) => equipmentService.deleteEquipment(id),
    onSuccess: invalidate,
  })

  return { createEquipment, updateEquipment, deleteEquipment }
}
