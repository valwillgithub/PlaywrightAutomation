import { test, expect } from '@playwright/test';

test.describe.serial('Ghanaweb Test Suite', () => {
  const cookies = [
    {
      name: 'eupubconsent-v2',
      value: 'CPz8TTGPz8TTGAcABBENDbCgAAAAAH_AAChQJtNf_X__b2_r-_7_f_t0eY1P9',
      path: '/',
      domain: '.ghanaweb.com',
    },
  ];
  test('Goto Ghanaweb', async ({ browser }) => {
    const context = await browser.newContext();
    await context.addCookies(cookies);
    const page = await context.newPage();
    //const date1 = new Date().getTimezoneOffset();
    //await page.context().addCookies(cookies);

    await page.goto('https://www.ghanaweb.com');
    const headings = await page.locator('#mainnavinner li').all();

    //console.log(await headings.allInnerTexts());
    console.log('headings.length ', headings.length);
    // headings.forEach(async (ele) => {
    //   console.log('ele.textContent => ', await ele.textContent());
    // });

    for (let head of headings) {
      console.log('Home Page Headings => ', await head.textContent());
    }
    await headings[2].click();

    const menuheadings = await page.locator('#leftsection .menuheading').all();
    const allUls = await page.locator('#leftsection ul').all();

    // for (let menu of menuheadings) {
    //   console.log(await menu.textContent());
    //   console.log('----------------------------');

    //   for (let ul = 0; ul < allUls.length; ul++) {
    //     console.log(await allUls[ul].locator('li').allInnerTexts());
    //     break;
    //   }
    // }
    //=================================================
    for (let i = 0; i < menuheadings.length; i++) {
      console.log(await menuheadings[i].textContent());
      console.log('==============================');
      let allList = await allUls[i].locator('li').all();
      //console.log('allList => ', allList.length);
      for (const k of allList) {
        console.log(await k.innerText());
      }
      console.log();
    }

    await page.pause();
  });
});
