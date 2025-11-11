# 🧪 SwagLabs Puppeteer Tests (TypeScript + Jest)

![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)
![TypeScript](https://img.shields.io/badge/typescript-5.x-blue)
![Puppeteer](https://img.shields.io/badge/puppeteer-24.x-green)
![Jest](https://img.shields.io/badge/tested%20with-Jest-red)
![License](https://img.shields.io/badge/license-ISC-blue)

An educational-yet-professional framework for **end-to-end testing** of the [Swag Labs](https://www.saucedemo.com) demo application, built with **Puppeteer**, **Jest**, and **TypeScript** following the **Page Object Model (POM)** pattern.

---

## 🚀 Project Goals

- Learn how to build an E2E test framework using **Puppeteer + TypeScript**
- Explore **Jest** as a modern test runner for browser automation
- Implement and practice the **Page Object Model (POM)** architecture
- Understand test stability, reusability, and clean structure
- Create a learning environment for SDET skill development

---

## 🧱 Tech Stack

| Component | Purpose |
|------------|----------|
| **TypeScript** | Strong typing and clean project structure |
| **Jest** | Test runner and assertion library |
| **Puppeteer** | Browser automation with Chromium |
| **POM** | Reusable page objects for maintainable tests |

---

## 🗂 Project Structure

```
src/
├── data/         # Shared test data, locators, URLs, constants
├── pages/        # Page Object Model classes
│    ├── BasePage.ts
│    ├── public/       # LoginPage, etc.
│    └── secure/       # InventoryPage, CartPage, CheckoutPage
├── tests/        # Jest test suites
└── utils/        # Helper utilities and shared functions
```

---

## ⚙️ Setup and Run

Clone the repository:
```bash
git clone git@github.com:pwalen/swaglabs-puppeteer-ts.git
cd swaglabs-puppeteer-ts
```

Install dependencies:
```bash
npm install
```

Run all tests:
```bash
npx jest
```

Run a specific test:
```bash
npx jest src/tests/login.test.ts
```

---

## 🧩 Example Test Scenario

**Test:** accessing the inventory page without login

```typescript
test('Should display error when accessing inventory page without login', async () => {
  await inventoryPage.open();
  const errorMessage = await loginPage.getText(loginPage.locators.ERROR);
  expect(errorMessage).toBe(
    loginPage.pageData.ONLY_ACCESS_INVENTORY_WHEN_LOGGED_IN
  );
});
```

---

## 🧬 Learning Focus

This repository was created as a **learning playground** to deepen understanding of:

* **browser automation with Puppeteer**
* **test design using POM**
* **modern TypeScript + Jest integration**

Although educational in origin, the framework follows **professional best practices** for scalability and CI readiness.

---

## 🏷️ License

ISC © 2025 [Paweł Walenda](https://github.com/pwalen)

---