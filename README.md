# 🧪 SwagLabs Puppeteer Tests (TypeScript + Jest)

![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)
![TypeScript](https://img.shields.io/badge/typescript-5.x-blue)
![Puppeteer](https://img.shields.io/badge/puppeteer-24.x-green)
![Jest](https://img.shields.io/badge/tested%20with-Jest-red)
![License](https://img.shields.io/badge/license-ISC-blue)

Educational E2E test framework for [Swag Labs](https://www.saucedemo.com) built with **Puppeteer**, **Jest**, and **TypeScript** following the **Page Object Model (POM)** pattern.

---

## 🎯 Project Goal

This project is a **learning playground** for developing SDET skills:
- Building an E2E framework from scratch (no ready-made solutions)
- Practicing **Page Object Model** with semantic API
- TypeScript + Jest in a browser automation environment
- Preparation for CI/CD integration (Jenkins, GitHub Actions)

**Philosophy:** Task-driven learning – we learn by building, not copying tutorials.

---

## 📊 Implementation Status

### ✅ Implemented and Working

**Page Objects:**
- `BasePage` – core abstraction with wait/click/getText methods
- `LoginPage` – semantic API (loginWithValidCredentials, getExpectedErrorMessage)
- `InventoryPage` – product listing API with Product interface

**Tests:**
- `login.test.ts` – login scenarios (valid/invalid credentials, locked user, empty fields)
- `inventory.test.ts` – product validation (price, name, availability)

**Infrastructure:**
- Jest test runner + Puppeteer integration
- TypeScript configuration with strict typing
- Test setup utilities (browser lifecycle management)

### 🔄 In Progress / Partially Implemented

- **Data-driven tests** – locators and test data are in page objects, but missing external fixtures
- **Error handling** – basic try-catch, but no dedicated error recovery strategies
- **Reporting** – no HTML/Allure reports (console output only)

### ❌ Not Started (Roadmap)

**Page Objects:**
- `CartPage` – adding products, cart validation
- `CheckoutPage` – checkout form, order completion
- `ProductDetailsPage` – individual product details

**Test Scenarios:**
- End-to-end user journey (login → browse → add to cart → checkout)
- Product sorting and filtering
- Navigation tests (menu, back button)

**Advanced Features:**
- Visual regression testing (screenshot comparison)
- Performance metrics (page load times)
- CI/CD integration (Jenkins/GitHub Actions)
- Parallel test execution

---

## 🗺️ Roadmap

### Phase 1: Core Pages & Tests ✅ (DONE)
- [x] LoginPage with semantic API
- [x] InventoryPage with product listing
- [x] Basic login + inventory tests

### Phase 2: Shopping Flow (Priority: HIGH)
- [ ] CartPage implementation
- [ ] Tests for adding products to cart
- [ ] CheckoutPage (Step 1: Your Information)
- [ ] CheckoutPage (Step 2: Overview)
- [ ] E2E test: login → add product → checkout

### Phase 3: Advanced Testing (Priority: MEDIUM)
- [ ] ProductDetailsPage
- [ ] Sorting/filtering tests
- [ ] Error state tests (network failures, timeouts)
- [ ] Test data management (fixtures, builders)

### Phase 4: CI/CD & Reporting (Priority: LOW → MEDIUM)
- [ ] Jenkins pipeline integration
- [ ] HTML/Allure reporting
- [ ] Screenshot on failure
- [ ] Parallel execution (sharding)

---

## 🧱 Tech Stack

| Component | Purpose |
|------------|----------|
| **TypeScript** | Typing, code maintainability |
| **Jest** | Test runner, assertions |
| **Puppeteer** | Browser automation (Chromium) |
| **POM Pattern** | Reusable, semantic page abstractions |

---

## 🗂 Project Structure

```
src/
├── data/           # Shared test data (TBD: fixtures, builders)
├── learning/       # Experimental code, learning exercises (not production)
├── pages/          # Page Object Model classes
│   ├── BasePage.ts
│   ├── generic/    # Generic components (TBD: headers, footers)
│   ├── public/     # LoginPage (non-authenticated)
│   └── secure/     # InventoryPage, CartPage (authenticated)
├── test-setup/     # Jest configuration, browser lifecycle
├── tests/          # Jest test suites
│   ├── login.test.ts
│   ├── inventory.test.ts
│   └── helpers/    # Test utilities
└── utils/          # Helper functions (waits, selectors)
```

---

## 📚 Learning Objectives

After completing this project, you should be able to:
- [x] Design POM architecture with semantic API
- [x] Write stable selectors (data-test attributes)
- [x] Manage browser lifecycle in tests
- [ ] Build E2E test suite from scratch (in progress)
- [ ] Integrate tests with CI/CD pipeline (TBD)
- [ ] Debug flaky tests (TBD)

---

## ⚙️ Setup

### Requirements
- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **Chromium** (installed automatically by Puppeteer)
- **OS:** macOS (ARM/Intel), Linux, Windows

### Installation

```bash
git clone git@github.com:pwalen/swaglabs-puppeteer-ts.git
cd swaglabs-puppeteer-ts
npm install
```

### Running Tests

All tests:
```bash
npm test
```

Specific file:
```bash
npx jest src/tests/login.test.ts
```

Watch mode (auto-rerun):
```bash
npm test -- --watch
```

Debug mode (headful browser):
```bash
HEADLESS=false npm test
```

---

## 🧩 POM API Usage Example

**Before refactoring (raw access):**
```typescript
await page.type('#user-name', 'standard_user');
await page.type('#password', 'secret_sauce');
await page.click('#login-button');
```

**After refactoring (semantic API):**
```typescript
await loginPage.loginWithValidCredentials();
expect(await loginPage.getCurrentURL()).toBe(
  loginPage.getExpectedPageURL('inventory')
);
```

**Benefits:**
- Tests are readable (intent, not implementation)
- Selector change → 1 place in code
- Reusability (loginWithValidCredentials in multiple tests)

---

## 🏷️ License

ISC © 2025-2026 [Paweł Walenda](https://github.com/pwalen)

---

## 📖 Further Resources

**Related projects:**
- [ci-pipeline-lab](https://github.com/pwalen/ci-pipeline-lab) – Jenkins CI/CD for this project (TBD)

**Learning resources:**
- [Puppeteer Docs](https://pptr.dev/)
- [Jest Docs](https://jestjs.io/)
- [POM Pattern Best Practices](https://martinfowler.com/bliki/PageObject.html)
