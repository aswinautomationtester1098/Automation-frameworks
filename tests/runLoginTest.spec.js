import { test } from '@playwright/test';
import { KeywordEngine } from '../keyword-engine/KeywordEngine.js';
import { GenericActions } from '../Genericactions.js';

test('Login to Magento website', async ({ page }) => {
    const engine = new KeywordEngine(page, GenericActions);
    await engine.TestRunner('LoginTest');
});
