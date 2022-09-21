const { expect } = require('@playwright/test');
const { customtest } = require('../utils/testfixture');
const { POManager } = require('../pageobjects/POManager');
//const testdata = JSON.parse(JSON.stringify(require('../utils/Testdata.json')));

customtest(`Ecommerce Test Using Fixture`, async ({ page, testData }) => {
	const poManager = new POManager(page);
	const loginPage = poManager.getLoginPage();
	await loginPage.navigateTo(testData.url);
	await loginPage.login(testData.email, testData.password);
	const dashboard = poManager.getDashboardPage();
	await dashboard.searchProduct(testData.productName);
	await dashboard.gotoCart();

	const cartPage = poManager.getCartPage();
	await cartPage.verifyProductDisplayed(testData.productName);
	await cartPage.clickCheckout();

	const paymentPage = poManager.getPaymentPage();
	await paymentPage.selectCountry('gha', 'Ghana');
	await paymentPage.verifyEmail(testData.email);
	await paymentPage.placeOrder();
	await paymentPage.verifyOrderConfirmationMessage();
	let orderId = await paymentPage.getOrderId();

	await dashboard.clickMyorders();

	const orderHistoryPage = poManager.getOrderHistoryPage();
	await orderHistoryPage.searchAndSelectOrder(orderId);
	const orderidSummary = await orderHistoryPage.getOrderId();

	expect(orderidSummary).toEqual(orderId);
});
