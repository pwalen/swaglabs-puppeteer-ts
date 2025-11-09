import { Page } from 'puppeteer';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(url: string): Promise<void> {}

  async click(selector: string): Promise<void> {}

  async type(selector: string, text: string): Promise<void> {}

  async getText(selector: string): Promise<string> {
    return '';
  }
}
