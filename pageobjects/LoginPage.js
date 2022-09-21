export class LoginPage {
	constructor(page) {
		this.page = page;
		this.signInbutton = page.locator("[value='Login']");
		this.username = page.locator('#userEmail');
		this.password = page.locator('#userPassword');
	}

	async login(username, password) {
		await this.username.type(username);
		await this.password.type(password);
		await this.signInbutton.click();
		await this.page.waitForLoadState('networkidle');
	}

	async navigateTo(url) {
		await this.page.goto(url);
	}
} //Class
