import { test as base, chromium } from '@playwright/test';
import { ProductListingPage } from '../pages/ProductListingPage.js';
import { Homepage } from '../pages/Homepage.js';
import path from 'path';
import { url } from '../utils/requiredUrl.js';

let browser;

export const test = base.extend({
  moduleName: [async ({}, use) => {
    await use('Homepage');
  }, { auto: true }],

  context: async ({}, use) => {
    const storagePath = path.resolve('auth-storage.json');
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({ storageState: storagePath });
    await use(context);
  },

  page: async ({ context, moduleName }, use) => {
    const page = await context.newPage();
    const startUrl = url[moduleName] || url.Homepage;
    console.log(`Navigating to: ${startUrl} for module: ${moduleName}`);
    await page.goto(startUrl);
    await use(page);
  },

  homepage: async ({ page }, use) => {
    await use(new Homepage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductListingPage(page));
  },
});

export const teardown = async () => {
  await browser?.close();
};
