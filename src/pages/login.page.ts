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
}

export default new LoginPage();
