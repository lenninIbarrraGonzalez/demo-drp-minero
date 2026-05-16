import type { RequestHandler } from 'msw'
import { authHandlers } from '@/shared/mocks/authHandlers'
import { dashboardHandlers } from '@/shared/mocks/dashboardHandlers'

export const handlers: RequestHandler[] = [
  ...authHandlers,
  ...dashboardHandlers,
]
