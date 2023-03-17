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
		const { data } = await apiGetIngredients();
		function isRequired(key) {
			return ['bun', 'patty'].includes(key);
		}
		const sortedKeys = Object.keys(data).sort((a, b) => {
			if (isRequired(a) && !isRequired(b)) {
				return -1;
			} else if (!isRequired(a) && isRequired(b)) {
				return 1;
			} else {
				return a.localeCompare(b);
			}
		});
		for (const key of sortedKeys) {
			ingredients[key] = data[key];
		}
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

<header class="flex justify-center items-center h-20 text-red-600 text-4xl font-extrabold">
	BYO BURGER
</header>
<h1
	class="flex justify-center items-center h-72 bg-red-600 text-white text-6xl font-extrabold h-20"
>
	BUILD YOUR OWN
</h1>
<div class="bg-gray-100">
	{#each Object.entries(ingredients) as ingredientArray (ingredientArray[0])}
		<IngredientSelect
			inputType={ingredientArray[0] === 'toppings' || ingredientArray[0] === 'sauces'
				? 'checkbox'
				: 'radio'}
			isOptional={ingredientArray[0] === 'bun' || ingredientArray[0] === 'patty' ? false : true}
			{ingredientArray}
			on:selectionChanged={handelSelection}
		/>
	{/each}
</div>
<button on:click={handelSubmit} disabled={!burger.bun || !burger.patty}>Order</button>
<button on:click={() => console.log(burger)}>Log burger</button>

<style>
	.ingredient-options {
		display: flex;
		flex-direction: column;
	}
</style>
