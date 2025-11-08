import puppeteer, { Browser, Page } from 'puppeteer';

describe('Swag Labs basic test', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 50,
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should open Swag Labs and check the title', async () => {
    await page.goto('https://www.saucedemo.com');
    const title = await page.title();
    expect(title).toBe('Swag Labs');
  });
});
