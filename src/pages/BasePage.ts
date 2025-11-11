import { Page, ClickOptions } from 'puppeteer';

export type WaitOptions = {
  visible?: boolean;
  timeoutMS?: number;
};

export class BasePage {
  protected page: Page;
  protected defaultTimeoutMS = 10_000;

  constructor(page: Page) {
    this.page = page;
  }

  // Opens a URL and waits for network to be idle-ish
  async open(url: string, timeoutMS?: number): Promise<void> {
    await this.page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: timeoutMS ?? this.defaultTimeoutMS,
    });
  }

  async getPageURL(): Promise<string> {
    const url = this.page.url();
    return url;
  }

  async getPageTitle(): Promise<string> {
    const title = await this.page.title();
    return title;
  }

  async isElementVisible(
    selector: string,
    timeoutMS?: number
  ): Promise<boolean> {
    return (
      (await this.page.waitForSelector(selector, {
        visible: true,
        timeout: timeoutMS ?? this.defaultTimeoutMS,
      })) !== null
    );
  }

  async getText(selector: string, timeoutMS?: number): Promise<string> {
    const text = await this.page.waitForSelector(selector, {
      timeout: timeoutMS ?? this.defaultTimeoutMS,
    });
    return await this.page.evaluate(el => (el ? el.textContent : ''), text);
  }

  // Clicks an element after waiting for it to be present & visible
  async click(selector: string, timeoutMS?: number): Promise<void> {
    await this.page.waitForSelector(selector, {
      timeout: timeoutMS ?? this.defaultTimeoutMS,
    });
    await this.page.click(selector);
  }

  async type(
    selector: string,
    text: string,
    timeoutMS?: number
  ): Promise<void> {
    await this.page.waitForSelector(selector, {
      timeout: timeoutMS ?? this.defaultTimeoutMS,
    });
    await this.page.type(selector, text);
  }

  async reloadPage(timeoutMS?: number): Promise<void> {
    await this.page.reload({
      waitUntil: 'networkidle0',
      timeout: timeoutMS ?? this.defaultTimeoutMS,
    });
  }
}
