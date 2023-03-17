<script>
	import { onMount } from 'svelte';
	import { apiGetIngredients, apiPostBurgers } from '../api';
	import IngredientSelect from './IngredientSelect.svelte';
	let ingredients = {};
	let bag = [];
	let quantity = 1;
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

<div class="pb-20">
	<header class="flex h-20 items-center justify-center text-4xl font-extrabold text-red-600">
		BYO BURGER
	</header>
	<h1
		class="flex h-72 h-20 items-center justify-center bg-red-600 text-6xl font-extrabold text-white"
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
	<div class="fixed bottom-0 flex h-20 w-full items-center justify-around border-t bg-white">
		<div class="flex items-center justify-center gap-10 text-lg font-bold">
			QUANTITY <button
				on:click={() => quantity--}
				disabled={quantity <= 1}
				class="flex h-10 w-10 items-center  justify-center rounded-full 
				border-2 border-red-500 bg-white font-extrabold text-red-500 transition-all 
				hover:bg-red-500 hover:text-white disabled:pointer-events-none disabled:border-gray-400 disabled:text-gray-400"
				><i class="fa-solid fa-minus" /></button
			>
			<span class="w-4 text-center">{quantity}</span>
			<button
				on:click={() => quantity++}
				class="flex h-10 w-10 items-center  justify-center rounded-full 
				border-2 border-red-500 bg-white text-red-500 transition-all hover:bg-red-500 hover:text-white"
				><i class="fa-solid fa-plus" /></button
			>
		</div>
		<button
			class="border-2 border-red-600 bg-red-600 p-2 px-9 
			text-base font-bold text-white transition-all hover:bg-white hover:text-red-600">ADD TO BAG</button
		>
	</div>
	<button on:click={handelSubmit} disabled={!burger.bun || !burger.patty}>Order</button>
	<button on:click={() => console.log(burger)}>Log burger</button>
</div>

<style>
</style>
