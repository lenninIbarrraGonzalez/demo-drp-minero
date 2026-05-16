import { test, expect } from '@playwright/test'

test.describe('Flujo completo ERP Minero', () => {
  test('login → dashboard → operaciones → crear equipo', async ({ page }) => {
    // --- Login ---
    await page.goto('/login')
    await page.locator('#email').fill('admin@erp.com')
    await page.locator('#password').fill('password123')
    await page.getByRole('button', { name: /iniciar sesión/i }).click()

    await expect(page).toHaveURL(/\/dashboard/)
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()

    // --- Dashboard: KPI cards y tabs de metales ---
    await expect(page.getByText('Oro').first()).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('Cobre').first()).toBeVisible()

    // --- Operaciones ---
    await page.getByRole('link', { name: /operaciones/i }).click()
    await expect(page).toHaveURL(/\/operations/)
    await expect(page.getByRole('heading', { name: /operaciones/i })).toBeVisible()

    // esperar que la tabla cargue al menos una fila de turno
    await expect(page.getByRole('table')).toBeVisible({ timeout: 10000 })
    const rowCount = await page.getByRole('row').count()
    expect(rowCount).toBeGreaterThanOrEqual(2)

    // --- Equipos: crear nuevo ---
    await page.getByRole('link', { name: /equipos/i }).click()
    await expect(page).toHaveURL(/\/equipment/)
    await expect(page.getByRole('heading', { name: 'Equipos' })).toBeVisible()

    await page.getByRole('button', { name: /nuevo equipo/i }).click()

    const modal = page.getByRole('dialog')
    await expect(modal).toBeVisible()
    await expect(modal.getByText('Nuevo Equipo')).toBeVisible()

    await modal.getByLabel(/nombre/i).fill('Excavadora E2E Test')
    await modal.getByLabel(/número de serie/i).fill('SN-E2E-0001')
    await modal.getByLabel(/última mantención/i).fill('2026-01-15')

    await modal.getByRole('button', { name: /guardar/i }).click()

    await expect(modal).not.toBeVisible({ timeout: 5000 })
    await expect(page.getByText('Excavadora E2E Test')).toBeVisible({ timeout: 5000 })
  })
})
