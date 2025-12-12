import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 45000,  // apply for project
  retries: 0,
  testDir: './tests',
  use: {
    headless: true,
    viewport: { width: 1500, height: 1000 },
    ignoreHTTPSErrors: true,
    actionTimeout: 30000, //apply to all tests
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    launchOptions: {
      args: [
        '--disable-translate',
        '--disable-features=TranslateUI',
      ],
    },
  },
  expect: {
    timeout: 15000, //apply to all tests
  },
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit',
      use: { ...devices['Desktop Safari'] },
    },
    {
        name: 'Pixel_5',
        use: { ...devices['Pixel 5'] },
    },
    {
        name: 'iPhone_13',
        use: { ...devices['iPhone 13'] },
    },
  ]
});
