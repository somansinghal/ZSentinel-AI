import { test, expect } from '@playwright/test';

test.describe('04 - Security Operations Console Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Initialize in Judge Demo mode
    await page.goto('/login.html');
    await page.click('#btn-judge-demo');
    await page.waitForURL('**/dashboard.html');
  });

  test('should render SOC header, defense status, and simulation banner', async ({ page }) => {
    await expect(page).toHaveTitle(/Security Console/i);
    await expect(page.locator('.brand-name')).toHaveText('Z-SENTINEL AI');
    await expect(page.locator('.security-health-pill')).toContainText('DEFENSE STATUS: ACTIVE');
    await expect(page.locator('.sim-mode-banner')).toBeVisible();
    await expect(page.locator('.sim-banner-title')).toContainText('DEMO / SIMULATED IBM Z EVENT STREAM');
    await expect(page.locator('#judge-demo-banner')).toBeVisible();
  });

  test('should render all 7 core SOC telemetry metrics', async ({ page }) => {
    await expect(page.locator('#metric-total-tx')).toBeVisible();
    await expect(page.locator('#metric-analyzed-tx')).toBeVisible();
    await expect(page.locator('#metric-threats')).toBeVisible();
    await expect(page.locator('#metric-critical-threats')).toBeVisible();
    await expect(page.locator('#metric-avg-risk')).toBeVisible();
    await expect(page.locator('#metric-pii-redacted')).toBeVisible();
    await expect(page.locator('#metric-stream-latency')).toBeVisible();
  });

  test('should render charts and interactive scenario chips', async ({ page }) => {
    // Canvas elements
    await expect(page.locator('#chart-risk-trend')).toBeVisible();
    await expect(page.locator('#chart-threat-categories')).toBeVisible();

    // Scenario bar
    await expect(page.locator('.scenario-bar-container')).toBeVisible();
    const suspiciousBtn = page.locator('#btn-scen-suspicious');
    await expect(suspiciousBtn).toBeVisible();
    await suspiciousBtn.click();
    await page.waitForTimeout(400);

    // Live sync button
    const syncBtn = page.locator('#btn-refresh-telemetry');
    await expect(syncBtn).toBeVisible();
    await syncBtn.click();
  });
});
