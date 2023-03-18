<script>
	import { onMount, afterUpdate } from 'svelte';
	import { apiGetIngredients, apiPostBurgers } from '../api';
	import IngredientSelect from '../components/IngredientSelect.svelte';
	import SideBar from '../components/SideBar.svelte';
	let ingredients = {};
	let reset = false;
	let bag = [];
	let quantity = 1;
	let isBagHidden = true;
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
		ingredients = {};
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

	const handleSelection = (event) => {
		const { type, selection } = event.detail;
		burger[type] = selection;
	};

	const handleAddToBag = () => {
		let dummy = bag;
		let id = bag.length + 1;
		for (let i = 0; i < quantity; i++) {
			dummy.push({ id: `burger-${id}`, ...burger });
			id++;
		}
		bag = dummy;
		ingredients = ingredients;
		isBagHidden = false;
		reset = true;
	};
	afterUpdate(() => {
		reset = false;
	});

	const handleRemoveFromBag = (id) => {
		let dummy = bag;
		bag = dummy.filter((burger) => burger.id !== id);
	};

	const handleSubmit = async () => {
		const promises = bag.map(async (burger) => {
			try {
				const response = await apiPostBurgers(burger);
			} catch (error) {
				console.error(`POST request for item ${item} failed:`, error.message);
			}
		});

		await Promise.all(promises);
		console.log('All POST requests have been completed.');
		bag = [];
	};
</script>

<div class="bg-gray-100 pb-20">
	<header
		class="relative flex h-20 items-center justify-center bg-white text-4xl font-extrabold text-red-600"
	>
		BYO BURGER
		<span class="absolute right-3 top-2 text-lg">{bag.length >= 1 ? bag.length : ''}</span>
		<button class="absolute right-5 my-auto" on:click={() => (isBagHidden = !isBagHidden)}
			><i class="fa-sharp fa-regular fa-bag-shopping" />
		</button>
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
				{reset}
				on:selectionChanged={handleSelection}
			/>
		{/each}
	</div>
	<div class="fixed bottom-0 z-50 flex h-20 w-full items-center justify-around border-t bg-white">
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
			on:click={handleAddToBag}
			class="border-2 border-red-600 bg-red-600 p-2 px-9 
			text-base font-bold text-white transition-all duration-200 hover:bg-white hover:text-red-600 disabled:pointer-events-none 
			disabled:border-gray-300 disabled:bg-gray-300 disabled:bg-gray-300"
			disabled={!burger.bun || !burger.patty}>ADD TO BAG</button
		>
	</div>
	<SideBar bind:isBagHidden bind:bag {handleRemoveFromBag} {handleSubmit} />
</div>

<style>
</style>
