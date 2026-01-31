import { getPage } from '../test-setup/jest.puppeteer.setup';
import { InventoryPage } from '@pages/secure/InventoryPage';
import { LoginPage } from '@pages/public/LoginPage';

describe('Inventory Page - products', () => {
  let inventoryPage: InventoryPage;
  let loginPage: LoginPage;

  beforeEach(async () => {
    const page = getPage();
    loginPage = new LoginPage(page);
  });

  test('should display all expected products', async () => {
    await loginPage.open();
    inventoryPage = await InventoryPage.from(loginPage);
    expect(await inventoryPage.isLoaded()).toBe(true);
    const productNames = await inventoryPage.getProductNames();
    const expectedProductNames =
      inventoryPage.getExpectedProductNames(`PRODUCT_NAMES`);
    const productCount = await inventoryPage.getProductCount();
    const expectedProductCount =
      inventoryPage.getExpectedProductCount(`PRODUCT_COUNT`);
    expect(productNames).toStrictEqual(expectedProductNames);
    expect(productCount).toBe(expectedProductCount);
  });

  test('should display product prices correctly', async () => {
    await loginPage.open();
    inventoryPage = await InventoryPage.from(loginPage);
    expect(await inventoryPage.isLoaded()).toBe(true);
    const productPrices = await inventoryPage.getProductPrices();
    for (const price of productPrices) {
      expect(price).toMatch(/^\$\d+\.\d{2}$/);
    }
  });

  test('should allow adding products to cart', async () => {
    await loginPage.open();
    inventoryPage = await InventoryPage.from(loginPage);
    expect(await inventoryPage.isLoaded()).toBe(true);
    await inventoryPage.addToCartProduct();
    const cartBadgeCount = await inventoryPage.getCartBadgeCount();
    expect(cartBadgeCount).toBe(1);
  });
});
