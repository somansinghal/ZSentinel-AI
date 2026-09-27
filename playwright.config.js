import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'on',
  },
  projects: [
    {
      name: 'desktop-chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 }
      },
    },
    {
      name: 'mobile-viewport',
      use: {
        ...devices['iPhone 14'],
        viewport: { width: 390, height: 844 }
      },
    },
  ],
  webServer: {
    command: 'python3 -m http.server 3000 --directory public',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: true,
    timeout: 120000,
  },
});
