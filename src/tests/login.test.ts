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
    expect(title).toBe(loginPage.getExpectedTitle('PAGE_TITLE'));
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
    await loginPage.login();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(
      loginPage.getExpectedErrorMessage('USERNAME_IS_REQUIRED'),
    );
  });

  test('Should display an error for correct username and empty password field', async () => {
    await loginPage.open();
    await loginPage.loginWithValidUserEmptyPass();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(
      loginPage.getExpectedErrorMessage('PASSWORD_IS_REQUIRED'),
    );
  });

  test('Should display an error for empty username field and correct password', async () => {
    await loginPage.open();
    await loginPage.loginWithEmptyUserValidPass();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(
      loginPage.getExpectedErrorMessage('USERNAME_IS_REQUIRED'),
    );
  });

  test('Should display an error for correct username and wrong password', async () => {
    await loginPage.open();
    await loginPage.loginWithValidUserInvalidPass();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(
      loginPage.getExpectedErrorMessage('USERNAME_AND_PASSWORD_DO_NOT_MATCH'),
    );
  });

  test('Should display an error for wrong username and correct password', async () => {
    await loginPage.open();
    await loginPage.loginWithInvalidUserValidPass();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(
      loginPage.getExpectedErrorMessage('USERNAME_AND_PASSWORD_DO_NOT_MATCH'),
    );
  });

  test('Should display an error for wrong username and wrong password', async () => {
    await loginPage.open();
    await loginPage.loginWithInvalidCredentials();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(
      loginPage.getExpectedErrorMessage('USERNAME_AND_PASSWORD_DO_NOT_MATCH'),
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
    await loginPage.loginWithValidCredentials();
    const url = await inventoryPage.getPageURL();
    expect(url).toBe(inventoryPage.getExpectedPageURL());
  });
});
