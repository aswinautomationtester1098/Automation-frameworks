export const GenericActions = {
    async click(_, locator) {
        await locator.click();
    },

    async inputText(_, locator, value) {
        await locator.fill(value);
    },

    async assertText(_, locator, expected) {
        const actual = await locator.textContent();
        if (!actual.includes(expected)) {
            throw new Error(`Expected "${expected}" but got "${actual}"`);
        }
    },

    async goto(_, __, url) {
        await _.goto(url);
    },

    async checkVisible(_, locator) {
        await expect(locator).toBeVisible();
    },

    async selectOption(_, locator, value) {
        await locator.selectOption(value);
    },

    async customClick(pageObject, locator, _, pageObjects) {
        if (pageObject?.customClick) {
            await pageObject.customClick(locator, pageObjects);
        } else {
            throw new Error("Custom page object or method missing");
        }
    },
    async printTitle(page)
    {
        const title = await page.title();
        console.log(`Page title is ${title}`);
    }
};
