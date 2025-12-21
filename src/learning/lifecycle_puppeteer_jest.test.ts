import puppeteer, { Browser, Page } from 'puppeteer';

describe('Lifecycle - Puppeteer + Jest', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    console.log('beforeAll - launch browser');
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 0,
    });
  });

  beforeEach(async () => {
    console.log('beforeEach - new page');
    page = await browser.newPage();
  });

  it('test A - open example.com', async () => {
    console.log('TEST A');
    await page.goto('https://example.com');
  });

  it('test B - open example.org', async () => {
    console.log('TEST B');
    await page.goto('https://example.org');
  });

  afterEach(async () => {
    console.log('afterEach - close page');
    await page.close();
  });

  afterAll(async () => {
    console.log('afterAll - close browser');
    await browser.close();
  });
});
