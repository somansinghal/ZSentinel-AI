import { test, expect } from '@playwright/test';

test.describe('03 - Judge Demo Complete Lifecycle Journey', () => {
  test('should walk through entire Judge Demo mode with zero credentials', async ({ page }) => {
    // 1. Landing
    await page.goto('/index.html');
    await page.screenshot({ path: 'artifacts/screenshots/journey-01-landing.png' });

    // 2. Login
    await page.goto('/login.html');
    await page.screenshot({ path: 'artifacts/screenshots/journey-02-login.png' });

    // 3. Enter Judge Demo
    const judgeBtn = page.locator('#btn-judge-demo');
    await expect(judgeBtn).toBeVisible();
    await judgeBtn.click();

    // 4. Dashboard Entry
    await expect(page).toHaveURL(/dashboard\.html/);
    await expect(page.locator('#judge-demo-banner')).toBeVisible();
    await expect(page.locator('#judge-demo-banner')).toContainText('JUDGE DEMO MODE');
    await expect(page.locator('#user-name')).toContainText('IBM Z Datathon Judge');
    await page.screenshot({ path: 'artifacts/screenshots/journey-03-dashboard.png' });

    // 5. Simulate Attack Scenario
    const burstBtn = page.locator('#btn-scen-burst');
    if (await burstBtn.isVisible()) {
      await burstBtn.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: 'artifacts/screenshots/journey-04-scenario-burst.png' });
    }

    // 6. Threat Detection
    await page.goto('/pages/threats.html');
    await expect(page.locator('.page-title')).toContainText('Threat Detection Center');
    await page.screenshot({ path: 'artifacts/screenshots/journey-05-threats.png' });

    // 7. Privacy Guardian
    await page.goto('/pages/privacy.html');
    await expect(page.locator('.page-title')).toContainText('Privacy Guardian');
    await expect(page.locator('body')).toContainText('************3210');
    await page.screenshot({ path: 'artifacts/screenshots/journey-06-privacy.png' });

    // 8. AI Copilot
    await page.goto('/pages/copilot.html');
    await expect(page.locator('.page-title')).toContainText('AI Security Copilot');
    await page.screenshot({ path: 'artifacts/screenshots/journey-07-copilot.png' });

    // 9. IBM Z Integration
    await page.goto('/pages/ibmz.html');
    await expect(page.locator('.page-title')).toContainText('IBM Z Mainframe Integration');
    await page.screenshot({ path: 'artifacts/screenshots/journey-08-ibmz.png' });

    // 10. Audit Logs
    await page.goto('/pages/audit.html');
    await expect(page.locator('.page-title')).toContainText('System Audit Trail');
    await page.screenshot({ path: 'artifacts/screenshots/journey-09-audit.png' });

    // 11. Exit Demo Mode
    const exitBtn = page.locator('#btn-exit-judge-demo');
    await expect(exitBtn).toBeVisible();
    await exitBtn.click();
    await expect(page).toHaveURL(/login\.html/);
    await page.screenshot({ path: 'artifacts/screenshots/journey-10-exit-login.png' });
  });
});
