import type { RequestHandler } from 'msw'
import { authHandlers } from '@/shared/mocks/authHandlers'

export const handlers: RequestHandler[] = [
  ...authHandlers,
]
