import { test, expect } from '@playwright/test';

test.describe('14 - SEO, Author, Contact & Discoverability Verification', () => {
  test('index.html should have exact title, description, author, canonical, Open Graph, and Twitter tags', async ({ page }) => {
    await page.goto('/index.html');

    // 1. Landing page title
    await expect(page).toHaveTitle('Z-Sentinel AI — AI Security & Privacy Guardian for IBM Z');

    // 2. Landing page meta description
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', 'Z-Sentinel AI is an AI-powered security and privacy guardian for IBM Z environments, combining anomaly detection, risk scoring, PII protection, threat monitoring, and an AI security copilot.');

    // 3. Canonical URL
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', 'https://z-sentinel-ai.vercel.app/');

    // 4. Open Graph metadata
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', 'Z-Sentinel AI — AI Security & Privacy Guardian for IBM Z');
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', 'Detect threats. Protect data. Decide safely.');
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', 'https://z-sentinel-ai.vercel.app/');
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute('content', 'Z-Sentinel AI');
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://z-sentinel-ai.vercel.app/assets/og-image.png');

    // 5. Twitter Card
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', 'Z-Sentinel AI — AI Security & Privacy Guardian for IBM Z');
    await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute('content', 'Detect threats. Protect data. Decide safely.');
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', 'https://z-sentinel-ai.vercel.app/assets/og-image.png');

    // 6. Author metadata
    await expect(page.locator('meta[name="author"]')).toHaveAttribute('content', 'Soman Singhal');
    await expect(page.locator('meta[name="creator"]')).toHaveAttribute('content', 'Soman Singhal');

    // 7. Favicon & Web Manifest
    await expect(page.locator('link[rel*="icon"]').first()).toBeAttached();
    await expect(page.locator('link[rel="manifest"]')).toBeAttached();
  });

  test('index.html should contain valid JSON-LD SoftwareApplication schema with author Soman Singhal', async ({ page }) => {
    await page.goto('/index.html');
    const jsonLdScript = page.locator('script[type="application/ld+json"]');
    await expect(jsonLdScript).toBeAttached();

    const rawJson = await jsonLdScript.textContent();
    const parsed = JSON.parse(rawJson);
    expect(parsed['@context']).toBe('https://schema.org');
    expect(parsed['@type']).toBe('SoftwareApplication');
    expect(parsed['name']).toBe('Z-Sentinel AI');
    expect(parsed['url']).toBe('https://z-sentinel-ai.vercel.app/');
    expect(parsed['author']['name']).toBe('Soman Singhal');
    expect(parsed['author']['url']).toBe('https://github.com/somansinghal');
  });

  test('landing page footer should contain author Soman Singhal, mailto, and GitHub links', async ({ page }) => {
    await page.goto('/index.html');
    const footer = page.locator('footer.glass-footer');
    await expect(footer).toBeVisible();

    // Verify author attribution
    await expect(footer).toContainText('Soman Singhal');
    await expect(footer).toContainText('Built by');

    // Verify email link
    const mailto = footer.locator('a[href="mailto:somansinghal06@gmail.com"]');
    await expect(mailto).toBeVisible();
    await expect(mailto).toHaveText('somansinghal06@gmail.com');

    // Verify GitHub link
    const githubLink = footer.locator('a[href="https://github.com/somansinghal/ZSentinel-AI"]');
    await expect(githubLink).toBeVisible();

    // Verify legal links
    await expect(footer.locator('a[href="legal/privacy-policy.html"]')).toBeVisible();
    await expect(footer.locator('a[href="legal/terms-of-service.html"]')).toBeVisible();
    await expect(footer.locator('a[href="legal/contact.html"]')).toBeVisible();
  });

  test('contact.html should display Soman Singhal, working mailto, GitHub, and live website links', async ({ page }) => {
    await page.goto('/legal/contact.html');

    // Verify Title & Meta
    await expect(page).toHaveTitle('Contact | Z-Sentinel AI');
    await expect(page.locator('meta[name="author"]')).toHaveAttribute('content', 'Soman Singhal');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://z-sentinel-ai.vercel.app/legal/contact.html');

    // Verify Author Display
    await expect(page.locator('body')).toContainText('Soman Singhal');

    // Verify mailto link
    const mailtoLink = page.locator('a[href="mailto:somansinghal06@gmail.com"]').first();
    await expect(mailtoLink).toBeVisible();
    await expect(mailtoLink).toHaveAttribute('href', 'mailto:somansinghal06@gmail.com');

    // Verify GitHub repository link
    const githubRepo = page.locator('a[href="https://github.com/somansinghal/ZSentinel-AI"]').first();
    await expect(githubRepo).toBeVisible();

    // Verify Live Website link
    const websiteLink = page.locator('a[href="https://z-sentinel-ai.vercel.app/"]').first();
    await expect(websiteLink).toBeVisible();
  });

  test('robots.txt should be accessible and reference live sitemap domain', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(res.status()).toBe(200);
    const text = await res.text();
    expect(text).toContain('User-agent:');
    expect(text).toContain('Sitemap: https://z-sentinel-ai.vercel.app/sitemap.xml');
  });

  test('sitemap.xml should be accessible and list live https://z-sentinel-ai.vercel.app/ pages', async ({ request }) => {
    const res = await request.get('/sitemap.xml');
    expect(res.status()).toBe(200);
    const text = await res.text();
    expect(text).toContain('<urlset');
    expect(text).toContain('https://z-sentinel-ai.vercel.app/');
    expect(text).toContain('https://z-sentinel-ai.vercel.app/login.html');
    expect(text).toContain('https://z-sentinel-ai.vercel.app/legal/privacy-policy.html');
    expect(text).toContain('https://z-sentinel-ai.vercel.app/legal/contact.html');
  });

  test('google-site-verification HTML file and meta tag should be present and valid', async ({ page, request }) => {
    // Check meta tag on index.html
    await page.goto('/index.html');
    const metaVerification = page.locator('meta[name="google-site-verification"]');
    await expect(metaVerification).toHaveAttribute('content', 'google43d334ab82b2aeee');

    // Check verification HTML file
    const res = await request.get('/google43d334ab82b2aeee.html');
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain('google-site-verification: google43d334ab82b2aeee.html');
  });

  test('mobile viewport (390x844) should not horizontally overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/index.html');
    
    // Check scrollWidth vs clientWidth
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2); // allowance for subpixel rendering
  });
});
