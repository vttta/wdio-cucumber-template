import { Given, Then, When } from '@wdio/cucumber-framework';
import { pressKey } from '../support/actions';
import { KeyboardActions } from '../support/enums';
import { waitUntilPageLoads } from '../support/waiters';

Given(/^the "(main)" page is opened$/, async function (pageName: string) {
	if (pageName !== 'main') {
	}
	await waitUntilPageLoads();
});

When(
	/^the user presses the "(.*)" key$/,
	async function (buttonName: keyof KeyboardActions) {
		await pressKey(buttonName);
	}
);

When(/^the user visits url "(.*)"$/, async function (url: string) {
	await browser.url(url);
	await waitUntilPageLoads();
});
