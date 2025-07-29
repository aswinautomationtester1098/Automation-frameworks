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
    await engine.ExecuteTestcase('LoginTest', 'initial login to the application','user2');
    await page.context().storageState({ path: storagePath });
    console.log(`Auth storage saved to ${storagePath}`);
    await browser.close();
};