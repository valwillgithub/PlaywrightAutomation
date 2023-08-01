import { _android } from '@playwright/test';
import { test } from '@playwright/test';

test('Android mobile test', async () => {
	//connect to the device
	const [device] = await _android.devices();
	console.log(`Model: ${device.model()}`);
	console.log(`Serial: ${device.serial()}`);
	//Take screenshot of the device
	await device.screenshot({ path: 'device.png' });

	//Launch Chrome browser
	await device.shell('am force-stop com.android.chrome');
	const context = await device.launchBrowser();

	//Use BrowserContext as usual
	const page = await context.newPage();
	await page.goto('https://letcode.in');
	console.log(await page.evaluate(() => window.location.href));
	await page.screenshot({ path: `page.png` });

	await page.click("a[role='button']");
	await page.click("text='Log in");
	await page.fill("input[name='email']", 'vastyjay@yahoo.com');
	await page.fill("input[name='password']", 'letcodein');
	await page.click("button:text('LOGIN')");
	await page.pause();
	await page.click("a[role='button']");
	await page.click('text=Sign out');
});
