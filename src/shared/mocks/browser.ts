import { setupWorker } from 'msw/browser'
import { authHandlers } from './authHandlers'
import { dashboardHandlers } from './dashboardHandlers'

export const worker = setupWorker(...authHandlers, ...dashboardHandlers)
