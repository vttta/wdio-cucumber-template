import { BasePage } from './base.page';

class LoginPage extends BasePage {
	get usernameField() {
		return $('input#user-name');
	}
	get passwordField() {
		return $('input#password');
	}
	get loginButton() {
		return $('#login-button');
	}

	async login(username: string, password: string) {
		await this.usernameField.addValue(username);
		await this.passwordField.addValue(password);
		await this.loginButton.click();
	}
}

export default new LoginPage();
