import fs from 'fs';
import path from 'path';

export class KeywordEngine {
    constructor(page, actions, pageObjects = {}) {
        this.page = page;
        this.actions = actions;
        this.pageObjects = pageObjects;
    }

    async TestRunner(testCaseName) {
        const keywordFilePath = path.resolve(`./keyword-data/${testCaseName}.json`);
        const dataFilePath = path.resolve(`./test-data/${testCaseName}.json`);

        const allTestCases = JSON.parse(fs.readFileSync(keywordFilePath));
        const selectedTest = allTestCases.find(tc => tc.testCase === testCaseName);

        if (!selectedTest) {
            throw new Error(`Test case '${testCaseName}' not found in ${keywordFilePath}`);
        }

        const steps = selectedTest.steps;
        const dataMap = JSON.parse(fs.readFileSync(dataFilePath));

        for (const step of steps) {
            const { action, pageObject, selector, testDataKey, value, description } = step;
            try {
                console.log(`🔹 Executing: ${description}`);
                const locator = selector ? this.page.locator(selector) : null;
                const inputData = testDataKey ? dataMap[testDataKey] : value;
                const actionFunc = this.actions[action];
                const customPage = pageObject ? this.pageObjects[pageObject] : null;

                await actionFunc(customPage || this.page, locator, inputData, this.pageObjects);
                console.log(`Passed: ${description}`);
            } catch (err) {
                console.error(`Failed: ${description}\n-> ${err.message}`);
                await this.page.screenshot({ path: `screenshots/${Date.now()}_${action}.png` });
            }
        }
    }
}
