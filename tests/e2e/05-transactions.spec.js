import { test, expect } from '@playwright/test';

test.describe('05 - Mainframe Transactions Telemetry & Simulation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login.html');
    await page.click('#btn-judge-demo');
    await page.waitForURL('**/dashboard.html');
    await page.goto('/pages/transactions.html');
  });

  test('should display transaction page title, stream banner, and simulator controls', async ({ page }) => {
    await expect(page).toHaveTitle(/Transactions/i);
    await expect(page.locator('.page-title')).toContainText('High-Throughput Mainframe Transactions');
    await expect(page.locator('#btn-sim-normal')).toBeVisible();
    await expect(page.locator('#btn-sim-attack')).toBeVisible();
  });

  test('should render sample transaction stream table with synthetic records', async ({ page }) => {
    const dataTable = page.locator('.data-table');
    await expect(dataTable).toBeVisible();
    await expect(dataTable.locator('th').nth(0)).toContainText('TX ID');
    await expect(dataTable.locator('tbody tr')).toHaveCount(5);

    // Verify first row contains synthetic prefix
    const firstRow = dataTable.locator('tbody tr').first();
    await expect(firstRow).toContainText('TX-9482');
    await expect(firstRow).toContainText('USER-8492');
  });

  test('should allow clicking simulation buttons without errors', async ({ page }) => {
    const normalBtn = page.locator('#btn-sim-normal');
    await normalBtn.click();
    await page.waitForTimeout(300);

    const attackBtn = page.locator('#btn-sim-attack');
    await attackBtn.click();
    await page.waitForTimeout(300);
  });
});
