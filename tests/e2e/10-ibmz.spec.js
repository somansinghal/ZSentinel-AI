import { test, expect } from '@playwright/test';

test.describe('10 - IBM Z Mainframe Telemetry & Integration Adapter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login.html');
    await page.click('#btn-judge-demo');
    await page.waitForURL('**/dashboard.html');
    await page.goto('/pages/ibmz.html');
  });

  test('should display IBM Z integration title and prominent simulation disclaimer banner', async ({ page }) => {
    await expect(page).toHaveTitle(/IBM Z/i);
    await expect(page.locator('.page-title')).toContainText('IBM Z Mainframe Integration & Telemetry');
    await expect(page.locator('.sim-mode-banner')).toBeVisible();
    await expect(page.locator('.sim-banner-title')).toContainText('DEMO / SIMULATED IBM Z EVENT STREAM');
  });

  test('should display adapter health tiles and channels table', async ({ page }) => {
    // Health tiles
    await expect(page.locator('.metric-card').first()).toContainText('Simulated Adapter');
    await expect(page.locator('.metric-card').first()).toContainText('IBM z16 / LinuxONE');

    // Ingestion table
    const table = page.locator('.data-table');
    await expect(table).toBeVisible();
    await expect(table.locator('th').nth(0)).toContainText('Channel');
    await expect(table.locator('th').nth(1)).toContainText('Protocol / Target');

    // Ping button
    const pingBtn = page.locator('button:has-text("Ping Adapter")');
    await expect(pingBtn).toBeVisible();
    await pingBtn.click();
    await page.waitForTimeout(300);
  });
});
