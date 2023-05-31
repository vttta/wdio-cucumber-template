import { Given, When, Then } from '@wdio/cucumber-framework';
import {
	USERNAME,
	PASSWORD,
	USERNAME_LOCKED,
	USERNAME_GLITCH,
	USERNAME_PROBLEM,
} from '../../env';
import LoginPage from '../pages/login.page';

When(
	/^the user enters a "(valid|invalid|locked out|problem|performance glitch)" username$/,
	async function (validity: string) {
		const usernameValues = {
			valid: USERNAME,
			'locked out': USERNAME_LOCKED,
			problem: USERNAME_PROBLEM,
			'performance glitch': USERNAME_GLITCH,
			invalid: 'invalid_user_000',
		};

		if (usernameValues[validity]) {
			await LoginPage.usernameField.addValue(validity);
		}
	}
);

When(
	/^the user enters a "(valid|invalid)" password$/,
	async function (validity: string) {
		const passwordValues = {
			valid: PASSWORD,
			invalid: 'invalid_password_000',
		};

		if (passwordValues[validity]) {
			await LoginPage.passwordField.addValue(validity);
		}
	}
);

When(/^the user clicks the "log in" button$/, async function () {
	await LoginPage.loginButton.click();
});

When(/^the user logs in$/, async function () {
	await LoginPage.usernameField.addValue(USERNAME);
	await LoginPage.passwordField.addValue(PASSWORD);
	await LoginPage.loginButton.click();
});
