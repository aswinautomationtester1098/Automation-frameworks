import { test } from '../fixtures/essentialFixture.js'
import { KeywordEngine } from '../keyword-engine/KeywordEngine.js';
import { GenericActions } from '../Genericactions.js';
test('Add to cart the product from jackets page', async ({ page, homepage }) => {
    const engine = new KeywordEngine(page, GenericActions, {
        Homepage: homepage
    })
    await engine.TestRunner('Homepage');
});

