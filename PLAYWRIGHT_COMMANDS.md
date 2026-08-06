# 🚀 Playwright Commands Cheat Sheet
> By Manoranjan Kumar

---

# 1. Create Playwright Project

```bash
npm init playwright@latest
```

Install Playwright in existing project

```bash
npm install -D @playwright/test
```

Install browsers

```bash
npx playwright install
```

---

# 2. Run Tests

Run all tests

```bash
npx playwright test
```

Run a specific file

```bash
npx playwright test tests/login.spec.js
```

Run a specific test

```bash
npx playwright test -g "Login Test"
```

Run headed mode

```bash
npx playwright test --headed
```

Run only Chromium

```bash
npx playwright test --project=chromium
```

Run Firefox

```bash
npx playwright test --project=firefox
```

Run WebKit

```bash
npx playwright test --project=webkit
```

Debug mode

```bash
npx playwright test --debug
```

UI Mode

```bash
npx playwright test --ui
```

---

# 3. HTML Report

Generate report automatically

```bash
npx playwright test
```

Open report

```bash
npx playwright show-report
```

---

# 4. Trace Viewer

Open trace

```bash
npx playwright show-trace trace.zip
```

---

# 5. Code Generator

Generate Playwright code

```bash
npx playwright codegen
```

Generate for website

```bash
npx playwright codegen https://rahulshettyacademy.com/client
```

Generate in JavaScript

```bash
npx playwright codegen --target=javascript
```

Generate in TypeScript

```bash
npx playwright codegen --target=typescript
```

---

# 6. Install TypeScript

```bash
npm install -D typescript
```

Create tsconfig

```bash
npx tsc --init
```

Compile TypeScript

```bash
npx tsc
```

Compile one file

```bash
npx tsc demo.ts
```

Watch mode

```bash
npx tsc --watch
```

---

# 7. Cucumber

Install

```bash
npm install @cucumber/cucumber
```

Run all features

```bash
npx cucumber-js
```

Run one feature

```bash
npx cucumber-js features/Ecommerce.feature
```

Run with exit

```bash
npx cucumber-js features/Ecommerce.feature --exit
```

Run specific scenario

```bash
npx cucumber-js --name "Placing a order"
```

---

# 8. Allure Report

Install

```bash
npm install -D allure-playwright
```

Generate report

```bash
allure generate ./allure-results --clean
```

Open report

```bash
allure open ./allure-report
```

Generate and open

```bash
allure generate ./allure-results --clean && allure open ./allure-report
```

Serve report

```bash
allure serve ./allure-results
```

---

# 9. Run Tagged Tests

Run @Web tests

```bash
npx playwright test --grep @Web
```

Run @API tests

```bash
npx playwright test --grep @API
```

Run @Smoke tests

```bash
npx playwright test --grep @Smoke
```

Exclude tag

```bash
npx playwright test --grep-invert @Smoke
```

---

# 10. Jenkins

Start Jenkins

```bash
java -jar jenkins.war --httpPort=9090
```

If Java 22

```bash
java -jar jenkins.war --enable-future-java --httpPort=9090
```

Check Java

```bash
java -version
```

Installed Java versions

```bash
/usr/libexec/java_home -V
```

Use Java 21

```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 21)
export PATH=$JAVA_HOME/bin:$PATH
```

---

# 11. NPM

Install dependency

```bash
npm install
```

Install dev dependency

```bash
npm install -D package-name
```

Install Playwright

```bash
npm install -D @playwright/test
```

Install ExcelJS

```bash
npm install exceljs
```

Install Cucumber

```bash
npm install @cucumber/cucumber
```

Install Allure

```bash
npm install -D allure-playwright
```

---

# 12. Browser Installation

Install browsers

```bash
npx playwright install
```

Install Chromium only

```bash
npx playwright install chromium
```

Install Firefox

```bash
npx playwright install firefox
```

Install WebKit

```bash
npx playwright install webkit
```

---

# 13. Useful Debugging

Pause execution

```js
await page.pause();
```

Debug mode

```bash
PWDEBUG=1 npx playwright test
```

Show report

```bash
npx playwright show-report
```

Show trace

```bash
npx playwright show-trace trace.zip
```

---

# 14. Playwright Config

Run custom config

```bash
npx playwright test --config=playwright.config.ts
```

Run specific project

```bash
npx playwright test --project=chromium
```

---

# 15. Package Scripts

Run regression

```bash
npm run regression
```

Run Web tests

```bash
npm run webTests
```

Run API tests

```bash
npm run APITests
```

Run Safari config

```bash
npm run safariNewConfig
```

---

# 16. Git Commands

Initialize

```bash
git init
```

Status

```bash
git status
```

Add

```bash
git add .
```

Commit

```bash
git commit -m "message"
```

Push

```bash
git push origin main
```

Pull

```bash
git pull origin main
```

Clone

```bash
git clone <repo-url>
```

---

# 17. VS Code Shortcuts

Open terminal

```
Ctrl + `
```

Format document

```
Shift + Option + F (Mac)
Shift + Alt + F (Windows)
```

Go to definition

```
F12
```

Rename symbol

```
F2
```

Quick Fix

```
Cmd + . (Mac)
Ctrl + . (Windows)
```

---

# 18. Useful Playwright CLI

List tests

```bash
npx playwright test --list
```

Run only failed tests

```bash
npx playwright test --last-failed
```

Run in headed mode

```bash
npx playwright test --headed
```

Run with one worker

```bash
npx playwright test --workers=1
```

Run in parallel

```bash
npx playwright test --workers=4
```

---

# 19. Environment Variables

Mac

```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 21)
```

Reload terminal

```bash
source ~/.zshrc
```

---

# 20. Clean Install

Delete node_modules

```bash
rm -rf node_modules
```

Delete package-lock

```bash
rm package-lock.json
```

Install again

```bash
npm install
```

---

# ⭐ Most Used Commands

```bash
npx playwright test
```

```bash
npx playwright show-report
```

```bash
npx playwright test --headed
```

```bash
npx playwright test --debug
```

```bash
npx playwright codegen
```

```bash
npx cucumber-js
```

```bash
allure serve ./allure-results
```

```bash
java -jar jenkins.war --httpPort=9090
```

```bash
npm run regression
```

```bash
npm run webTests
```

```bash
npm run APITests
```

```bash
npx cucumber-js features/Ecommerce.feature --parallel 2  --exit --format html:cucumber-
report.html
```

## 21. Cucumber Advanced Commands

### Run a specific feature file

```bash
npx cucumber-js features/Ecommerce.feature
```

Runs only the `Ecommerce.feature` file.

---

### Run a feature and exit Node process

```bash
npx cucumber-js features/Ecommerce.feature --exit
```

`--exit` forces Node.js to terminate after all scenarios complete. Useful when some resources (like browser instances) keep the process alive.

---

### Run scenarios in parallel

```bash
npx cucumber-js features/Ecommerce.feature --parallel 2
```

Runs scenarios using **2 parallel workers**, reducing execution time.

Example:

```bash
npx cucumber-js features/Ecommerce.feature --parallel 4
```

Runs scenarios with **4 workers**.

---

### Generate HTML Report

```bash
npx cucumber-js features/Ecommerce.feature --format html:cucumber-report.html
```

Generates an HTML report named:

```
cucumber-report.html
```

Open it in any browser to view execution results.

---

### Run in Parallel + Generate HTML Report + Exit

```bash
npx cucumber-js features/Ecommerce.feature --parallel 2 --exit --format html:cucumber-report.html
```

### What each option means

| Command | Purpose |
|---------|---------|
| `npx cucumber-js` | Runs Cucumber tests |
| `features/Ecommerce.feature` | Executes only this feature file |
| `--parallel 2` | Runs scenarios using 2 parallel workers |
| `--exit` | Forces Node.js to exit after execution |
| `--format html:cucumber-report.html` | Creates an HTML execution report |

After execution you'll get:

```
PlaywrightAutomation/
│
├── cucumber-report.html
├── features/
├── pageobjects/
├── tests/
└── package.json
```

Open the report:

```bash
open cucumber-report.html
```

(macOS)

or simply double-click the file.

---

### Run all feature files

```bash
npx cucumber-js
```

---

### Run a specific scenario by name

```bash
npx cucumber-js --name "Placing a order"
```

Runs only the scenario whose name matches **"Placing a order"**.

---

### Run all scenarios matching a tag

```bash
npx cucumber-js --tags "@Smoke"
```

---

### Exclude a tag

```bash
npx cucumber-js --tags "not @Regression"
```

---

### Generate JSON Report

```bash
npx cucumber-js --format json:cucumber-report.json
```

Useful for CI/CD tools like Jenkins or generating advanced reports. 
---

# 22. TypeScript Commands

## Install TypeScript

```bash
npm install -D typescript
```

---

## Create tsconfig.json

```bash
npx tsc --init
```

Creates a `tsconfig.json` file.

---

## Check TypeScript Version

```bash
npx tsc --version
```

---

## Compile All TypeScript Files

```bash
npx tsc
```

Compiles all `.ts` files into `.js` files according to `tsconfig.json`.

Example:

```
demo.ts
```

↓

```
demo.js
```

---

## Compile a Single TypeScript File

```bash
npx tsc demo.ts
```

Generates:

```
demo.ts
demo.js
```

---

## Compile in Watch Mode

```bash
npx tsc --watch
```

Automatically recompiles whenever you save a `.ts` file.

Stop watching:

```
Ctrl + C
```

---

## Run the Generated JavaScript File

```bash
node demo.js
```

Example:

```bash
npx tsc demo.ts
node demo.js
```

---

## Compile to a Specific Folder

```bash
npx tsc --outDir dist
```

Generated files:

```
dist/
    demo.js
```

---

## Compile Without Emitting JavaScript

```bash
npx tsc --noEmit
```

Checks TypeScript errors only.

No `.js` files are created.

---

## Delete Generated JavaScript Files

Mac/Linux

```bash
rm *.js
```

Windows

```cmd
del *.js
```

---

## Typical TypeScript Workflow

```bash
# Install TypeScript
npm install -D typescript

# Create tsconfig.json
npx tsc --init

# Compile
npx tsc

# Run JavaScript
node demo.js
```

---

## Playwright + TypeScript

Run Playwright TypeScript tests directly (no need to compile)

```bash
npx playwright test
```

Playwright automatically compiles `.ts` test files internally.

Example:

```
tests/
    login.spec.ts
```

Simply run:

```bash
npx playwright test
```

No need to do:

```bash
npx tsc
node login.spec.js
```

---

## Cucumber + TypeScript

Compile:

```bash
npx tsc
```

Run:

```bash
npx cucumber-js
```

(or use `ts-node` if the project is configured for it.)

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npx tsc --init` | Create tsconfig.json |
| `npx tsc` | Compile all TS files |
| `npx tsc demo.ts` | Compile one TS file |
| `npx tsc --watch` | Auto compile on save |
| `npx tsc --noEmit` | Type check only |
| `node demo.js` | Run compiled JavaScript |
| `npx playwright test` | Run Playwright TS tests directly |

**Author:** Manoranjan Kumar 🚀