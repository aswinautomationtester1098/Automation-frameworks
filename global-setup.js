import { chromium } from "playwright/test";
import { KeywordEngine } from './keyword-engine/KeywordEngine.js';
import { GenericActions } from './Genericactions.js';
import fs from "fs";
import path from "path";
import { cleanAllureResults, cleanAllureReport, copyEnvFile } from './utils/cleanAllure.js';
export default async () => {
    cleanAllureResults();
    cleanAllureReport();
    copyEnvFile();
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const engine = new KeywordEngine(page, GenericActions);
    //re-using the login keyword json
    const storagePath = path.resolve('auth-storage.json');
    if (!fs.existsSync(storagePath)) {
        await engine.ExecuteTestcase('LoginTest','initial login to the application');
        await page.context().storageState({ path: storagePath });
        console.log(`Auth storage saved to ${storagePath}`);
    } else {
        console.log('auth-storage.json already exists. Reusing it.');
    }
    await browser.close();
};