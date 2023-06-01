import { Given, Then, When } from '@wdio/cucumber-framework';
import { pressKey } from '../support/actions';
import { KeyboardActions } from '../support/enums';
import { waitUntilPageLoads } from '../support/waiters';
import { ChainablePromiseElement } from 'webdriverio/build/types';
import { BasePage } from '../pages/base.page';

// make sure basePage is only used here, in common steps
const basePage = new BasePage();

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

Then(
	/^the "(.*)" page is (not )?opened$/,
	async function (pageName: string, notOpened: string | null) {
		const selectors: Record<string, string | undefined> = {
			shop: '.inventory_list',
			cart: undefined,
		};

		if (!selectors[pageName]) {
			throw new Error(
				`The selector for the "${pageName}" page is not defined!`
			);
		}

		await waitUntilPageLoads();

		const pageElem: ChainablePromiseElement<WebdriverIO.Element> = $(
			selectors[pageName]!
		);

		notOpened
			? await expect(pageElem).not.toBeDisplayed()
			: await expect(pageElem).toBeDisplayed();
	}
);

Then(/^an error is displayed$/, async function () {
	await expect(basePage.errorMessage).toBeDisplayed();
});
