const { webkit, chromium, test, firefox } = require('@playwright/test');

test('@web Etsy Intercept Test ', async () => {
	const browser = await webkit.launch({ headless: false });
	const context = await browser.newContext();
	const page = await context.newPage();

	//page.on('request', (req) => console.log('>>> ', req.url()));
	// page.on('request', (req) =>
	// 	console.log(`>> ${req.method()} ${req.resourceType()} ${req.url()}`)
	// );

	page.on('response', (res) => console.log(`>> ${res.status()} ${res.url()}`));

	await page.goto('https://etsy.com');
	await page.click('text=Accept');
	await page.fill('input', 'jeans');

	await page.keyboard.press('Enter');

	//await page.click('text=Accept');

	await browser.close();
});

test('Danube Intercept Test ', async () => {
	const browser = await webkit.launch({ headless: false });
	const context = await browser.newContext();
	const page = await context.newPage();

	const responseOject = [
		{
			author: 'Valmond Williams',
			genre: 'novel',
			id: 1,
			price: '4.95',
			rating: '*****',
			stock: '1',
			title: 'Life Story Of Val Williams',
		},
	];

	await page.route('https://danube-webshop.herokuapp.com/api/books', (route) =>
		route.fulfill({
			contentType: 'application/json',
			body: JSON.stringify(responseOject),
		})
	);

	await page.goto('https://danube-webshop.herokuapp.com/');

	await browser.close();
});
