const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');
const { OrderHistoryPage } = require('./OrderHistoryPage');
const { PaymentPage } = require('./PaymentPage');
const { CartPage } = require('./CartPage');

export class POManager {
	constructor(page) {
		this.page = page;
		this.loginPage = new LoginPage(this.page);
		this.dashboardPage = new DashboardPage(this.page);
		this.orderHistoryPage = new OrderHistoryPage(this.page);
		this.paymentPage = new PaymentPage(this.page);
		this.cartPage = new CartPage(this.page);
	}

	getLoginPage() {
		return this.loginPage;
	}

	getDashboardPage() {
		return this.dashboardPage;
	}

	getOrderHistoryPage() {
		return this.orderHistoryPage;
	}
	getPaymentPage() {
		return this.paymentPage;
	}
	getCartPage() {
		return this.cartPage;
	}
} //Class
