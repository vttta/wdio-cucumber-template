export class BasePage {
	get submitButton() {
		return $('[data-testid*="submit-button"]');
	}
}
