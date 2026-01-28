import { Page } from 'puppeteer';
import { BasePage } from '../BasePage';
import { URLS } from '@data/urls';
import { LOCATORS_LOGIN_PAGE } from './LoginPage.locators';
import {
  ACCEPTED_USERNAMES,
  ACCEPTED_PASSWORDS,
  INCORRECT_USERNAMES,
  INCORRECT_PASSWORDS,
  PAGE_DATA,
} from './LoginPage.data';

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

  async typeUsername(username: string): Promise<void> {
    await this.type(this.locators.USERNAME, username);
  }

  async typePassword(password: string): Promise<void> {
    await this.type(this.locators.PASSWORD, password);
  }

  async submit(): Promise<void> {
    await this.click(this.locators.SUBMIT);
  }

  async getErrorMessage(): Promise<string> {
    return await super.getText(this.locators.ERROR);
  }
}
