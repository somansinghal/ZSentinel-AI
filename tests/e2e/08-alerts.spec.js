import { test, expect } from '@playwright/test';

test.describe('08 - Security Incident Alerts Queue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login.html');
    await page.click('#btn-judge-demo');
    await page.waitForURL('**/dashboard.html');
    await page.goto('/pages/alerts.html');
  });

  test('should display alerts queue header and triage buttons', async ({ page }) => {
    await expect(page).toHaveTitle(/Alerts/i);
    await expect(page.locator('.page-title')).toContainText('Security Incident Alerts');
    await expect(page.locator('.page-subtitle')).toContainText('SOC notification queue');
  });

  test('should render incident table with priority levels and rule triggers', async ({ page }) => {
    const table = page.locator('.data-table');
    await expect(table).toBeVisible();

    // Verify incident rows
    await expect(table).toContainText('ALT-3021');
    await expect(table).toContainText('Rapid Burst Outflow Detected');
    await expect(table.locator('.badge-critical')).toContainText('P1 — CRITICAL');

    await expect(table).toContainText('ALT-3020');
    await expect(table.locator('.badge-high')).toContainText('P2 — HIGH');

    // Verify triage action button is interactive
    const triageBtn = table.locator('button:has-text("Triage")').first();
    await expect(triageBtn).toBeVisible();
    await triageBtn.click();
  });
});
