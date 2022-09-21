const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');

const fakePayloadOrders = {
	data: [
		{
			_id: '6262e9d9e26b7e1a10e89c04',
			productName: 'iphone 13 pro',
			productCategory: 'electronics',
			productSubCategory: 'shirts',
			productPrice: 231500,
			productDescription: 'iphone 13 pro',
			productImage:
				'https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649561326.jpg',
			productRating: '0',
			productTotalOrders: '0',
			productStatus: true,
			productFor: 'men',
			productAddedBy: 'admin@gmail.com',
			__v: 0,
		},
	],
	count: 1,
	message: 'All Products fetched Successfully',
};

test('Place the order', async ({ page }) => {
	const email = 'vastyjay@yahoo.com';
	const productName = 'iphone 13 pro';
	await page.route(
		'https://rahulshettyacademy.com/api/ecom/product/get-all-products',
		(route) => {
			//let body = JSON.stringify(fakePayloadOrders);
			route.fulfill({
				contentType: 'application/json',
				body: JSON.stringify(fakePayloadOrders),
			});
		}
	);
	await page.goto('https://rahulshettyacademy.com/client');
	await page.locator('#userEmail').type(email);
	await page.locator('#userPassword').type('Kumasi117');
	await page.locator("[value='Login']").click();
	//await page.waitForLoadState('networkidle');
	const products = await page.locator('.card-body');
	//await page.pause();

	//await page.locator("button[routerlink='/dashboard/']").click();

	const titles = await products.allTextContents();
	console.log('titles => ', titles);
	const count = await products.count();
});
