import { BasePage } from './base.page';

class ShopPage extends BasePage {
	get openCartButton() {
		return $('.shopping_cart_link');
	}

	get itemCards() {
		return $$('.inventory_item');
	}

	itemName = '.inventory_item_name';
	addToCartButton = 'button[name^="add-to-cart"]';
	removeButton = 'button[name^="remove"]';

	async getItemName(itemIndex: number): Promise<string> {
		return await (await this.itemCards[itemIndex].$(this.itemName)).getText();
	}

	async addToCart(itemIndex: number): Promise<void> {
		await this.itemCards[itemIndex].$(this.addToCartButton).click();
	}

	async removeFromCart(itemIndex: number): Promise<void> {
		await this.itemCards[itemIndex].$(this.removeButton).click();
	}
}

export default new ShopPage();
