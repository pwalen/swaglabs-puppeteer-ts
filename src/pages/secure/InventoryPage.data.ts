type KeysOf<T> = keyof T;
// type ValuesOf<T> = T[keyof T];

export type PageDataKey = KeysOf<typeof PAGE_DATA>;
// export type PageDataValue = ValuesOf<typeof PAGE_DATA>;

export const PAGE_DATA = {
  PRODUCT_COUNT: 6,
  PRODUCT_NAMES: [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Fleece Jacket',
    'Sauce Labs Onesie',
    'Test.allTheThings() T-Shirt (Red)',
  ],
} as const;

export interface Product {
  name: string;
  price: string;
  description: string;
}
