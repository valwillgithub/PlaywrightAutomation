import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
	// Go to https://www.rahulshettyacademy.com/client/
	await page.goto('https://rahulshettyacademy.com/client');

	// Go to https://www.rahulshettyacademy.com/client/auth/login

	// Fill [placeholder="email\@example\.com"]
	await page
		.locator('[placeholder="email\\@example\\.com"]')
		.fill('vastyjay@yahoo.com');

	// Click [placeholder="enter your passsword"]
	await page.locator('[placeholder="enter your passsword"]').click();

	// Fill [placeholder="enter your passsword"]
	await page.locator('[placeholder="enter your passsword"]').fill('Kumasi117');

	// Click text=Login
	await page.locator('text=Login').click();
	await expect(page).toHaveURL(
		'https://rahulshettyacademy.com/client/dashboard/dash'
	);

	// Click text=Add To Cart >> nth=2
	await page.locator('text=Add To Cart').nth(2).click();

	// Click text=Cart 1
	await page.locator('text=Cart 1').click();
	await expect(page).toHaveURL(
		'https://rahulshettyacademy.com/client/dashboard/cart'
	);

	// Click text=Checkout
	await page.locator('text=Checkout').click();
	// await expect(page).toHaveURL(
	// 	'https://www.rahulshettyacademy.com/client/dashboard/order?prop=%5B%226262e9d9e26b7e1a10e89c04%22%5D'
	// );

	// Click input[type="text"] >> nth=1
	await page.locator('input[type="text"]').nth(1).click();

	// Fill input[type="text"] >> nth=1
	await page.locator('input[type="text"]').nth(1).fill('956');

	// Click input[type="text"] >> nth=2
	await page.locator('input[type="text"]').nth(2).click();

	// Fill input[type="text"] >> nth=2
	await page.locator('input[type="text"]').nth(2).fill('v williams');

	// Click [placeholder="Select Country"]
	await page.locator('[placeholder="Select Country"]').click();

	// Fill [placeholder="Select Country"]
	//await page.locator('[placeholder="Select Country"]').fill('gha');
	await page
		.locator('[placeholder="Select Country"]')
		.type('gha', { delay: 100 });

	// Click button:has-text("Ghana")
	await page.locator('button:has-text("Ghana")').click();

	// Click text=Place Order
	await page.locator('text=Place Order').click();
	// await expect(page).toHaveURL(
	// 	'https://www.rahulshettyacademy.com/client/dashboard/thanks?prop=%5B%226304dc1ec4d0c51f4f0fc5bb%22%5D'
	// );
});
