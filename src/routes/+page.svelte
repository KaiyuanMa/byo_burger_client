<script>
	import { onMount } from 'svelte';
	import { apiGetIngredients, apiPostBurgers } from '../api';
	import IngredientSelect from './IngredientSelect.svelte';
	let ingredients = {};
	//Copy all keys to burger for later verification before submit
	$: burger = Object.keys(ingredients).reduce((acc, key) => {
		if (key === 'toppings' || key === 'sauces') {
			acc[key] = [];
		} else {
			acc[key] = '';
		}
		return acc;
	}, {});

	onMount(async () => {
		await fetchIngredients();
	});

	const fetchIngredients = async () => {
		const response = await apiGetIngredients();
		ingredients = response.data;
		console.log(response.data);
	};

	const handelSelection = (event) => {
		const { type, selection } = event.detail;
		burger[type] = selection;
	};

	const handelSubmit = async () => {
		const response = await apiPostBurgers(burger);
		console.log(response);
	};
</script>

<div class="ingredient-options">
	{#each Object.entries(ingredients) as ingredientArray (ingredientArray[0])}
		<IngredientSelect
			inputType={ingredientArray[0] === 'toppings' || ingredientArray[0] === 'sauces'
				? 'checkbox'
				: 'radio'}
			isOptional={ingredientArray[0] === 'bun' || ingredientArray[0] === 'patty' ? 'false' : 'true'}
			{ingredientArray}
			on:selectionChanged={handelSelection}
		/>
	{/each}
</div>
<button on:click={handelSubmit} disabled={burger.bun === '' || burger.patty === ''}>Order</button>

<style>
	.ingredient-options {
		display: flex;
		flex-direction: column;
	}
</style>
