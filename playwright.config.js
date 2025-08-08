// @ts-check
import { defineConfig, devices } from '@playwright/test';
import path from 'path';
require('dotenv').config();
module.exports = defineConfig({
  testDir: './tests',
  workers: process.env.CI ? 2 : 4,
  timeout: 60000,
  globalSetup: "./global-setup.js",
  globalTeardown: './global-teardown.js',
  fullyParallel: true,
  retries: 0,
  reporter: [['allure-playwright'], ['html', { open: 'never' }]],
  use: {
    trace: 'on-first-retry',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: path.resolve(__dirname, 'auth-storage-chromium.json'),
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: path.resolve(__dirname, 'auth-storage-firefox.json'),
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        storageState: path.resolve(__dirname, 'auth-storage-webkit.json'),
      },
    },
  ],
});

