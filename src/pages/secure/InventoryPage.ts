import { BasePage } from '../BasePage';
import { URLS } from '@data/urls';
import { LoginPage } from '@pages/public/LoginPage';
import { LOCATORS_INVENTORY_PAGE } from './InventoryPage.locators';
import { PAGE_DATA, Product, PageDataKey } from './InventoryPage.data';

export class InventoryPage extends BasePage {
  async open(): Promise<void> {
    await super.open(URLS.URL_INVENTORY_PAGE);
  }

  getExpectedPageURL(): string {
    return URLS.URL_INVENTORY_PAGE;
  }

  async isInventoryListVisible(): Promise<boolean> {
    return await this.isElementVisible(LOCATORS_INVENTORY_PAGE.INVENTORY_LIST);
  }

  static async from(loginPage: LoginPage): Promise<InventoryPage> {
    await loginPage.loginWithValidCredentials();
    const inventoryPage = new InventoryPage(loginPage.getPage());
    return inventoryPage;
  }

  async isLoaded(): Promise<boolean> {
    if (
      (await this.getPageURL()) === this.getExpectedPageURL() &&
      (await this.isInventoryListVisible())
    ) {
      return true;
    } else {
      return false;
    }
  }

  async getProducts(): Promise<Product[]> {
    const itemSelector = LOCATORS_INVENTORY_PAGE.INVENTORY_ITEM;
    const nameSelector = LOCATORS_INVENTORY_PAGE.ITEM_NAME;
    const priceSelector = LOCATORS_INVENTORY_PAGE.ITEM_PRICE;
    const descSelector = LOCATORS_INVENTORY_PAGE.ITEM_DESCRIPTION;
    const products: Product[] = await this.page.$$eval(
      itemSelector,
      (items, nameSelector, priceSelector, descSelector) =>
        items.map(item => ({
          name: item.querySelector(nameSelector)?.textContent?.trim() ?? '',
          price: item.querySelector(priceSelector)?.textContent?.trim() ?? '',
          description:
            item.querySelector(descSelector)?.textContent?.trim() ?? '',
        })),
      nameSelector,
      priceSelector,
      descSelector,
    );
    return products;
  }

  async getProductNames(): Promise<string[]> {
    const products: Product[] = await this.getProducts();
    const productNames: string[] = [];
    for (const product of products) {
      productNames.push(product.name);
    }
    return productNames;
  }

  getExpectedProductNames(expectedKey: PageDataKey): string[] {
    const value = PAGE_DATA[expectedKey];
    return Array.isArray(value) ? value.slice() : [];
  }

  async getProductCount(): Promise<number> {
    const products: Product[] = await this.getProducts();
    return products.length;
  }

  getExpectedProductCount(expectedKey: PageDataKey): number {
    const value = PAGE_DATA[expectedKey];
    return Number.isInteger(value) ? (value as number) : 0;
  }

  async getProductPrices(): Promise<string[]> {
    const products: Product[] = await this.getProducts();
    const productPrices: string[] = [];
    for (const product of products) {
      productPrices.push(product.price);
    }
    return productPrices;
  }

  async addToCartProduct(): Promise<void> {
    await this.page.click(LOCATORS_INVENTORY_PAGE.ADD_TO_CART_BTN);
  }

  async getCartBadgeCount(): Promise<number> {
    const cartBadge = await this.page.$(LOCATORS_INVENTORY_PAGE.CART_BADGE);
    const text = cartBadge
      ? await cartBadge.evaluate(el => el.textContent?.trim())
      : undefined;
    if (text === undefined) {
      return 0;
    } else {
      return parseInt(text);
    }
  }
}
