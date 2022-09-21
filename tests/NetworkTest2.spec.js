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
let response1;
test.beforeAll(async () => {
	const apiContext = await request.newContext();
	const apiUtils = new APIUtils(apiContext, loginPayLoad);
	response1 = await apiUtils.createOrder(orderPayload);
});

test('Place the order', async ({ page }) => {
	//const fakePayloadOrders = { data: [], message: 'No Orders' };

	const fakePayloadOrders = {
		data: [
			{
				_id: '63100f4ec4d0c51f4f13bd7c',
				orderById: '62fbabfbc4d0c51f4f0e6c02',
				orderBy: 'vastyjay@yahoo.com',
				productOrderedId: 'Thu Sep 01',
				productName: 'adidas original',
				country: 'Ghana',
				productDescription: 'adidas original',
				productImage:
					'https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649488046.jpg',
				orderDate: null,
				orderPrice: '31500',
				__v: 0,
			},
		],
		count: 1,
		message: 'Orders fetched for customer Successfully',
	};

	page.addInitScript((value) => {
		window.localStorage.setItem('token', value);
	}, response1.token);

	await page.route(
		'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/62fbabfbc4d0c51f4f0e6c02',
		(route) => {
			route.fulfill({
				contentType: 'application/json',
				body: JSON.stringify(fakePayloadOrders),
			});
		}
	);
	await page.goto('https://rahulshettyacademy.com/client');
	await page.locator("button[routerlink*='myorders']").click();
});
