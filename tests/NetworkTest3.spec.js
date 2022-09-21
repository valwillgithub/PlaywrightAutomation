const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');

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
const fakePayloadOrders = { data: [], message: 'No Orders' };

let response1;
test.beforeAll(async () => {
	const apiContext = await request.newContext();
	const apiUtils = new APIUtils(apiContext, loginPayLoad);
	response1 = await apiUtils.createOrder(orderPayload);
});

test('Place the order', async ({ page }) => {
	page.addInitScript((value) => {
		window.localStorage.setItem('token', value);
	}, response1.token);

	await page.goto('https://rahulshettyacademy.com/client');
	await page.locator("button[routerlink*='myorders']").click();
	const valo = await page
		.locator('tbody>tr>th:first-child')
		.first()
		.textContent();
	console.log('valo => ', valo);
	await page.route(
		`https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=${valo}`,
		(route) =>
			route.continue({
				url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6',
			})
	);

	await page.locator("button:has-text('View')").first().click();
});
