const { test, expect } = require('@playwright/test');
const playwright = require('playwright');
const userdata = JSON.parse(JSON.stringify(require('../utils/UserData.json')));

test.describe('Challenge APi Suite', async () => {
  test('API Exercise Get Pet By Status', async ({ request }) => {
    const res = await request.get(
      'https://petstore.swagger.io/v2/pet/findByStatus',
      {
        params: {
          status: 'pending',
        },
      }
    );

    //const resBody = JSON.parse(await res.text());
    const resBody = await res.json();
    console.log('id =>', await resBody[0].id);
    console.log('name =>', await resBody[0].category.name);
    expect(res.status()).toEqual(200);
    expect(await resBody[0].id).toEqual(9223372036854775000);
    expect(await resBody[0].category.name).toEqual('Dogs');
  });

  test('API Exercise Create Multiple Users', async ({ request }) => {
    //const apiContext = playwright.request.newContext();
    const response = await request.post(
      'https://petstore.swagger.io/v2/user/createWithArray',
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: userdata,
      }
    );
    const responseJson = await response.json();
    console.log('responseJson => ', responseJson);
    expect(response.status()).toEqual(200);
  });

  test('API Get User By Username', async ({ request }) => {
    const username = userdata[0].username;
    const response = await request.get(
      `https://petstore.swagger.io/v2/user/${username}`
    );
    const responseJson = await response.json();
    console.log('responseJson => ', responseJson);
    expect(response.status()).toEqual(200);
    expect.soft(await responseJson.userStatus).toEqual(1);
    expect.soft(await responseJson.username).toEqual(userdata[0].username);
    expect.soft(await responseJson.firstName).toEqual(userdata[0].firstName);
    expect.soft(await responseJson.lastName).toEqual(userdata[0].lastName);
    expect.soft(await responseJson.email).toEqual(userdata[0].email);
    expect.soft(await responseJson.phone).toEqual(userdata[0].phone);
  });
}); // test.describe
