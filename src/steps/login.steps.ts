import { Given, When, Then } from '@wdio/cucumber-framework';
import {
	USERNAME,
	PASSWORD,
	USERNAME_LOCKED,
	USERNAME_GLITCH,
	USERNAME_PROBLEM,
} from '../../env';
import LoginPage from '../pages/login.page';

const negativeChecks = {
	invalid: 'invalid_value_000',
	long: 'a'.repeat(256),
	'special characters': `!@#$%^&*()_+-={}|[]\\:";<>?,./`,
	numeric: '1234567890',
	alphabetic: 'abcdefghijklmnopqrstuvwxyz',
};

When(
	/^the user enters a(?:n)? "(valid|invalid|locked out|problem|performance glitch)" username$/,
	async function (usernameType: string) {
		const usernameValues = {
			valid: USERNAME,
			'locked out': USERNAME_LOCKED,
			problem: USERNAME_PROBLEM,
			'performance glitch': USERNAME_GLITCH,
			...negativeChecks,
		};

		const username = usernameValues[usernameType];

		if (!username) {
			throw new Error(`The "${usernameType}" username is not defined!`);
		}

		await LoginPage.usernameField.addValue(username);
	}
);

When(
	/^the user enters a(?:n)? "(valid|invalid)" password$/,
	async function (passwordType: string) {
		const passwordValues = {
			valid: PASSWORD,
			...negativeChecks,
		};

		const pass = passwordValues[passwordType];

		if (!pass) {
			throw new Error(`The "${passwordType}" password is not defined!`);
		}

		await LoginPage.passwordField.addValue(pass);
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
