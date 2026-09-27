import { test, expect } from '@playwright/test';

test.describe('02 - Authentication Portal', () => {
  test('should display clearly separated Authenticated Access and Judge Demo sections', async ({ page }) => {
    await page.goto('/login.html');

    // Branding
    await expect(page.locator('.auth-title')).toHaveText('Z-SENTINEL AI');
    await expect(page.locator('.auth-subtitle')).toContainText('AI Security & Privacy Guardian');

    // Separated Section 1: Authenticated Access
    await expect(page.locator('.auth-access-section')).toBeVisible();
    await expect(page.locator('#btn-google-login')).toBeVisible();
    await expect(page.locator('#btn-text')).toContainText('Continue with Google');

    // Separated Section 2: Judge Demo Mode
    await expect(page.locator('.judge-demo-section')).toBeVisible();
    await expect(page.locator('#btn-judge-demo')).toBeVisible();
    await expect(page.locator('#judge-btn-text')).toContainText('Enter Judge Demo');

    // Footer legal links
    await expect(page.locator('a[href*="privacy-policy.html"]')).toBeVisible();
    await expect(page.locator('a[href*="terms-of-service.html"]')).toBeVisible();
    await expect(page.locator('a[href*="security.html"]')).toBeVisible();
  });
});
