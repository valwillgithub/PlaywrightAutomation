import { test as base } from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';
import { CartPage } from '../pageobjects/CartPage';
import { OrderHistoryPage } from '../pageobjects/OrderHistoryPage';
import { DashboardPage } from '../pageobjects/DashboardPage';
import { PaymentPage } from '../pageobjects/PaymentPage';

const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },
  orderHistoryPage: async ({ page }, use) => {
    await use(new OrderHistoryPage(page));
  },
});

export default test;

// exports.customtest = base.test.extend({
//   testData: {
//     email: 'vastyjay@yahoo.com',
//     password: 'Kumasi117',
//     productName: 'iphone 13 pro',
//     url: 'https://rahulshettyacademy.com/client',
//   },
// });
