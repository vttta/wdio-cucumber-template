export async function expectElemArrayIsGreaterOrEqual(
	elementArray: ReturnType<WebdriverIO.Browser['$$']>,
	minSize = 1
): Promise<void> {
	expect(await elementArray.length).toBeGreaterThanOrEqual(minSize);
}

export async function expectArrayHasNoDuplicates<T>(arr: T[]): Promise<void> {
	await expect(new Set(arr).size).toEqual(arr.length);
}

export async function expectElementToHaveText(
	elem: WebdriverIO.Element,
	minimunLength = 5
): Promise<void> {
	expect((await elem.getText()).length).toBeGreaterThanOrEqual(minimunLength);
}

export async function expectArrayElementsToHaveCommonText(
	listRefresher: () => ReturnType<WebdriverIO.Browser['$$']>,
	text: string,
	ignoreCase = true
): Promise<void> {
	await listRefresher().forEach(
		async (elem) =>
			await expect(elem).toHaveTextContaining(text, { ignoreCase })
	);
}

export async function expectArrayToIncludeText(
	listRefresher: () => ReturnType<WebdriverIO.Browser['$$']>,
	text: string,
	ignoreCase = false
): Promise<void> {
	const containsText = await listRefresher().some(async (elem) => {
		const elemText = await elem.getText();
		return ignoreCase
			? elemText.toLowerCase().includes(text.toLowerCase())
			: elemText.includes(text);
	});
	expect(containsText).toBe(true);
}
