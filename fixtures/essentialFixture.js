import { test as base, chromium } from '@playwright/test';
import { ProductListingPage } from '../pages/ProductListingPage.js';
import { Homepage } from '../pages/Homepage.js';
import path from "path";

let browser;

export const test = base.extend({
  context: async ({}, use) => {
    const storagePath = path.resolve('auth-storage.json');
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({ storageState: storagePath });
    await use(context);
  },

  page: async ({ context }, use) => {
    const page = await context.newPage();
    await page.goto('https://magento.softwaretestingboard.com/customer/account/');
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
