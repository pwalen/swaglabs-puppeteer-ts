import { BasePage } from '@pages/BasePage';
import { URLS } from '@data/urls';
import { LOCATORS_CART_PAGE } from './CartPage.locators';
import { CartItem } from './CartPage.data';

export class CartPage extends BasePage {
  async open(): Promise<void> {
    await super.open(URLS.URL_CART_PAGE);
  }

  getExpectedPageURL(): string {
    return URLS.URL_CART_PAGE;
  }

  async isCartListVisible(): Promise<boolean> {
    return await this.isElementVisible(LOCATORS_CART_PAGE.CART_LIST);
  }

  async isLoaded(): Promise<boolean> {
    if (
      (await this.getPageURL()) === this.getExpectedPageURL() &&
      (await this.isCartListVisible())
    ) {
      return true;
    } else {
      return false;
    }
  }

  async getCartItems(): Promise<CartItem[]> {
    const itemSelector = LOCATORS_CART_PAGE.CART_ITEM;
    const nameSelector = LOCATORS_CART_PAGE.ITEM_NAME;
    const priceSelector = LOCATORS_CART_PAGE.ITEM_PRICE;
    const descSelector = LOCATORS_CART_PAGE.ITEM_DESCRIPTION;
    const cartItems: CartItem[] = await this.page.$$eval(
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
    return cartItems;
  }

  async removeItem(index: number): Promise<void> {
    const buttons = await this.page.$$(LOCATORS_CART_PAGE.REMOVE_BTN);
    if (index >= buttons.length || index < 0) {
      throw new Error(
        `Item index ${index} out of range (available: 0-${buttons.length - 1})`,
      );
    }
    await buttons[index]!.click();
  }

  async clickCheckout(): Promise<void> {
    await Promise.all([
      this.page.waitForNavigation(),
      this.page.click(LOCATORS_CART_PAGE.CHECKOUT_BTN),
    ]);
  }

  async clickRemove(): Promise<void> {
    await this.page.click(LOCATORS_CART_PAGE.REMOVE_BTN);
  }
  async getCartBadgeCount(): Promise<number> {
    const cartBadge = await this.page.$(LOCATORS_CART_PAGE.CART_BADGE);
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
