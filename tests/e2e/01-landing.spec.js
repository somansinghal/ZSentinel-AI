import { test, expect } from '@playwright/test';

test.describe('01 - Landing Page Showcase', () => {
  test('should load landing page with branding, hero, telemetry, and sections', async ({ page }) => {
    await page.goto('/index.html');

    // Verify title and branding
    await expect(page).toHaveTitle(/Z-SENTINEL AI/i);
    await expect(page.locator('.hero-title')).toContainText('Z-SENTINEL AI');
    await expect(page.locator('.hero-tagline')).toContainText('Detect threats. Protect data. Decide safely.');

    // Verify telemetry ribbon
    await expect(page.locator('.telemetry-ribbon')).toBeVisible();
    await expect(page.locator('#telemetry-throughput')).toContainText('25,000+');

    // Verify key architectural sections exist
    await expect(page.locator('#problem')).toBeVisible();
    await expect(page.locator('#solution')).toBeVisible();
    await expect(page.locator('#intelligence')).toBeVisible();
    await expect(page.locator('#privacy')).toBeVisible();
    await expect(page.locator('#architecture')).toBeVisible();
    await expect(page.locator('#features')).toBeVisible();

    // Verify CTA navigates to login
    const ctaButton = page.locator('#btn-hero-enter');
    await expect(ctaButton).toBeVisible();
    await ctaButton.click();
    await expect(page).toHaveURL(/login\.html/);
  });
});
