import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const resultsDir = path.resolve('allure-results');
const reportDir = path.resolve('allure-report');
const keepLimit = 0;
const envFile = 'allure.environment.properties';
const historyFolder = 'history';

// Step 1: Clean old allure-results (keep latest N, preserve env/history)
export function cleanAllureResults() {
  if (!fs.existsSync(resultsDir)) return;

  const files = fs.readdirSync(resultsDir)
    .filter(f => !f.includes(envFile) && !f.startsWith(historyFolder))
    .map(file => ({
      file,
      mtime: fs.statSync(path.join(resultsDir, file)).mtime
    }))
    .sort((a, b) => b.mtime - a.mtime); // Newest first

  const toDelete = files.slice(keepLimit);
  toDelete.forEach(({ file }) => {
    const fullPath = path.join(resultsDir, file);
    fs.rmSync(fullPath, { recursive: true, force: true });
    console.log(`Deleted: ${file}`);
  });

  console.log(`Preserved latest ${keepLimit} result file(s).`);
}

// Step 2: Remove old allure-report
export function cleanAllureReport() {
  if (fs.existsSync(reportDir)) {
    fs.rmSync(reportDir, { recursive: true, force: true });
    console.log('Cleaned: allure-report/');
  }
}

// Step 3: Copy environment file to allure-results (required!)
export function copyEnvFile() {
  const src = path.resolve(envFile); // root folder
  const dest = path.join(resultsDir, envFile); // into allure-results

  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log('Copied environment file to allure-results/');
  } else {
    console.warn(`${envFile} not found in root folder.`);
  }
}

// Step 4: Regenerate Allure Report
export function regenerateReport() {
  try {
    console.log('Generating new Allure report...');
    execSync('npx allure generate allure-results --clean -o allure-report', { stdio: 'inherit' });
    console.log('Allure report generated successfully.');
  } catch (err) {
    console.error('Failed to generate Allure report:', err.message);
  }
}

regenerateReport();
