export class BasePage {
	get errorMessage() {
		return $('[data-test="error"]');
	}
}
