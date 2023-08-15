import { webkit, chromium, test, expect, firefox } from '@playwright/test';

test.describe('Koushik Playwright 99', () => {
  test('Launch Browser Test ', async () => {
    const browser = await chromium.launch({
      headless: false,
      channel: 'msedge',
      // executablePath:
      //   'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
      //'C:/Program Files/Mozilla Firefox/firefox.exe',
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    page.on('response', (res) => {
      console.log('🚀 ~ file: LaunchBrowser.test.ts:14 ~ test ~ res:', res);
      return console.log(`>> ${res.status()} ${res.url()}`);
    });
    await page.goto('https://letcode.in');
    await page.click('text=Log in');
    await page.fill("input[name='email']", 'vastyjay@yahoo.com');
    await page.fill("input[name='password']", 'letcodein');
    await page.click("button:text('LOGIN')");
    await page.pause();
    page.on('dialog', async (alert) => {});

    //await page.click('text=Accept');
    //await browser.close();
  });

  // test.only('Drag and Drop', async ({ page }) => {
  //   await page.goto('https://letcode.in/dropable');
  // });
});
