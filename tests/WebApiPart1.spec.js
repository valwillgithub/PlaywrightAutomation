const { test, expect, request } = require('@playwright/test');
const loginPayLoad = {
	userEmail: 'vastyjay@yahoo.com',
	userPassword: 'Kumasi117',
};
const orderPayload = {
	orders: [
		{
			country: 'Ghana',
			productOrderedId: '6262e990e26b7e1a10e89bfa',
		},
	],
};
let token, orderId;

test.beforeAll(async () => {
	const apiContext = await request.newContext();
	const loginResponse = await apiContext.post(
		'https://www.rahulshettyacademy.com/api/ecom/auth/login',
		{
			data: loginPayLoad,
		}
	);
	expect(loginResponse.status()).toEqual(200);
	const loginResponseJson = await loginResponse.json();
	token = loginResponseJson.token;
	console.log('token => ', token);

	// Create order API
	const orderResponse = await apiContext.post(
		'https://www.rahulshettyacademy.com/api/ecom/order/create-order',
		{
			data: orderPayload,
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
		}
	);
	const orderResponseJson = await orderResponse.json();
	orderId = orderResponseJson.orders[0];
	console.log('order response => ', orderResponseJson);
});

test('Web API Client App Add To Bag', async ({ page }) => {
	page.addInitScript((value) => {
		window.localStorage.setItem('token', value);
	}, token);

	// await page.locator('#userEmail').type(email);
	// await page.locator('#userPassword').type('Kumasi117');
	// await page.locator("[value='Login']").click();
	// await page.waitForLoadState('networkidle');

	await page.goto('https://rahulshettyacademy.com/client');

	await page.locator("button[routerlink*='myorders']").click();
	const tRows = page.locator('tbody tr');
	await tRows.first().waitFor();

	const elements = await page.$$('tbody tr');
	console.log('element length => ', elements.length);
	for (const el of elements) {
		let mama = await el.$eval('th', (el) => el.textContent);
		if (mama.trim() === orderId) {
			console.log('found => ', mama);
			//await el.$eval('button.btn-danger', (bt) => bt.click());
			await el.$eval('button.btn-primary', (bt) => bt.click());
			break;
		}
	}
	const orderidSummary = await page.locator('.col-text').textContent();
	expect(orderidSummary).toEqual(orderId);
});
