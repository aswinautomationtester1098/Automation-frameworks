// @ts-check
import { defineConfig, devices } from '@playwright/test';

module.exports = defineConfig({
  testDir: './tests',
  globalSetup: "./global-setup.js",
  fullyParallel: true,
  retries: 1,
  workers: 1,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    storageState: "auth-storage.json",
    headless: false,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});

