import { Page } from 'puppeteer';
import { BasePage } from '../BasePage';
import { URLS } from '../data/urls';
import { LOCATORS_LOGIN_PAGE } from '../data/locators';
import { PAGE_DATA } from '../data/pageData';
import {
  ACCEPTED_USERNAMES,
  ACCEPTED_PASSWORDS,
  INCORRECT_USERNAMES,
  INCORRECT_PASSWORDS,
} from '../data/loginData';

export class LoginPage extends BasePage {
  urls: typeof URLS;
  locators: typeof LOCATORS_LOGIN_PAGE;
  pageData: typeof PAGE_DATA;
  acceptedUsernames: typeof ACCEPTED_USERNAMES;
  acceptedPasswords: typeof ACCEPTED_PASSWORDS;
  incorrectUsernames: typeof INCORRECT_USERNAMES;
  incorrectPasswords: typeof INCORRECT_PASSWORDS;

  constructor(page: Page) {
    super(page);
    this.urls = URLS;
    this.locators = LOCATORS_LOGIN_PAGE;
    this.pageData = PAGE_DATA;
    this.acceptedUsernames = ACCEPTED_USERNAMES;
    this.acceptedPasswords = ACCEPTED_PASSWORDS;
    this.incorrectUsernames = INCORRECT_USERNAMES;
    this.incorrectPasswords = INCORRECT_PASSWORDS;
  }

  async open(): Promise<void> {
    await super.open(this.urls.URL_LOGIN_PAGE);
  }

  async getPageTitle(): Promise<string> {
    return await super.getPageTitle();
  }

  async getText(selector: string): Promise<string> {
    return await super.getText(selector);
  }

  async click(selector: string): Promise<void> {
    await super.click(selector);
  }

  async type(selector: string, text: string): Promise<void> {
    await super.type(selector, text);
  }

  async reloadPage(): Promise<void> {
    await super.reloadPage();
  }

  async login(username: string, password: string): Promise<void> {
    await this.type(this.locators.USERNAME, username);
    await this.type(this.locators.PASSWORD, password);
    await this.click(this.locators.SUBMIT);
  }
}
