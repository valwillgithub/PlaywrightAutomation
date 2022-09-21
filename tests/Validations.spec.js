const { test, expect } = require('@playwright/test');

test('Popup validations', async ({ page }) => {
	// await page.goto('https://www.google.co.uk');
	// await page.goBack();
	// await page.goForward();

	await page.goto('https://www.rahulshettyacademy.com/AutomationPractice/');
	await expect(page.locator('#displayed-text')).toBeVisible();
	await page.locator('#hide-textbox').click();
	await expect(page.locator('#displayed-text')).toBeHidden();

	page.on('dialog', (dialog) => dialog.accept());
	await page.locator('#confirmbtn').click();
	await page.locator('#mousehover').hover();
	const framesPage = page.frameLocator('#courses-iframe');
	await framesPage.locator("li a[href*='lifetime-access']:visible").click();
	const textCheck = await framesPage.locator('.text h2').textContent();
	console.log('textCheck => ', textCheck.split(' ')[1]);
});

test('Screenshot Validations', async ({ page }) => {
	await page.goto('https://www.rahulshettyacademy.com/AutomationPractice/');
	await expect(page.locator('#displayed-text')).toBeVisible();

	await page
		.locator('#displayed-text')
		.screenshot({ path: './screenshots/parcialScreenshot.png' });
	await page.locator('#hide-textbox').click();
	await page.screenshot({ path: './screenshots/fullpageScreenshot.png' });

	await expect(page.locator('#displayed-text')).toBeHidden();
});
