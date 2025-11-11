import { Page } from 'puppeteer';
import { BasePage } from '../BasePage';
import { URLS } from '@data/urls';

export class InventoryPage extends BasePage {
  urls: typeof URLS;

  constructor(page: Page) {
    super(page);
    this.urls = URLS;
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
}
