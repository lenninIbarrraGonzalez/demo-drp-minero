import { setupWorker } from 'msw/browser'
import { authHandlers } from './authHandlers'
import { dashboardHandlers } from './dashboardHandlers'
import { operationsHandlers } from './operationsHandlers'

export const worker = setupWorker(...authHandlers, ...dashboardHandlers, ...operationsHandlers)
