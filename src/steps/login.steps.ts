import { Given, When, Then } from '@wdio/cucumber-framework';
import {
	USERNAME,
	PASSWORD,
	USERNAME_LOCKED,
	USERNAME_GLITCH,
	USERNAME_PROBLEM,
} from '../../env';
import loginPage from '../pages/login.page';
import { waitUntilPageLoads } from '../support/waiters';
import { negativeChecks } from '../testData';

Given(/^the user is logged in$/, async function () {
	await browser.url('');
	await waitUntilPageLoads();
	await loginPage.login(USERNAME, PASSWORD);
});

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

		await loginPage.usernameField.addValue(username);
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

		await loginPage.passwordField.addValue(pass);
	}
);

When(/^the user clicks the "log in" button$/, async function () {
	await loginPage.loginButton.click();
});
