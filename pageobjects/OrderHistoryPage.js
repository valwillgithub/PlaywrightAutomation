class OrderHistoryPage {
  constructor(page) {
    this.page = page;
    this.ordersTable = page.locator('tbody');
    this.rows = page.locator('tbody tr');
  }

  async searchAndSelectOrder(orderId) {
    await this.rows.first().waitFor();
    let found = false;

    const elements = await this.page.$$('tbody tr');
    console.log('element length => ', elements.length);
    for (const el of elements) {
      let mama = await el.$eval('th', (el) => el.textContent);
      if (mama.trim() === orderId) {
        console.log('found => ', mama);
        //await el.$eval('button.btn-danger', (bt) => bt.click());
        await el.$eval('button.btn-primary', (bt) => bt.click());
        found = true;
        break;
      }
    }
    if (!found) {
      console.log(`${orderId} not found`);
    }
  }

  async getOrderId() {
    const orderidSummary = await this.page.locator('.col-text').textContent();
    return await orderidSummary.trim();
  }
} //Class
module.exports = { OrderHistoryPage };
