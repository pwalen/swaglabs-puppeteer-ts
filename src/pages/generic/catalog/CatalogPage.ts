import { Page } from 'puppeteer';
import { BasePage } from '../../BasePage';
import { Product } from './types/Product';
import path from 'path';

export class CatalogPage extends BasePage {
  // Opens the mock cvatalog page
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
    // TODO: implement
  }

  // Returns number odf products
  async getProductCount(): Promise<number> {
    // TODO: implement
  }

  // Returns only products that have description
  async getProductWithDescription(): Promise<Product[]> {
    // TODO: implement
  }
}
