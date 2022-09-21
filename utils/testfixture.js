const base = require('@playwright/test');

exports.customtest = base.test.extend({
	testData: {
		email: 'vastyjay@yahoo.com',
		password: 'Kumasi117',
		productName: 'iphone 13 pro',
		url: 'https://rahulshettyacademy.com/client',
	},
});
