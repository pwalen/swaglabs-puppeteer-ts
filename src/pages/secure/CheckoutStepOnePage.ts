import { BasePage } from '@pages/BasePage';
import { URLS } from '@data/urls';
import { LOCATORS_CHECKOUT_STEP_ONE_PAGE } from './CheckoutStepOnePage.locators';

export class CheckoutStepOnePage extends BasePage {
  async open(): Promise<void> {
    await super.open(URLS.URL_CHECKOUT_STEP_ONE_PAGE);
  }

  getExpectedPageURL(): string {
    return URLS.URL_CHECKOUT_STEP_ONE_PAGE;
  }

  async isCheckoutInfoContainerVisible(): Promise<boolean> {
    return await this.isElementVisible(
      LOCATORS_CHECKOUT_STEP_ONE_PAGE.CHECKOUT_INFO_CONTAINER,
    );
  }

  async isLoaded(): Promise<boolean> {
    if (
      (await this.getPageURL()) === this.getExpectedPageURL() &&
      (await this.isCheckoutInfoContainerVisible())
    ) {
      return true;
    } else {
      return false;
    }
  }
}
