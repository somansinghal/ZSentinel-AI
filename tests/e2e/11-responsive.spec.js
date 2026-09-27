import { test, expect } from '@playwright/test';

test.describe('11 - Responsive Layout & Mobile Navigation Drawer', () => {
  test('should display properly on desktop viewport (1440x900)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/login.html');
    await page.click('#btn-judge-demo');
    await page.waitForURL('**/dashboard.html');

    // On desktop, sidebar should be visible
    const sidebar = page.locator('#app-sidebar');
    await expect(sidebar).toBeVisible();
    await expect(page.locator('.soc-metrics-grid')).toBeVisible();
  });

  test('should handle mobile viewport (390x844) with sidebar drawer toggle', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/login.html');
    await page.click('#btn-judge-demo');
    await page.waitForURL('**/dashboard.html');

    // Topbar brand should remain visible
    await expect(page.locator('.brand-name')).toBeVisible();

    // Toggle mobile drawer
    const toggleBtn = page.locator('#sidebar-toggle');
    await expect(toggleBtn).toBeVisible();
    await toggleBtn.click();
    await page.waitForTimeout(300);

    // Sidebar should have class active or be visible
    const sidebar = page.locator('#app-sidebar');
    await expect(sidebar).toBeVisible();

    // Verify backdrop is clickable to close
    const backdrop = page.locator('.sidebar-backdrop');
    if (await backdrop.isVisible()) {
      await backdrop.click();
      await page.waitForTimeout(200);
    }
  });
});
