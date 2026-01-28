import puppeteer, { Browser, Page } from 'puppeteer';

jest.setTimeout(10000);

let browser: Browser;
let page: Page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
    slowMo: 0,
  });
});

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(async () => {
  await page.close();
});

afterAll(async () => {
  await browser.close();
});

export function getPage(): Page {
  if (page) {
    return page;
  }
  throw new Error('Page not initialized - setup not executed');
}
