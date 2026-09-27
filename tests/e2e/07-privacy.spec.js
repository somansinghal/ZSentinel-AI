import { test, expect } from '@playwright/test';

test.describe('07 - Privacy Guardian & PII Redactor', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login.html');
    await page.click('#btn-judge-demo');
    await page.waitForURL('**/dashboard.html');
    await page.goto('/pages/privacy.html');
  });

  test('should display privacy page title and zero data leakage policy', async ({ page }) => {
    await expect(page).toHaveTitle(/Privacy/i);
    await expect(page.locator('.page-title')).toContainText('Privacy Guardian & PII Redactor');
    await expect(page.locator('.card-title').first()).toContainText('Zero Data Leakage Policy');
  });

  test('should display masked values for PAN, SSN, email, and phone', async ({ page }) => {
    const table = page.locator('.data-table');
    await expect(table).toBeVisible();

    // Verify PAN masking
    await expect(table).toContainText('************3210');
    // Verify SSN masking
    await expect(table).toContainText('*****4321');
    // Verify Email obfuscation
    await expect(table).toContainText('s***r@mainframe-bank.com');
    // Verify Phone masking
    await expect(table).toContainText('+1 (555) ***-6543');

    // Verify compliance status badges
    await expect(table.locator('.badge-low').first()).toContainText('Automasked & Audited');
  });
});
