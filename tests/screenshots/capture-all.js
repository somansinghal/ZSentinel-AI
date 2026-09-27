/**
 * Z-SENTINEL AI — Screenshot Automation Engine
 * IBM Z Datathon 2026
 *
 * Captures all required SOC pages across Desktop (1440x900) and Mobile (390x844) viewports.
 * Saves outputs directly to artifacts/screenshots/
 */

import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = path.resolve(process.cwd(), 'artifacts/screenshots');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 }
];

const PAGES_TO_CAPTURE = [
  { slug: 'landing', url: '/index.html' },
  { slug: 'login', url: '/login.html' },
  { slug: 'judge-demo', url: '/dashboard.html', requiresDemo: true },
  { slug: 'dashboard', url: '/dashboard.html', requiresDemo: true },
  { slug: 'transactions', url: '/pages/transactions.html', requiresDemo: true },
  { slug: 'threats', url: '/pages/threats.html', requiresDemo: true },
  { slug: 'privacy', url: '/pages/privacy.html', requiresDemo: true },
  { slug: 'alerts', url: '/pages/alerts.html', requiresDemo: true },
  { slug: 'copilot', url: '/pages/copilot.html', requiresDemo: true },
  { slug: 'ibmz', url: '/pages/ibmz.html', requiresDemo: true },
  { slug: 'audit', url: '/pages/audit.html', requiresDemo: true },
  { slug: 'settings', url: '/pages/settings.html', requiresDemo: true },
  { slug: 'privacy-policy', url: '/legal/privacy-policy.html' },
  { slug: 'terms', url: '/legal/terms-of-service.html' },
  { slug: 'security', url: '/legal/security.html' }
];

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

async function run() {
  console.log(`Starting Z-Sentinel AI Screenshot Capture against ${BASE_URL}...`);
  const browser = await chromium.launch({ headless: true });

  for (const vp of VIEWPORTS) {
    console.log(`\nCapturing Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2
    });

    const page = await context.newPage();

    for (const item of PAGES_TO_CAPTURE) {
      const fullUrl = `${BASE_URL}${item.url}`;
      console.log(`  -> Capturing ${item.slug} (${fullUrl})...`);

      if (item.requiresDemo) {
        // Navigate via login and click judge demo
        await page.goto(`${BASE_URL}/login.html`);
        await page.click('#btn-judge-demo');
        await page.waitForURL('**/dashboard.html');
        if (item.url !== '/dashboard.html') {
          await page.goto(fullUrl);
        }
      } else {
        await page.goto(fullUrl);
      }

      await page.waitForTimeout(500); // Allow fonts & icons to settle
      const filename = path.join(OUTPUT_DIR, `${item.slug}-${vp.name}.png`);
      await page.screenshot({ path: filename, fullPage: false });
      console.log(`     Saved to: ${filename}`);
    }

    await context.close();
  }

  await browser.close();
  console.log('\nAll screenshots captured successfully in artifacts/screenshots/');
}

run().catch((err) => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
