import { test, expect } from '@playwright/test';

test.describe('06 - Threat Detection Center', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login.html');
    await page.click('#btn-judge-demo');
    await page.waitForURL('**/dashboard.html');
    await page.goto('/pages/threats.html');
  });

  test('should render threat detection header and active status', async ({ page }) => {
    await expect(page).toHaveTitle(/Threats|Threat Detection/i);
    await expect(page.locator('.page-title')).toContainText('Threat Detection Center');
    await expect(page.locator('.page-subtitle')).toContainText('Real-time anomaly identification');
  });

  test('should display threat intelligence table with threat IDs and severity badges', async ({ page }) => {
    const table = page.locator('.data-table');
    await expect(table).toBeVisible();
    await expect(table.locator('th').nth(0)).toContainText('Threat ID');
    await expect(table.locator('th').nth(1)).toContainText('Threat Type');

    // Verify presence of threat badges
    await expect(table.locator('.badge-critical').first()).toBeVisible();
    await expect(table.locator('tbody tr')).toHaveCount(4);

    // Verify first row contains synthetic threat ID
    const firstRow = table.locator('tbody tr').first();
    await expect(firstRow).toContainText('THR-401');
    await expect(firstRow).toContainText('Burst Withdrawal Anomaly');
  });
});
