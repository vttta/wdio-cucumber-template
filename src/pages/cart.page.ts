import { BasePage } from './base.page';

class CartPage extends BasePage {
	public get itemNames() {
		return $$('.inventory_item_name');
	}
}

export default new CartPage();
