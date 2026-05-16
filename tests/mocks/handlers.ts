import type { RequestHandler } from 'msw'
import { authHandlers } from '@/shared/mocks/authHandlers'
import { dashboardHandlers } from '@/shared/mocks/dashboardHandlers'
import { operationsHandlers } from '@/shared/mocks/operationsHandlers'
import { equipmentHandlers } from '@/shared/mocks/equipmentHandlers'

export const handlers: RequestHandler[] = [
  ...authHandlers,
  ...dashboardHandlers,
  ...operationsHandlers,
  ...equipmentHandlers,
]
