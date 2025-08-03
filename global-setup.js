import { chromium, firefox, webkit } from "playwright/test";
import { KeywordEngine } from './keyword-engine/KeywordEngine.js';
import { GenericActions } from './Genericactions.js';
import { Homepage } from './pages/Homepage.js';
import { ProductListingPage } from './pages/ProductListingPage.js';
import path from "path";
import { cleanAllureResults, cleanAllureReport, copyEnvFile } from './utils/cleanAllure.js';
import fs from 'fs';

export default async () => {
    cleanAllureResults();
    cleanAllureReport();
    copyEnvFile();

    const browserName = process.env.BROWSER || 'chromium';
    const environment = process.env.ENVIRONMENT || 'Staging';
    const qaName = process.env.QA_NAME || 'Aswin Santhosh';

    let browserType;
    if (browserName === 'firefox') browserType = firefox;
    else if (browserName === 'webkit') browserType = webkit;
    else browserType = chromium;

    console.log(`Generating session for: ${browserName}`);

    const browser = await browserType.launch({ headless: false, slowMo: 500 });
    const page = await browser.newPage();

    const pageObjects = {
        Homepage: new Homepage(page),
        ProductListingPage: new ProductListingPage(page),
    };

    const engine = new KeywordEngine(page, GenericActions, pageObjects);
    await engine.ExecuteTestcase('LoginTest', 'initial login to the application', 'user1');

    const storagePath = path.resolve(`auth-storage-${browserName}.json`);
    await page.context().storageState({ path: storagePath });
    console.log(`Auth storage saved to ${storagePath}`);
    const allureResultsDir = path.resolve('./allure-results');
    if (!fs.existsSync(allureResultsDir)) fs.mkdirSync(allureResultsDir);

    const envPropertyFile = `
Browser=${browserName.charAt(0).toUpperCase() + browserName.slice(1)}
Environment=${environment}
QA=${qaName}
Platform=Magento-Ecommerce
`.trim();

    fs.writeFileSync(path.join(allureResultsDir, 'environment.properties'), envPropertyFile);
    console.log(`Environment properties generated dynamically inside allure-results`);

    await browser.close();
};
