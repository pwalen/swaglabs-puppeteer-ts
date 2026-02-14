import { BasePage } from '@pages/BasePage';
import { URLS } from '@data/urls';
import { LOCATORS_INVENTORY_PAGE } from './InventoryPage.locators';
import { Product } from './InventoryPage.data';

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

  async addToCart(index: number): Promise<void> {
    const buttons = await this.page.$$(LOCATORS_INVENTORY_PAGE.ADD_TO_CART_BTN);
    if (index >= buttons.length || index < 0) {
      throw new Error(
        `Product index ${index} out of range (available: 0-${buttons.length - 1})`,
      );
    }
    await buttons[index]!.click();
    await this.page.waitForSelector(LOCATORS_INVENTORY_PAGE.CART_BADGE, {
      visible: true,
    });
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
  async goToCart(): Promise<void> {
    await Promise.all([
      this.page.waitForNavigation(),
      this.page.click(LOCATORS_INVENTORY_PAGE.CART_LINK),
    ]);
  }
}
