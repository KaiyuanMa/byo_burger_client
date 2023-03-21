import { test, expect } from '@playwright/test';

const addBurgerToBag = async (page) => {
	await page.locator('[data-test="bun-sesame"]').click();
	await page.locator('[data-test="patty-single"]').click();
	await page.locator('[data-test="cheese-american"]').click();
	await page.locator('[data-test="sauces-mustard"]').click();
	await page.locator('[data-test="toppings-lettuce"]').click();
	await page.locator('[data-test="increment-quantity-btn"]').click();
	await page.locator('[data-test="add-to-bag-btn"]').click();
};

const addBigBurgerToBag = async (page) => {
	await page.locator('[data-test="bun-sesame"]').click();
	await page.locator('[data-test="patty-single"]').click();
	await page.locator('[data-test="cheese-american"]').click();
	await page.locator('[data-test="sauces-mustard"]').click();
	await page.locator('[data-test="sauces-ketchup"]').click();
	await page.locator('[data-test="sauces-mayo"]').click();
	await page.locator('[data-test="sauces-barbecue"]').click();
	await page.locator('[data-test="toppings-lettuce"]').click();
	await page.locator('[data-test="toppings-tomato"]').click();
	await page.locator('[data-test="toppings-grilled_onions"]').click();
	await page.locator('[data-test="toppings-bacon"]').click();
	await page.locator('[data-test="add-to-bag-btn"]').click();
};

test('add burger to bag', async ({ page }) => {
	await page.goto('http://localhost:3000/');
	await addBigBurgerToBag(page);
	await expect(
		await page.locator('[data-test="burger-1-side-bar-item"]')
	).toHaveText(
		'BURGER 1  BUN: sesame PATTY: single CHEESE: american SAUCES: mustard,ketchup,mayo,barbecue TOPPINGS: lettuce,tomato,grilled onions,bacon'
	);
});

test('add burger to bag with quantity 2', async ({ page }) => {
	await page.goto('http://localhost:3000/');
	await addBurgerToBag(page);
	await expect(
		await page.locator('[data-test="burger-1-side-bar-item"]')
	).toHaveText(
		'BURGER 1 BUN: sesame PATTY: single CHEESE: american SAUCES: mustard TOPPINGS: lettuce'
	);
	await expect(
		await page.locator('[data-test="burger-2-side-bar-item"]')
	).toHaveText(
		'BURGER 2 BUN: sesame PATTY: single CHEESE: american SAUCES: mustard TOPPINGS: lettuce'
	);
});

test('delete burger from bag', async ({ page }) => {
	await page.goto('http://localhost:3000/');
	await addBurgerToBag(page);
	await page.locator('[data-test="burger-1-remove-burger-btn"]').click();
	await expect(page.locator('[data-test="empty-bag"]').first()).not.toBeNull();
});

test('order modal popup and close', async ({ page }) => {
	await page.goto('http://localhost:3000/');
	await addBurgerToBag(page);
	await page.locator('[data-test="order-btn"]').click();
	await expect(
		page.locator('[data-test="order-modal"]').first()
	).not.toBeNull();
	await page.locator('[data-test="order-modal-close-btn"]').click();
	const elementCount = await page.locator('[data-test="my-element"]').count();
	await expect(elementCount).toBe(0);
});
