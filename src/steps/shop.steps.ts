import { Given, When, Then } from '@wdio/cucumber-framework';
import shopPage from '../pages/shop.page';
import { expectArrayToIncludeText } from '../support/assertions';
import cartPage from '../pages/cart.page';

When(
	/^the user adds an item with index (\d+) to the cart$/,
	async function (this: { addedItem: string }, index: number) {
		this.addedItem = await shopPage.getItemName(index);
		await shopPage.addToCart(index);
	}
);

When(/^the user opens the cart$/, async function () {
	await shopPage.openCartButton.click();
});

Then(
	/^the cart contains the added item$/,
	async function (this: { addedItem: string }) {
		await expectArrayToIncludeText(() => cartPage.itemNames, this.addedItem);
	}
);
