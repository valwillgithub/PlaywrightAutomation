const { test, expect } = require('@playwright/test');
//const { LoginPage } = require('../pageobjects/LoginPage');
//const { DashboardPage } = require('../pageobjects/DashboardPage');
const { POManager } = require('../pageobjects/POManager');
const testdata = JSON.parse(JSON.stringify(require('../utils/Testdata.json')));

for (const data of testdata) {
	test(`Ecommerce Test ${data.productName}`, async ({ page }) => {
		const poManager = new POManager(page);
		// const email = 'vastyjay@yahoo.com';
		// const password = 'Kumasi117';
		// const productName = 'iphone 13 pro';
		const loginPage = poManager.getLoginPage();
		await loginPage.navigateTo(data.url);
		await loginPage.login(data.email, data.password);
		const dashboard = poManager.getDashboardPage();
		await dashboard.searchProduct(data.productName);
		await dashboard.gotoCart();

		const cartPage = poManager.getCartPage();
		await cartPage.verifyProductDisplayed(data.productName);
		await cartPage.clickCheckout();

		const paymentPage = poManager.getPaymentPage();
		await paymentPage.selectCountry('gha', 'Ghana');
		await paymentPage.verifyEmail(data.email);
		await paymentPage.placeOrder();
		await paymentPage.verifyOrderConfirmationMessage();
		let orderId = await paymentPage.getOrderId();

		await dashboard.clickMyorders();

		const orderHistoryPage = poManager.getOrderHistoryPage();
		await orderHistoryPage.searchAndSelectOrder(orderId);
		const orderidSummary = await orderHistoryPage.getOrderId();

		expect(orderidSummary).toEqual(orderId);
	});
}
