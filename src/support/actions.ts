import { KeyboardActions } from './enums';
import { Directions } from './types';

export async function clickWithScroll(
	elem: WebdriverIO.Element
): Promise<void> {
	await elem.scrollIntoView();
	await elem.click();
}

export async function clickWithJS(elem: WebdriverIO.Element): Promise<void> {
	await browser.execute((el) => {
		el.click();
	}, elem);
}

export async function clickWithEvent(elem): Promise<void> {
	await browser.execute((el) => {
		el.dispatchEvent(
			new MouseEvent('click', { bubbles: true, cancelable: true })
		);
	}, elem);
}

export async function waitAndClick(
	elem: WebdriverIO.Element,
	timeout = 10000
): Promise<void> {
	await elem.waitForDisplayed({ timeout });
	await elem.waitForClickable();
	await elem.click();
}

export async function pressKey(key: keyof KeyboardActions): Promise<void> {
	await browser.keys(KeyboardActions[key]);
}

function getSwipeOffset(direction: Directions): { x: number; y: number } {
	let [xOffset, yOffset] = [0, 0];
	const offsetSize = 150;
	switch (direction) {
		case 'left':
			xOffset = -offsetSize;
			break;
		case 'right':
			xOffset = offsetSize;
			break;
		case 'up':
			yOffset = offsetSize;
			break;
		case 'down':
			yOffset = -offsetSize;
			break;
	}
	return { x: xOffset, y: yOffset };
}

export async function swipeByDragAndDrop(
	direction: Directions,
	element: WebdriverIO.Element
): Promise<void> {
	const offset = getSwipeOffset(direction);
	await element.dragAndDrop({
		x: offset.x,
		y: offset.y,
	});
}

export async function swipeByAction(direction: Directions): Promise<void> {
	const offset = getSwipeOffset(direction);
	await browser.performActions([
		{
			type: 'pointer',
			id: 'finger1',
			parameters: { pointerType: 'touch' },
			actions: [
				{
					type: 'pointerMove',
					duration: 0,
					x: 100,
					y: 200,
				},
				{ type: 'pointerDown', button: 0 },
				{
					type: 'pointerMove',
					duration: 0,
					origin: 'pointer',
					x: offset.x,
					y: offset.y,
				},
				{ type: 'pointerUp', button: 0 },
			],
		},
	]);
}
