import { Page } from 'puppeteer';
import { BasePage } from '../BasePage';
import { URLS } from '@data/urls';
import { LOCATORS_INVENTORY_PAGE } from './InventoryPage.locators';

export class InventoryPage extends BasePage {
  urls: typeof URLS;
  locators: typeof LOCATORS_INVENTORY_PAGE;

  constructor(page: Page) {
    super(page);
    this.urls = URLS;
    this.locators = LOCATORS_INVENTORY_PAGE;
  }

  async open(): Promise<void> {
    await super.open(this.urls.URL_INVENTORY_PAGE);
  }

  async getPageURL(): Promise<string> {
    return await super.getPageURL();
  }

  async click(selector: string): Promise<void> {
    await super.click(selector);
  }

  async isInventoryListVisible(): Promise<boolean> {
    return await super.isElementVisible(this.locators.INVENTORY_LIST);
  }
}
