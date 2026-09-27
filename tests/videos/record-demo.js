/**
 * Z-SENTINEL AI — Demo Video Recording Script
 * IBM Z Datathon 2026
 *
 * Records a smooth 1280x720 (16:9) video walkthrough of the Judge Demo flow:
 * Landing -> Login -> Enter Judge Demo -> Dashboard -> Suspicious TX ->
 * Threat Detection -> Privacy Guardian -> Copilot -> IBM Z Mainframe -> Audit Log
 *
 * Output is saved directly to: artifacts/videos/
 */

import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = path.resolve(process.cwd(), 'artifacts/videos');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

async function recordDemo() {
  console.log(`Recording Z-Sentinel AI Judge Demo Walkthrough against ${BASE_URL}...`);

  const browser = await chromium.launch({
    headless: true
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: OUTPUT_DIR,
      size: { width: 1280, height: 720 }
    }
  });

  const page = await context.newPage();

  // 1. Landing Page
  console.log('1. Landing page...');
  await page.goto(`${BASE_URL}/index.html`);
  await page.waitForTimeout(2000);

  // 2. Click CTA to Login
  console.log('2. Navigating to Login...');
  await page.click('#btn-hero-enter');
  await page.waitForURL('**/login.html');
  await page.waitForTimeout(2000);

  // 3. Enter Judge Demo Mode
  console.log('3. Entering Judge Demo Mode...');
  await page.click('#btn-judge-demo');
  await page.waitForURL('**/dashboard.html');
  await page.waitForTimeout(2500);

  // 4. Trigger Suspicious Transaction Scenario
  console.log('4. Triggering Suspicious TX scenario...');
  const suspiciousBtn = page.locator('#btn-scen-suspicious');
  if (await suspiciousBtn.isVisible()) {
    await suspiciousBtn.click();
    await page.waitForTimeout(2000);
  }

  // 5. Navigate to Threat Detection
  console.log('5. Viewing Threat Detection Center...');
  await page.goto(`${BASE_URL}/pages/threats.html`);
  await page.waitForTimeout(2500);

  // 6. Navigate to Privacy Guardian
  console.log('6. Viewing Privacy Guardian PII Redaction...');
  await page.goto(`${BASE_URL}/pages/privacy.html`);
  await page.waitForTimeout(2500);

  // 7. Navigate to AI Copilot
  console.log('7. Viewing AI Security Copilot...');
  await page.goto(`${BASE_URL}/pages/copilot.html`);
  await page.waitForTimeout(2500);

  // 8. Navigate to IBM Z Mainframe Telemetry
  console.log('8. Viewing IBM Z Mainframe Integration...');
  await page.goto(`${BASE_URL}/pages/ibmz.html`);
  await page.waitForTimeout(2500);

  // 9. Navigate to System Audit Logs
  console.log('9. Viewing System Audit Logs...');
  await page.goto(`${BASE_URL}/pages/audit.html`);
  await page.waitForTimeout(2500);

  // 10. Exit Demo Mode
  console.log('10. Exiting Judge Demo...');
  const exitBtn = page.locator('#btn-exit-judge-demo');
  if (await exitBtn.isVisible()) {
    await exitBtn.click();
    await page.waitForURL('**/login.html');
    await page.waitForTimeout(1500);
  }

  // Finalize video
  await page.close();
  await context.close();
  await browser.close();

  console.log(`\nDemo recording completed. Video stored in: ${OUTPUT_DIR}`);
}

recordDemo().catch((err) => {
  console.error('Demo recording error:', err);
  process.exit(1);
});
