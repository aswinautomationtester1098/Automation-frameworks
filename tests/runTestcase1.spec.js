import { test } from '../fixtures/essentialFixture.js';
import { KeywordEngine } from '../keyword-engine/KeywordEngine.js';
import { GenericActions } from '../Genericactions.js';

test.describe('Homepage test', () => {
  test.use({ moduleName: 'Homepage' });
  test('jacket option navigation on homepage', async ({ page, homepage }) => {
    const engine = new KeywordEngine(page, GenericActions, {
      Homepage: homepage
    });
    await engine.ExecuteTestcase('Homepage', 'Homepage Navigation: Men > Tops > Jackets', 'user1');
  });
});
test.describe('Product Listing test', () => {
  test.use({ moduleName: 'ProductListingPage' });
  test('Add to cart of a jacket on listing page', async ({ page, productPage }) => {
    const engine = new KeywordEngine(page, GenericActions, {
      ProductListingPage: productPage
    });
    await engine.ExecuteTestcase('ProductListingPage', 'ProductListingPage:Purchasing a jacket', 'user1');
  });
});