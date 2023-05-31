import * as moment from 'moment';

export interface DatetimeOffset {
	offsetDate?: number;
	offsetTime?: number;
}

export function getDateWithOffset({
	offsetDate = 0,
	offsetTime = 0,
}: DatetimeOffset = {}): string {
	return `${moment()
		.add(offsetDate, 'd')
		.add(offsetTime, 'h')
		.format('MM/DD/YYYY HH:mm')}`;
}

export async function getRelativeUrl() {
	const fullUrl = new URL(await browser.getUrl());
	return fullUrl.href.replace(fullUrl.origin, '');
}

export async function setLocalStorageItem(key: string, value: string) {
	await browser.execute(
		function (k, v) {
			this.localStorage.setItem(k, v);
		},
		key,
		value
	);
}

export async function getLocalStorageItem(key: string) {
	await browser.execute(function (k) {
		this.localStorage.getItem(k);
	}, key);
}

export async function removeLocalStorageItem(key: string) {
	await browser.execute(function (k) {
		this.localStorage.removeItem(k);
	}, key);
}

export function camelCase(str: string) {
	return str
		.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
			return index === 0 ? word.toLowerCase() : word.toUpperCase();
		})
		.replace(/\s+/g, '');
}

export function getFirstNumberFromString(text: string): number {
	const match = text.match(/\d([.,0-9]+)?/);
	if (match) return parseFloat(match[0]);
	throw new Error(
		`Number not found in the provided string "${text}". The regex match was: ${match}`
	);
}

export const normaliseFloat = (float: number) => parseFloat(float.toFixed(2));
