import puppeteer from 'puppeteer';
import { Browser, Page } from 'puppeteer';
import { LoginPage } from '../pages/public/LoginPage';
import { InventoryPage } from '../pages/secure/InventoryPage';

describe('Access control for inventory page', () => {
  jest.setTimeout(10000);

  let browser: Browser;
  let page: Page;
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 0,
    });
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.open();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Should display error when accessing inventory page without login', async () => {
    await inventoryPage.open();
    const errorMessage = await loginPage.getText(loginPage.locators.ERROR);
    expect(errorMessage).toBe(
      loginPage.pageData.ONLY_ACCESS_INVENTORY_WHEN_LOGGED_IN
    );
  });
});
