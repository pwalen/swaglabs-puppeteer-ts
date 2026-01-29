import { Page } from 'puppeteer';
import { BasePage } from '../BasePage';
import { URLS } from '@data/urls';
import { LOCATORS_INVENTORY_PAGE } from './InventoryPage.locators';

export class InventoryPage extends BasePage {
  async open(): Promise<void> {
    await super.open(URLS.URL_INVENTORY_PAGE);
  }

  async getPageURL(): Promise<string> {
    return await super.getPageURL();
  }

  async click(selector: string): Promise<void> {
    await super.click(selector);
  }

  getExpectedPageURL(): string {
    return URLS.URL_INVENTORY_PAGE;
  }

  async isInventoryListVisible(): Promise<boolean> {
    return await super.isElementVisible(LOCATORS_INVENTORY_PAGE.INVENTORY_LIST);
  }
}
