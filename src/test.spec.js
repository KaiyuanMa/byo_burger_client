import { test, expect } from '@playwright/test';

async function testButtonGroupInteraction(page, buttonGroupElement) {
	const initialBurger = await page.evaluate(() => window.burger);
	const button = await buttonGroupElement.$(
		'input[type="radio"], input[type="checkbox"]'
	);
	await button.click();
	const newBurger = await page.evaluate(() => window.burger);

	if (initialBurger === newBurger) {
		throw new Error(
			`Clicking on a button in the group did not change the variable value.`
		);
	}
}

test('button group interaction', async ({ page }) => {
	await page.goto('http://localhost:3000/');
	const buttonGroupSelectors = await page.$$('[data-testid="button-group"]');

	for (const buttonGroupSelector of buttonGroupSelectors) {
		await testButtonGroupInteraction(page, buttonGroupSelector);
	}
});
