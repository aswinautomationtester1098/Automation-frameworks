import { test as base, chromium, firefox,webkit } from '@playwright/test';
import { ProductListingPage } from '../pages/ProductListingPage.js';
import { Homepage } from '../pages/Homepage.js';
import path from 'path';
import { url } from '../utils/requiredUrl.js';

let browser;

export const test = base.extend({
  moduleName: [async ({ }, use) => {
    await use('Homepage');
  }, { auto: true }],

  context: async ({ }, use, testInfo) => {
    let browserType;
    if (testInfo.project.name === 'firefox') browserType = firefox;
    else if (testInfo.project.name === 'webkit') browserType = webkit;
    else browserType = chromium;
    const storagePath = path.resolve(`auth-storage-${testInfo.project.name}.json`);
    browser = await browserType.launch({ headless: true });
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
