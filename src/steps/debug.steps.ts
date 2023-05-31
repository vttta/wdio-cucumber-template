import { When } from '@wdio/cucumber-framework';
import { waitUntilPageLoads } from '../support/waiters';

When(/^DEBUG$/, async function () {
	await browser.debug();
});

When(/^PAUSE (\d+)$/, async function (timeout: number) {
	await browser.pause(timeout);
});

When(/^REFRESH$/, async function () {
	await browser.refresh();
	await waitUntilPageLoads();
});

When(/^LOG "(.*)"$/, async function (message: string) {
	console.log(message);
});

When(/^TRACE$/, async function () {
	console.trace();
});

When(/^(?:DO NOTHING|the user does nothing)$/, async function () {
	return;
});
