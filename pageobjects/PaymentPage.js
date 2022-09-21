const { expect } = require('@playwright/test');

export class PaymentPage {
	constructor(page) {
		this.page = page;
		this.country = page.locator("[placeholder*='Country']");
		//this.emailId = page.locator(".user__name [type='text']:nth-child(1)");
		this.emailId = page.locator(".user__name [type='text']").first();

		this.dropdown = page.locator('.ta-results');
		this.orderConfirmationText = page.locator('.hero-primary');
		this.orderId = page.locator('.em-spacer-1 .ng-star-inserted');
	}

	async selectCountry(countryCode, countryName) {
		await this.page.locator('input[type="text"]').nth(1).fill('956');
		await this.page.locator('input[type="text"]').nth(2).fill('v williams');
		await this.country.click();
		await this.country.type(countryCode, { delay: 100 });

		await this.dropdown.waitFor();
		const optionCount = await this.dropdown.locator('button').count();
		for (let i = 0; i < optionCount; ++i) {
			let rc = await this.dropdown.locator('button').nth(i).textContent();
			if (rc.trim() === countryName) {
				await this.dropdown.locator('button').nth(i).click();
				break;
			}
		}
	}
	async verifyEmail(userEmail) {
		await expect(this.emailId).toHaveText(userEmail);
	}
	async placeOrder() {
		await this.page.locator('text=Place Order').click();
	}

	async getOrderId() {
		let orderId = (
			await this.page.locator('.em-spacer-1 .ng-star-inserted').textContent()
		).split(' | ')[1];

		return orderId;
	}

	async verifyOrderConfirmationMessage() {
		await expect(this.page.locator('.hero-primary')).toHaveText(
			' Thankyou for the order. '
		);
	}
} //Class
