const { test, expect } = require('@playwright/test');

test.describe.configure({ mode: 'parallel' });
test('@web Browser Context Test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log('Page title 1 => ', await page.title());
  //await page.locator('#username').type('rahulshettyacademy');
  await page.getByLabel('Username:').type('rahulshettyacademy');
  await page.locator('#password').type('learning');
  //await page.locator('#signInBtn').click();
  await page.getByRole('button', { name: 'Sign In' }).click();

  console.log(await page.title());
  await expect(page).toHaveTitle('ProtoCommerce12');
  //console.log(
  //   'Error message =>',
  //   await page.locator("[style*='block']").textContent()
  // );
  // await expect(page.locator("[style*='block']")).toContainText('Incorrect');
});

test('Browser Context-Validating Error Login', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const username = page.locator('#username');
  const signIn = page.locator('#signInBtn');
  const cardTitles = page.locator('.card-body a');
  //page.route('**/*.css', (route) => route.abort());
  //page.route('**/*.{css,jpg,jpeg,png}', (route) => route.abort());

  page.on('response', (res) => console.log(res.statusText()));
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log('Page title 1 => ', await page.title());
  await username.type('rahulshetty');
  await page.locator('#password').type('learning');
  await signIn.click();
  console.log(
    'Error message =>',
    await page.locator("[style*='block']").textContent()
  );
  await expect
    .soft(page.locator("[style*='block']"))
    .toContainText('Incorrect');
  await username.fill('');
  await username.fill('rahulshettyacademy');

  // non service based up
  await Promise.all([page.waitForNavigation(), signIn.click()]);
  //await signIn.click();
  //await page.waitForNavigation();

  // console.log(await cardTitles.first().textContent());
  // console.log(await cardTitles.nth(1).textContent());
  // console.log(await cardTitles.last().textContent());
  const allTitles = await cardTitles.allTextContents();
  console.log('allTitles => ', allTitles);
  await page.pause();
});

test('UI Controls', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const username = page.locator('#username');
  const signIn = page.locator('#signInBtn');
  const dropdown = page.locator('select.form-control');
  const documentLink = page.locator("[href*='documents-request']");

  await dropdown.selectOption('consult');
  //await page.pause();
  await page.locator('#usertype').last().click();
  await page.locator('#okayBtn').click();
  console.log(
    'isChecked = >',
    await page.locator('#usertype').last().isChecked()
  );
  await expect(page.locator('#usertype').last()).toBeChecked();
  await page.locator('#terms').click();
  await expect(page.locator('#terms')).toBeChecked();
  await page.locator('#terms').uncheck();
  expect(await page.locator('#terms').isChecked()).toBeFalsy();
  await expect(documentLink).toHaveAttribute('class', 'blinkingText');
  //assertion
});

// test.use({
//   viewport: {
//     height: 928,
//     width: 1528,
//   },
// });
test('Child Window Handle', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const documentLink = page.locator("[href*='documents-request']");

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const newPage = await Promise.all([
    context.waitForEvent('page'),
    documentLink.click(),
  ]);

  //await page.pause();

  const text = await newPage[0].locator('.red').textContent();
  console.log('txt => ', text);
  const arrayText = text.split('@');
  const domain = arrayText[1].split(' ')[0];
  console.log('domain => ', domain);
  await page.locator('#username').type(domain);
  console.log('inputvalue => ', await page.locator('#username').inputValue());
});
