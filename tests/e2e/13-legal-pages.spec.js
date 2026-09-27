import { test, expect } from '@playwright/test';

const legalPages = [
  { path: '/legal/privacy-policy.html', expectedTitle: 'Privacy Policy' },
  { path: '/legal/terms-of-service.html', expectedTitle: 'Terms of Service' },
  { path: '/legal/cookie-policy.html', expectedTitle: 'Cookie Policy' },
  { path: '/legal/acceptable-use.html', expectedTitle: 'Acceptable Use' },
  { path: '/legal/security.html', expectedTitle: 'Security' },
  { path: '/legal/ai-disclaimer.html', expectedTitle: 'AI Disclaimer' },
  { path: '/legal/data-processing.html', expectedTitle: 'Data Processing' },
  { path: '/legal/third-party-services.html', expectedTitle: 'Third-Party Services' },
  { path: '/legal/accessibility.html', expectedTitle: 'Accessibility' },
  { path: '/legal/contact.html', expectedTitle: 'Contact' },
];

test.describe('13 - Legal & Compliance Suite Verification', () => {
  for (const pageInfo of legalPages) {
    test(`should load ${pageInfo.path} without errors and with proper disclaimer`, async ({ page }) => {
      const consoleErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });

      const response = await page.goto(pageInfo.path);
      expect(response?.status()).toBe(200);

      // Verify title & brand
      await expect(page).toHaveTitle(new RegExp(pageInfo.expectedTitle, 'i'));
      await expect(page).toHaveTitle(/Z-SENTINEL AI/i);

      // Verify H1 heading
      const heading = page.locator('h1.legal-title');
      await expect(heading).toBeVisible();

      // Verify hackathon disclaimer box
      const disclaimer = page.locator('.legal-disclaimer-box');
      await expect(disclaimer).toBeVisible();
      await expect(disclaimer).toContainText('Important Hackathon Notice');

      // Verify topbar navigation exists
      await expect(page.locator('.glass-topbar')).toBeVisible();

      // Verify footer legal links exist
      const footer = page.locator('.legal-footer');
      await expect(footer).toBeVisible();
      await expect(footer.locator('a[href*="privacy-policy.html"]')).toBeVisible();
      await expect(footer.locator('a[href*="terms-of-service.html"]')).toBeVisible();

      // Ensure no uncaught script errors
      expect(consoleErrors.length).toBe(0);
    });
  }
});
