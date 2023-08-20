const { When, Then, Given, And } = require('@cucumber/cucumber');
const { LoginPage } = require('../../pageobjects/LoginPage');
const { DashboardPage } = require('../../pageobjects/DashboardPage');
const { CartPage } = require('../../pageobjects/CartPage');
const { PaymentPage } = require('../../pageobjects/PaymentPage');
const { OrderHistoryPage } = require('../../pageobjects/OrderHistoryPage');
const { Page, Browser, expect } = require('@playwright/test');
//const { chromium } = require('playwright');
const playwright = require('playwright');

// let page;
// let browser =""

Given(
  'I navigate to the ecommerce website',
  { timeout: 100 * 1000 },
  async function () {
    let browser = await playwright.chromium.launch({
      headless: false,
      channel: 'msedge',
    });
    //let browser = await chromium.launch({ headless: false });
    //let context = await browser.newContext();
    this.page = await browser.newPage();
    this.loginPage = new LoginPage(this.page);
    await this.loginPage.navigateTo('https://rahulshettyacademy.com/client');
  }
);

When('I login with {string} and {string}', async function (username, password) {
  await this.loginPage.login(username, password);
});

When('I add {string} to Cart', async function (item) {
  this.dashboard = new DashboardPage(this.page);
  await this.dashboard.searchProduct(item);
  await this.dashboard.gotoCart();
});

Then('Verify {string} is displayed in the Cart', async function (item) {
  this.cartPage = new CartPage(this.page);
  await this.cartPage.verifyProductDisplayed(item);
  await this.cartPage.clickCheckout();
});

When('Enter valid details and place the order', async function () {
  this.paymentPage = new PaymentPage(this.page);
  await this.paymentPage.selectCountry('gha', 'Ghana');
  await this.paymentPage.verifyEmail('vastyjay@yahoo.com');
  await this.paymentPage.placeOrder();
  await this.paymentPage.verifyOrderConfirmationMessage();
  this.orderId = await this.paymentPage.getOrderId();
  await this.dashboard.clickMyorders();
});

Then('Verify order in present in the OrderHistory', async function () {
  this.orderHistoryPage = new OrderHistoryPage(this.page);
  await this.orderHistoryPage.searchAndSelectOrder(this.orderId);
  let orderidSummary = await this.orderHistoryPage.getOrderId();
  expect(orderidSummary).toEqual(this.orderId);
});
