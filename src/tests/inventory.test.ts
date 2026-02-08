import { getPage } from '../test-setup/jest.puppeteer.setup';
import { InventoryPage } from '@pages/secure/InventoryPage';
import { LoginPage } from '@pages/public/LoginPage';

const EXPECTED_PRODUCTS = [
  'Sauce Labs Backpack',
  'Sauce Labs Bike Light',
  'Sauce Labs Bolt T-Shirt',
  'Sauce Labs Fleece Jacket',
  'Sauce Labs Onesie',
  'Test.allTheThings() T-Shirt (Red)',
];

describe('Inventory Page - products', () => {
  let inventoryPage: InventoryPage;
  let loginPage: LoginPage;

  beforeEach(async () => {
    const page = getPage();
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.open();
    await loginPage.loginWithValidCredentials();
    expect(await inventoryPage.isLoaded()).toBe(true);
  });

  test('should display all expected products', async () => {
    const products = await inventoryPage.getProducts();
    const productNames = products.map(p => p.name);

    expect(productNames).toStrictEqual(EXPECTED_PRODUCTS);
    expect(products.length).toBe(6);
  });

  test('should display product prices correctly', async () => {
    const products = await inventoryPage.getProducts();
    const productPrices = products.map(p => p.price);

    for (const price of productPrices) {
      expect(price).toMatch(/^\$\d+\.\d{2}$/);
    }
  });

  test('should allow adding products to cart', async () => {
    await inventoryPage.addToCart(0);

    const cartBadgeCount = await inventoryPage.getCartBadgeCount();
    expect(cartBadgeCount).toBe(1);
  });
});
