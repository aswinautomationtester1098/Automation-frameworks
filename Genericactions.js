import { expect } from "playwright/test";

export const GenericActions = {
    async click(page, locator) {
        await locator.click();
    },

    async inputText(page, locator, value) {
        if (!locator) throw new Error("Locator is not correct");
        await locator.fill(value);
    },

    async assertText(page, locator, expected) {
        await expect(locator).toBeVisible();
        const actual = await locator.textContent() || "";
        if (!actual.includes(expected)) {
            throw new Error(`Expected "${expected}" but got "${actual}"`);
        }
    },

    async assertTitle(page, _, expected) {
        const title = await page.title();
        console.log(`DEBUG: Page title = "${title}"`);
        expect(title).toBe(expected);
    },

    async goto(page, _, url) {
        if (typeof url !== 'string') throw new Error(`Expected URL string, got ${typeof url}`);
        await page.goto(url);
    },

    async checkVisible(page, locator) {
        await expect(locator).toBeVisible();
    },

    async selectOption(page, locator, value) {
        await locator.selectOption(value);
    },

    async customClick(pageObject, locator, _, pageObjects) {
        if (pageObject?.customClick) {
            await pageObject.customClick(locator, pageObjects);
        } else {
            throw new Error("Custom page object or method missing");
        }
    },

    async printTitle(page) {
        const title = await page.title();
        console.log(`Page title is: ${title}`);
    },
    async hover(_,locator)
    {
        if(!locator) throw new Error("Tops: Locator not found");
        await locator.hover();
    }
};
