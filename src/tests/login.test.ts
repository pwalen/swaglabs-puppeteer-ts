import puppeteer from 'puppeteer';
import { Browser, Page } from 'puppeteer';
import { LoginPage } from '../pages/public/LoginPage';
import { InventoryPage } from '../pages/secure/inventoryPage';
import { log } from 'console';

describe('Login Page - basic tests', function () {
  jest.setTimeout(10000);

  let browser: Browser;
  let page: Page;
  let loginPage: LoginPage;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 0,
    });
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Should open login page', async () => {
    await loginPage.open();
  });

  test('Should have correct title', async () => {
    const title = await loginPage.getPageTitle();
    expect(title).toBe(loginPage.pageData.PAGE_TITLE);
  });
});

describe('Login Page - incorrect credentials', function () {
  jest.setTimeout(10000);

  let browser: Browser;
  let page: Page;
  let loginPage: LoginPage;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 0,
    });
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Should open login page', async () => {
    await loginPage.open();
  });

  test('Should have correct title', async () => {
    const title = await loginPage.getPageTitle();
    expect(title).toBe(loginPage.pageData.PAGE_TITLE);
  });

  test('Should display an error for empty username and password fields', async () => {
    await loginPage.click(loginPage.locators.SUBMIT);
    const errorMessage = await loginPage.getText(loginPage.locators.ERROR);
    expect(errorMessage).toBe(loginPage.pageData.USERNAME_IS_REQUIRED);
  });

  test('Should display an error for correct username and empty password field', async () => {
    await loginPage.reloadPage();
    await loginPage.type(
      loginPage.locators.USERNAME,
      loginPage.acceptedUsernames.STANDARD_USER
    );
    await loginPage.click(loginPage.locators.SUBMIT);
    const errorMessage = await loginPage.getText(loginPage.locators.ERROR);
    expect(errorMessage).toBe(loginPage.pageData.PASSWORD_IS_REQUIRED);
  });

  test('Should display an error for empty username field and correct password', async () => {
    await loginPage.reloadPage();
    await loginPage.type(
      loginPage.locators.PASSWORD,
      loginPage.acceptedPasswords.PASSWORD
    );
    await loginPage.click(loginPage.locators.SUBMIT);
    const errorMessage = await loginPage.getText(loginPage.locators.ERROR);
    expect(errorMessage).toBe(loginPage.pageData.USERNAME_IS_REQUIRED);
  });

  test('Should display an error for correct username and wrong password', async () => {
    await loginPage.reloadPage();
    await loginPage.login(
      loginPage.acceptedUsernames.STANDARD_USER,
      loginPage.incorrectPasswords.INCORRECT_PASSWORD
    );
    const errorMessage = await loginPage.getText(loginPage.locators.ERROR);
    expect(errorMessage).toBe(
      loginPage.pageData.USERNAME_AND_PASSWORD_DO_NOT_MATCH
    );
  });

  test('Should display an error for wrong username and correct password', async () => {
    await loginPage.reloadPage();
    await loginPage.login(
      loginPage.incorrectUsernames.INCORRECT_USERNAME,
      loginPage.acceptedPasswords.PASSWORD
    );
    const errorMessage = await loginPage.getText(loginPage.locators.ERROR);
    expect(errorMessage).toBe(
      loginPage.pageData.USERNAME_AND_PASSWORD_DO_NOT_MATCH
    );
  });

  test('Should display an error for wrong username and wrong password', async () => {
    await loginPage.reloadPage();
    await loginPage.login(
      loginPage.incorrectUsernames.INCORRECT_USERNAME,
      loginPage.incorrectPasswords.INCORRECT_PASSWORD
    );
    const errorMessage = await loginPage.getText(loginPage.locators.ERROR);
    expect(errorMessage).toBe(
      loginPage.pageData.USERNAME_AND_PASSWORD_DO_NOT_MATCH
    );
  });
});

describe('Login Page - correct credentials', function () {
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

  test('Should open login page', async () => {
    await loginPage.open();
  });

  test('Should have correct title', async () => {
    const title = await loginPage.getPageTitle();
    expect(title).toBe(loginPage.pageData.PAGE_TITLE);
  });

  test('Should enter and submit correct credentials', async () => {
    await loginPage.login(
      loginPage.acceptedUsernames.STANDARD_USER,
      loginPage.acceptedPasswords.PASSWORD
    );
  });

  test('Should open the Inventory page', async () => {
    const url = await inventoryPage.getPageURL();
    expect(url).toBe(inventoryPage.urls.URL_INVENTORY_PAGE);
  });
});
