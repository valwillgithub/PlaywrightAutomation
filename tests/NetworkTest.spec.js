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

  await page.route(
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/62fbabfbc4d0c51f4f0e6c02',
    async (route) => {
      const response = await page.request.fetch(route.request());
      await route.fulfill({
        contentType: 'application/json',
        response,
        body: JSON.stringify(fakePayloadOrders),
      });
    }
  );
  await page.goto('https://rahulshettyacademy.com/client');

  //intercept response - API response -> playwright fakeresponse ->
  // browser -> render data on frontend
  await page.locator("button[routerlink*='myorders']").click();
  //const tRows = page.locator('tbody tr');
  //await tRows.first().waitFor();
});
