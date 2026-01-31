import { BasePage } from '../BasePage';
import { URLS } from '@data/urls';
import { LOCATORS_LOGIN_PAGE } from './LoginPage.locators';
import {
  ACCEPTED_USERNAMES,
  ACCEPTED_PASSWORDS,
  INCORRECT_USERNAMES,
  INCORRECT_PASSWORDS,
  PAGE_DATA,
  PageDataKey,
} from './LoginPage.data';

export class LoginPage extends BasePage {
  async open(): Promise<void> {
    await super.open(URLS.URL_LOGIN_PAGE);
  }

  async typeUsername(username: string): Promise<void> {
    await this.type(LOCATORS_LOGIN_PAGE.USERNAME, username);
  }

  async typePassword(password: string): Promise<void> {
    await this.type(LOCATORS_LOGIN_PAGE.PASSWORD, password);
  }

  async submit(): Promise<void> {
    await this.click(LOCATORS_LOGIN_PAGE.SUBMIT);
  }

  async getErrorMessage(): Promise<string> {
    return await super.getText(LOCATORS_LOGIN_PAGE.ERROR);
  }

  async login(username?: string, password?: string): Promise<void> {
    if (username !== undefined) {
      await this.typeUsername(username);
    }
    if (password !== undefined) {
      await this.typePassword(password);
    }
    await this.submit();
  }

  async loginWithEmptyCredentials(): Promise<void> {
    const username = undefined;
    const password = undefined;
    await this.login(username, password);
  }

  async loginWithValidUserEmptyPass(): Promise<void> {
    const username = ACCEPTED_USERNAMES.STANDARD_USER;
    const password = undefined;
    await this.login(username, password);
  }

  async loginWithEmptyUserValidPass(): Promise<void> {
    const username = undefined;
    const password = ACCEPTED_PASSWORDS.PASSWORD;
    await this.login(username, password);
  }

  async loginWithValidUserInvalidPass(): Promise<void> {
    const username = ACCEPTED_USERNAMES.STANDARD_USER;
    const password = INCORRECT_PASSWORDS.INCORRECT_PASSWORD;
    await this.login(username, password);
  }

  async loginWithInvalidUserValidPass(): Promise<void> {
    const username = INCORRECT_USERNAMES.INCORRECT_USERNAME;
    const password = ACCEPTED_PASSWORDS.PASSWORD;
    await this.login(username, password);
  }

  async loginWithInvalidCredentials(): Promise<void> {
    const username = INCORRECT_USERNAMES.INCORRECT_USERNAME;
    const password = INCORRECT_PASSWORDS.INCORRECT_PASSWORD;
    await this.login(username, password);
  }

  async loginWithValidCredentials(): Promise<void> {
    const username = ACCEPTED_USERNAMES.STANDARD_USER;
    const password = ACCEPTED_PASSWORDS.PASSWORD;
    await this.login(username, password);
  }

  getExpectedErrorMessage(expectedKey: PageDataKey): string {
    return PAGE_DATA[expectedKey];
  }

  getExpectedTitle(expectedKey: PageDataKey): string {
    return PAGE_DATA[expectedKey];
  }
}
