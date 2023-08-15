import { expect } from '@playwright/test';
import test from '../utils/testfixture';
const testdata = JSON.parse(JSON.stringify(require('../utils/Testdata.json')));
//import * as testdata from '../utils/Testdata.json';

for (const data of testdata) {
  test(`Ecommerce Test ${data.productName}`, async ({
    loginPage,
    dashboardPage,
    cartPage,
    paymentPage,
    orderHistoryPage,
  }) => {
    await loginPage.navigateTo(data.url);
    await loginPage.login(data.email, data.password);
    await dashboardPage.searchProduct(data.productName);
    await dashboardPage.gotoCart();

    await cartPage.verifyProductDisplayed(data.productName);
    await cartPage.clickCheckout();
    await paymentPage.selectCountry('gha', 'Ghana');
    await paymentPage.verifyEmail(data.email);
    await paymentPage.placeOrder();
    await paymentPage.verifyOrderConfirmationMessage();
    let orderId = await paymentPage.getOrderId();

    await dashboardPage.clickMyorders();

    await orderHistoryPage.searchAndSelectOrder(orderId);
    const orderidSummary = await orderHistoryPage.getOrderId();
    expect(orderidSummary).toEqual(orderId);
  });
}
