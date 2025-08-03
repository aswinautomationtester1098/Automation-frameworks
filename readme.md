# Playwright Hybrid-Driven Automation Framework (JavaScript)

A scalable, enterprise-style **Hybrid Test Automation Framework** built using **Playwright and JavaScript**. It combines:

- ✅ Keyword-Driven testing (via JSON step files)
- ✅ Data-Driven testing (via JSON input files)
- ✅ Page Object Model (POM) for modularity
- ✅ Reusable utilities (Generic Actions)
- ✅ Professional Reporting (Allure + HTML)

**Designed to simulate real-world test automation used in modern companies** — ideal for QA job interviews, especially in **Dubai** tech and product companies.

---

## Tech Stack

| Tool        | Purpose                          |
|-------------|----------------------------------|
| Playwright  | Fast browser automation framework |
| JavaScript  | Base scripting language (Node.js) |
| JSON        | Stores test data & test steps     |
| Allure/HTML | Reports with screenshots/logs     |
| POM         | Maintainable and reusable structure |

---

## Folder Structure


---

## ✅ Why This Framework Stands Out

| ✔️ Feature                  | information                                     |
|----------------------------|--------------------------------------------------------------|
| ✅ Hybrid Design            | You understand how to combine data + keyword + modular logic |
| ✅ JSON-Driven Execution    | Easy to maintain, even by non-coders                         |
| ✅ POM + Utility Classes    | Real-world, scalable automation design                       |
| ✅ Professional Reporting   | Shows ownership and stakeholder-readiness                    |
| ✅ Playwright Expertise     | Modern, growing tool in Dubai tech ecosystem                 |
| ✅ Easy GitHub Setup        | They can clone and run in minutes                            |

---

## 🚀 How to Set Up

```bash
git clone https://github.com/your-username/playwright-hybrid-framework.git
cd playwright-hybrid-framework
npm install
npx playwright install
```
## Framework Structure

    playwright-hybrid-framework/
    ├── pages/ → Page Object Model files
    ├── keyword-engine/ → Keyword execution logic
    ├── keyword-data/ → JSON files with step keywords
    ├── test-data/ → JSON files with input values
    ├── utils/ → Generic reusable actions
    ├── tests/ → Playwright test specs
    ├── reports/ → Test reports (HTML / Allure)
    ├── playwright.config.js → Framework configuration
    ├── package.json → NPM project file
    └── README.md → Documentation (You’re here!)

## Reporting

Install Allure Reporter

    npm install -D allure-playwright

## Visual Testing Implementation

    install Applitools Eyes sdk

    npm install @applitools/eyes-playwright