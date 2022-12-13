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
let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayload);
});

test('Place the order', async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem('token', value);
  }, response.token);

  await page.goto('https://rahulshettyacademy.com/client');

  await page.locator("button[routerlink*='myorders']").click();
  const tRows = page.locator('tbody tr');
  await tRows.first().waitFor();

  const elements = await page.$$('tbody tr');
  console.log('element length => ', elements.length);
  for (const el of elements) {
    let mama = await el.$eval('th', (el) => el.textContent);
    if (mama.trim() === response.orderId) {
      console.log('found => ', mama);
      //await el.$eval('button.btn-danger', (bt) => bt.click());
      await el.$eval('button.btn-primary', (bt) => bt.click());
      break;
    }
  }
  const orderidSummary = await page.locator('.col-text').textContent();
  expect(orderidSummary).toEqual(response.orderId);
});
