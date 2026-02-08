export const LOCATORS_CART_PAGE = {
  CART_LIST: '[data-test="cart-list"]',
  CART_ITEM: '[data-test="inventory-item"]',
  ITEM_NAME: '[data-test="inventory-item-name"]',
  ITEM_PRICE: '[data-test="inventory-item-price"]',
  ITEM_DESCRIPTION: '[data-test="inventory-item-desc"]',
  REMOVE_BTN: 'button[id^="remove-sauce-labs"]',
  CHECKOUT_BTN: 'button[id="checkout"]',
  CART_BADGE: '[data-test="shopping-cart-badge"]',
  CART_LINK: '[data-test="shopping-cart-link"]',
} as const;
