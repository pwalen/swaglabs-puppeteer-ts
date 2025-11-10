import { Page } from 'puppeteer';
import { BasePage } from '../BasePage';
import { URLS } from '../data/urls';

export class InventoryPage extends BasePage {
  urls: typeof URLS;

  constructor(page: Page) {
    super(page);
    this.urls = URLS;
  }

  async getPageURL(): Promise<string> {
    return await super.getPageURL();
  }
}
