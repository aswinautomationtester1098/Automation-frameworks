import fs from 'fs';
import path from 'path';

export class KeywordEngine {
    constructor(page, actions, pageObjects = {}) {
        this.page = page;
        this.actions = actions;
        this.pageObjects = pageObjects;
    }

    async ExecuteTestcase(moduleName, testCaseName, userKey = '') {
        const keywordPath = path.resolve(`./keyword-data/${moduleName}.json`);
        const dataPath = path.resolve(`./test-data/${moduleName}.json`);
        const loginDataPath = path.resolve('./test-data/LoginTest.json');

        // Load test steps
        const allTestCases = JSON.parse(fs.readFileSync(keywordPath));
        const test = allTestCases.find(tc => tc.testCase === testCaseName);
        if (!test) throw new Error(`Test case '${testCaseName}' not found in ${keywordPath}`);

        const steps = test.steps;

        const moduleData = fs.existsSync(dataPath) ? JSON.parse(fs.readFileSync(dataPath)) : {};
        const loginData = this.resolveLoginData(loginDataPath, userKey);

        for (const step of steps) {
            const { action, pageObject, selector, testDataKey, value, description } = step;
            try {
                console.log(`Executing: ${description}`);
                const actionFunc = this.actions[action];
                if (!actionFunc) throw new Error(`Action "${action}" not defined`);

                const targetPage = pageObject ? this.pageObjects[pageObject] : null;
                const locator = this.resolveLocator(selector, pageObject, value);

                const input = testDataKey
                    ? loginData[testDataKey] ?? moduleData[testDataKey] ?? value
                    : value;

                await actionFunc(targetPage || this.page, locator, input, this.pageObjects);
                console.log(`Passed: ${description}`);
            } catch (err) {
                console.error(`Failed: ${description}\n-> ${err.message}`);
                await this.page.screenshot({ path: `screenshots/${Date.now()}_${action}.png` });
            }
        }
    }

    resolveLoginData(loginDataPath, userKey) {
        if (!fs.existsSync(loginDataPath)) return {};

        const rawLogin = JSON.parse(fs.readFileSync(loginDataPath));
        const userConfig = rawLogin[userKey] || {};

        const resolved = {};
        for (const [key, envKey] of Object.entries(userConfig)) {
            resolved[key] = process.env[envKey] || envKey;
        }

        console.log('Resolved login data for', userKey, resolved);
        return resolved;
    }

    resolveLocator(selector, pageObject, valueKey) {
        if (selector) return this.page.locator(selector);

        if (pageObject && valueKey) {
            const pageObj = this.pageObjects[pageObject];
            if (!pageObj) throw new Error(`PageObject "${pageObject}" not found`);
            if (!pageObj[valueKey]) throw new Error(`Locator "${valueKey}" not found in "${pageObject}"`);
            return pageObj[valueKey];
        }

        return null;
    }
}
