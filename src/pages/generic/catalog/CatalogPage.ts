import { Page } from 'puppeteer';
import { BasePage } from '../../BasePage';
import { Product } from './types/Product';
import path from 'path';
import { GENERIC_LOCATORS_CATALOG_PAGE } from '@data/genericLocators';

export class CatalogPage extends BasePage {
  // Opens the mock catalog page
  async openCatalog(): Promise<void> {
    // TODO: implement
    let pathCatalog: string = path.resolve(
      __dirname,
      '../../../../smart-catalog/mock-pages/catalog.html'
    );
    pathCatalog = 'file://' + pathCatalog;
    await this.open(pathCatalog);
  }

  // Extracts all products from the page
  async extractProducts(): Promise<Product[]> {
    return await this.page.$$eval(
      GENERIC_LOCATORS_CATALOG_PAGE.PRODUCT_ELEMENTS,
      (elements, locators) => {
        return elements.map(element => {
          const nameEl = element.querySelector(locators.PRODUCT_NAME);
          const descriptionEl = element.querySelector(
            locators.PRODUCT_DESCRIPTION
          );
          const priceEl = element.querySelector(locators.PRODUCT_PRICE);
          const favoriteBtn = element.querySelector(
            locators.PRODUCT_FAVORITE_BUTTON
          );
          const detailBtn = element.querySelector(
            locators.PRODUCT_DETAIL_BUTTON
          );
          return {
            name: nameEl?.textContent?.trim() || '',
            price: priceEl?.textContent?.trim() || '',
            description: descriptionEl?.textContent?.trim() || null,
            hasFavorite: Boolean(favoriteBtn),
            hasDetailButton: Boolean(detailBtn),
          };
        });
      },
      GENERIC_LOCATORS_CATALOG_PAGE
    );
  }

  // Returns number of products
  async getProductCount(): Promise<number> {
    // TODO: implement
  }

  // Returns only products that have description
  async getProductWithDescription(): Promise<Product[]> {
    // TODO: implement
  }
}
