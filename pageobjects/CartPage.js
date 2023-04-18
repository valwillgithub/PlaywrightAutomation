//@ts-nocheck
const { expect } = require('@playwright/test');

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartProducts = page.locator('div li').first();
    //this.productsText = page.locator('.card-body b');
    //this.cart = page.locator("[routerlink*='cart']");
    //this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator('text=Checkout');
  }

  async verifyProductDisplayed(productName) {
    await this.cartProducts.waitFor();
    const bool = await this.page
      .locator("h3:has-text('" + productName + "')")
      .isVisible();
    expect(bool).toBeTruthy();
  }

  // async getProductLocator(productName) {
  // 	return this.page.locator("h3:has-text('" + productName + "')");
  // }
  async clickCheckout() {
    await this.checkout.click();
  }
} //Class
