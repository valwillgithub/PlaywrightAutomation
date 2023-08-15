const productsText = "[class='card-body'] b";

export class DashboardPage {
  //let productsText = page.locator('.card-body b');
  //productsText = "[class='card-body'] b";

  constructor(page) {
    this.page = page;
    this.products = page.locator('.card-body');
    this.cart = page.locator("[routerlink*='cart']");
  }

  async searchProduct(productName) {
    await this.products.first().waitFor();
    const titles = await this.page.locator(productsText).allTextContents();
    //const titles = await this.productsText.allTextContents();
    console.log('titles => ', titles);
    const count = await this.products.count();

    for (let i = 0; i < count; i++) {
      if (
        (await this.products.nth(i).locator('b').textContent()) === productName
      ) {
        //await this.page.waitForTimeout(2000);
        await this.products.nth(i).locator('text = Add To Cart').click();
        break;
      }
    }
  }

  async gotoCart() {
    await this.cart.click();
  }

  async clickMyorders() {
    await this.page.locator("button[routerlink*='myorders']").click();
    await this.page.locator('tbody tr').first().waitFor();
    //await tRows.first().waitFor();
  }
} //Class
