import { getPage } from '../test-setup/jest.puppeteer.setup';
import { LoginPage } from '@pages/public/LoginPage';
import { InventoryPage } from '@pages/secure/InventoryPage';

describe('Login Page - basic tests', () => {
  let loginPage: LoginPage;

  beforeEach(async () => {
    const page = getPage();
    loginPage = new LoginPage(page);
  });

  test('Should open login page', async () => {
    await loginPage.open();
  });

  test('Should have correct title', async () => {
    await loginPage.open();
    const title = await loginPage.getPageTitle();
    expect(title).toBe(loginPage.pageData.PAGE_TITLE);
  });
});

describe('Login Page - incorrect credentials', () => {
  let loginPage: LoginPage;

  beforeEach(async () => {
    const page = getPage();
    loginPage = new LoginPage(page);
  });

  test('Should display an error for empty username and password fields', async () => {
    await loginPage.open();
    await loginPage.submit();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(loginPage.pageData.USERNAME_IS_REQUIRED);
  });

  test('Should display an error for correct username and empty password field', async () => {
    await loginPage.open();
    await loginPage.typeUsername(loginPage.acceptedUsernames.STANDARD_USER);
    await loginPage.submit();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(loginPage.pageData.PASSWORD_IS_REQUIRED);
  });

  test('Should display an error for empty username field and correct password', async () => {
    await loginPage.open();
    await loginPage.typePassword(loginPage.acceptedPasswords.PASSWORD);
    await loginPage.submit();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(loginPage.pageData.USERNAME_IS_REQUIRED);
  });

  test('Should display an error for correct username and wrong password', async () => {
    await loginPage.open();
    await loginPage.typeUsername(loginPage.acceptedUsernames.STANDARD_USER);
    await loginPage.typePassword(
      loginPage.incorrectPasswords.INCORRECT_PASSWORD,
    );
    await loginPage.submit();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(
      loginPage.pageData.USERNAME_AND_PASSWORD_DO_NOT_MATCH,
    );
  });

  test('Should display an error for wrong username and correct password', async () => {
    await loginPage.open();
    await loginPage.typeUsername(
      loginPage.incorrectUsernames.INCORRECT_USERNAME,
    );
    await loginPage.typePassword(loginPage.acceptedPasswords.PASSWORD);
    await loginPage.submit();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(
      loginPage.pageData.USERNAME_AND_PASSWORD_DO_NOT_MATCH,
    );
  });

  test('Should display an error for wrong username and wrong password', async () => {
    await loginPage.open();
    await loginPage.typeUsername(
      loginPage.incorrectUsernames.INCORRECT_USERNAME,
    );
    await loginPage.typePassword(
      loginPage.incorrectPasswords.INCORRECT_PASSWORD,
    );
    await loginPage.submit();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(
      loginPage.pageData.USERNAME_AND_PASSWORD_DO_NOT_MATCH,
    );
  });
});

describe('Login Page - correct credentials', () => {
  let inventoryPage: InventoryPage;
  let loginPage: LoginPage;

  beforeEach(async () => {
    const page = getPage();
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
  });

  test('Should enter and submit correct credentials', async () => {
    await loginPage.open();
    await loginPage.typeUsername(loginPage.acceptedUsernames.STANDARD_USER);
    await loginPage.typePassword(loginPage.acceptedPasswords.PASSWORD);
    await loginPage.submit();
    const url = await inventoryPage.getPageURL();
    expect(url).toBe(inventoryPage.urls.URL_INVENTORY_PAGE);
  });
});
