import { getFirstNumberFromString } from './utils';

export async function findByInnerText(
	innerText: string
): Promise<WebdriverIO.Element> {
	return await $(`//*[contains(text(), "${innerText}")]`);
}

export async function elemDisplayedWithin(
	elem: WebdriverIO.Element,
	timeout = 3000
): Promise<boolean> {
	try {
		await elem.waitForDisplayed({ timeout });
		return true;
	} catch (err) {
		return false;
	}
}

export function textIncludesNoText(
	firstText: string,
	secondText: string,
	ignoreCase = true
): boolean {
	if (ignoreCase) {
		firstText = firstText.toLowerCase();
		secondText = secondText.toLowerCase();
	}
	return !firstText.includes(secondText);
}

export function createArrayOfRepeatedElements<T>(elem: T, count: number): T[] {
	const data = [];
	for (let i = 0; i < count; i++) data.push(elem);
	return data;
}

export async function clearTextByBackspace(
	elem: WebdriverIO.Element
): Promise<void> {
	const count: number = (await elem.getValue()).length;
	await elem.waitForClickable();
	await elem.click();
	for (let i = 0; i < count; i++) {
		await browser.keys('ArrowRight');
		await browser.keys('Backspace');
	}
}

export async function typeText(
	input: WebdriverIO.Element,
	value: string
): Promise<void> {
	await input.click();
	const arrValue = [...value];
	for (let i = 0; i < arrValue.length; i++) {
		await browser.keys(arrValue[i]);
	}
}

export async function getNumberFromElemValue(
	element: WebdriverIO.Element
): Promise<number> {
	const value = await element.getText();
	return getFirstNumberFromString(value);
}

export async function getSumOfElemArrayValues(
	elemArray: ReturnType<WebdriverIO.Browser['$$']>
): Promise<number> {
	let sum = 0;
	for (const element of await elemArray) {
		const number = await getNumberFromElemValue(element);
		sum += number;
	}
	return sum;
}
