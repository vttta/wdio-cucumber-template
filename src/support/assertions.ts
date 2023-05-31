export async function expectElemArrayIsGreaterOrEqual(
	elementArray: ReturnType<WebdriverIO.Browser['$$']>,
	minSize = 1
): Promise<void> {
	expect(await elementArray.length).toBeGreaterThanOrEqual(minSize);
}

export async function expectArrayHasNoDuplicates<T>(arr: T[]): Promise<void> {
	expect(new Set(arr).size).toEqual(arr.length);
}

export async function expectElementToHaveText(
	elem: WebdriverIO.Element,
	minimunLength = 5
): Promise<void> {
	expect((await elem.getText()).length).toBeGreaterThanOrEqual(minimunLength);
}
