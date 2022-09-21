class APIUtils {
	constructor(apiContext, loginPayLoad) {
		this.apiContext = apiContext;
		this.loginPayLoad = loginPayLoad;
	}

	async getToken() {
		const loginResponse = await this.apiContext.post(
			'https://www.rahulshettyacademy.com/api/ecom/auth/login',
			{
				data: this.loginPayLoad,
			}
		);
		const loginResponseJson = await loginResponse.json();
		let token = loginResponseJson.token;
		console.log('token => ', token);
		return token;
	}

	async createOrder(orderPayload) {
		let response = {};
		response.token = await this.getToken();
		const orderResponse = await this.apiContext.post(
			'https://www.rahulshettyacademy.com/api/ecom/order/create-order',
			{
				data: orderPayload,
				headers: {
					Authorization: response.token,
					'Content-Type': 'application/json',
				},
			}
		);
		const orderResponseJson = await orderResponse.json();
		const orderId = orderResponseJson.orders[0];
		console.log('order response => ', orderResponseJson);
		response.orderId = orderId;
		return response;
	}
} // class

module.exports = { APIUtils };
