import { test, expect } from '@playwright/test';

test.describe('14 - SEO, Metadata & Discoverability Verification', () => {
  test('index.html should have complete SEO meta, Open Graph, and Twitter tags', async ({ page }) => {
    await page.goto('/index.html');

    // Title & Viewport
    await expect(page).toHaveTitle(/Z-SENTINEL AI/i);
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute('content', /width=device-width/);

    // Meta Description
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /.+/);
    const descContent = await description.getAttribute('content');
    expect(descContent.length).toBeGreaterThan(20);

    // Canonical link
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /https:\/\/z-sentinel\.vercel\.app\/?/);

    // Open Graph
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /.+/);

    // Twitter Card
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute('content', /.+/);

    // Favicon & Web Manifest
    await expect(page.locator('link[rel*="icon"]').first()).toBeAttached();
    await expect(page.locator('link[rel="manifest"]')).toBeAttached();
  });

  test('index.html should contain valid JSON-LD SoftwareApplication schema', async ({ page }) => {
    await page.goto('/index.html');
    const jsonLdScript = page.locator('script[type="application/ld+json"]');
    await expect(jsonLdScript).toBeAttached();

    const rawJson = await jsonLdScript.textContent();
    const parsed = JSON.parse(rawJson);
    expect(parsed['@context']).toBe('https://schema.org');
    expect(parsed['@type']).toBe('SoftwareApplication');
    expect(parsed['name']).toBe('Z-Sentinel AI');
  });

  test('robots.txt should be accessible and well-formed', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(res.status()).toBe(200);
    const text = await res.text();
    expect(text).toContain('User-agent:');
    expect(text).toContain('Sitemap:');
  });

  test('sitemap.xml should be accessible and list legal & core pages', async ({ request }) => {
    const res = await request.get('/sitemap.xml');
    expect(res.status()).toBe(200);
    const text = await res.text();
    expect(text).toContain('<urlset');
    expect(text).toContain('https://z-sentinel.vercel.app/legal/privacy-policy.html');
    expect(text).toContain('https://z-sentinel.vercel.app/legal/terms-of-service.html');
  });

  test('google-site-verification HTML file and meta tag should be present', async ({ page, request }) => {
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
});
