const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');

let response;
let webContext;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('#userEmail').fill('vastyjay@yahoo.com');
  await page.locator('#userPassword').type('Kumasi117');
  await page.locator("[value='Login']").click();
  await page.waitForLoadState('networkidle');
  await context.storageState({ path: 'state.json' });
  await context.close();
  webContext = await browser.newContext({ storageState: 'state.json' });

  //await browser.close();
});

test('Use Storage Stage Bypass Login', async () => {
  const productName = 'iphone 13 pro';
  const email = 'vastyjay@yahoo.com';

  const page = await webContext.newPage();
  //await page.pause();
  await page.goto('https://rahulshettyacademy.com/client');

  await page.waitForLoadState('networkidle');
  const products = await page.locator('.card-body');
  const titles = await products.allTextContents();
  console.log('titles => ', titles);
  const count = await products.count();

  for (let i = 0; i < count; i++) {
    if ((await products.nth(i).locator('b').textContent()) === productName) {
      await page.waitForTimeout(2000);
      await products.nth(i).locator('text = Add To Cart').click();
      break;
    }
  }
  await page.locator("button[routerlink*='cart']").click();
  await page.locator('div li').first().waitFor();
  const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible();

  expect(bool).toBeTruthy();
  await page.locator('text=Checkout').click();
  await page.locator('input[type="text"]').nth(1).fill('956');
  await page.locator('input[type="text"]').nth(2).fill('v williams');
  await page.locator('[placeholder="Select Country"]').click();
  await page
    .locator('[placeholder="Select Country"]')
    .type('gha', { delay: 100 });
  const dropdown = page.locator('.ta-results');
  await dropdown.waitFor();
  const optionCount = await dropdown.locator('button').count();
  for (let i = 0; i < optionCount; ++i) {
    if ((await dropdown.locator('button').nth(i).textContent()) === ' Ghana') {
      await dropdown.locator('button').nth(i).click();
      break;
    }
  }
  // Display email address
  console.log(
    await page.locator(".user__name [type='text']:nth-child(1)").textContent()
  );
  await expect(
    page.locator(".user__name [type='text']:nth-child(1)")
  ).toHaveText(email);

  // Click text=Place Order
  await page.locator('text=Place Order').click();

  await expect(page.locator('.hero-primary')).toHaveText(
    ' Thankyou for the order. '
  );

  let orderId = (
    await page.locator('.em-spacer-1 .ng-star-inserted').textContent()
  ).split(' | ')[1];

  console.log('orderId => ', orderId);

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
  //await page.pause();
});

//===============================================================
test.only('Use Storage Stage Print Titles', async () => {
  const page = await webContext.newPage();
  //await page.pause();
  await page.goto('https://rahulshettyacademy.com/client');
  await page.waitForLoadState('networkidle');
  const products = await page.locator('.card-body');
  const titles = await products.allTextContents();
  console.log('titles => ', titles);
});
