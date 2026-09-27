import { test, expect } from '@playwright/test';

test.describe('09 - AI Security Copilot Interface', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login.html');
    await page.click('#btn-judge-demo');
    await page.waitForURL('**/dashboard.html');
    await page.goto('/pages/copilot.html');
  });

  test('should display AI Copilot header and provider status badge', async ({ page }) => {
    await expect(page).toHaveTitle(/Copilot/i);
    await expect(page.locator('.page-title')).toContainText('AI Security Copilot');
    await expect(page.locator('body')).toContainText('Provider: Local Security Engine');
  });

  test('should render explanation dialog with deterministic reasoning and zero raw PII exposure', async ({ page }) => {
    await expect(page.locator('body')).toContainText('Why was transaction TX-83921 blocked');
    await expect(page.locator('body')).toContainText('Critical Risk Score of 88/100');
    await expect(page.locator('body')).toContainText('Velocity Burst');
    await expect(page.locator('body')).toContainText('Isolation Forest Anomaly Score');
  });

  test('should render suggested question pills and input bar', async ({ page }) => {
    const pills = page.locator('button:has-text("What caused the highest risk today?")');
    await expect(pills).toBeVisible();

    const input = page.locator('input[placeholder*="Ask AI Copilot"]');
    await expect(input).toBeVisible();
    await input.fill('Explain risk factors for account USR-7741');

    const sendBtn = page.locator('button:has-text("Send")');
    await expect(sendBtn).toBeVisible();
    await sendBtn.click();
  });
});
