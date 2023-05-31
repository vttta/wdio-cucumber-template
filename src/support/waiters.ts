export async function waitForList(
	listRefresher: () => ReturnType<WebdriverIO.Browser['$$']>,
	minSize = 1
): Promise<void> {
	await browser.waitUntil(
		async () => {
			const elems = await listRefresher();
			if (elems.length >= minSize) {
				return true;
			}
			return false;
		},
		{
			timeoutMsg: 'Never found enough list elements',
		}
	);

	await listRefresher().forEach((elem) => elem.waitForClickable());
}

export async function waitUntilPageLoads(timeout = 60_000): Promise<void> {
	await browser.waitUntil(
		() => browser.execute(() => document.readyState === 'complete'),
		{
			timeout,
			timeoutMsg: `The page didn't load after ${timeout}ms`,
		}
	);
}

export async function waitUntilTextChanges(
	textField: WebdriverIO.Element,
	textToCompare: string,
	{ shouldMatch = true, timeout = 5000 } = {}
): Promise<void> {
	await textField.waitUntil(
		async () => {
			const foundText = await textField.getText();
			return shouldMatch
				? foundText === textToCompare
				: foundText !== textToCompare;
		},
		{ timeout }
	);
}
