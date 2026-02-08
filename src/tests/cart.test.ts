import { getPage } from '../test-setup/jest.puppeteer.setup';
import { CartPage } from '@pages/secure/CartPage';
import { InventoryPage } from '@pages/secure/InventoryPage';
import { LoginPage } from '@pages/public/LoginPage';
import { CheckoutStepOnePage } from '@pages/secure/CheckoutStepOnePage';

const EXPECTED_ITEM_NAMES = ['Sauce Labs Backpack'];

describe('Cart Page - basic tests', () => {
  let cartPage: CartPage;
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  beforeEach(async () => {
    const page = getPage();
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.open();
    await loginPage.loginWithValidCredentials();
    expect(await inventoryPage.isLoaded()).toBe(true);
    await inventoryPage.addToCart(0);
  });

  test('should open cart page', async () => {
    await cartPage.clickCartLink();
    expect(await cartPage.isLoaded()).toBe(true);
  });
});

describe('Cart Page - manage items', () => {
  let cartPage: CartPage;
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let checkoutStepOnePage: CheckoutStepOnePage;

  beforeEach(async () => {
    const page = getPage();
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutStepOnePage = new CheckoutStepOnePage(page);

    await loginPage.open();
    await loginPage.loginWithValidCredentials();
    expect(await inventoryPage.isLoaded()).toBe(true);
    await inventoryPage.addToCart(0);
    await cartPage.clickCartLink();
    expect(await cartPage.isLoaded()).toBe(true);
  });

  test('should display all expected items', async () => {
    const items = await cartPage.getCartItems();
    const itemNames = items.map(p => p.name);
    const cartBadgeCount = await cartPage.getCartBadgeCount();

    expect(itemNames).toStrictEqual(EXPECTED_ITEM_NAMES);
    expect(items.length).toBe(1);
    expect(cartBadgeCount).toBe(1);
  });

  test('should display product prices correctly', async () => {
    const items = await cartPage.getCartItems();
    const itemPrices = items.map(p => p.price);

    for (const price of itemPrices) {
      expect(price).toMatch(/^\$\d+\.\d{2}$/);
    }
  });

  test('should allow removing items from cart', async () => {
    await cartPage.removeItem(0);
    const items = await cartPage.getCartItems();

    expect(items.length).toBe(0);
  });

  test('should allow proceed to checkout', async () => {
    await cartPage.clickCheckout();
    expect(await checkoutStepOnePage.isLoaded()).toBe(true);
  });
});
