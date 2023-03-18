<script>
	import { onMount } from 'svelte';
	import { each } from 'svelte/internal';
	import { apiGetIngredients, apiPostBurgers } from '../api';
	import IngredientSelect from './IngredientSelect.svelte';
	let ingredients = {};
	let bag = [
		{
			id: 'burger-1',
			bun: 'whole_wheat',
			cheese: 'american',
			patty: 'black_bean',
			sauces: ['mustard', 'ketchup', 'mayo', 'barbecue'],
			toppings: ['lettuce', 'tomato', 'grilled_onions', 'bacon']
		}
	];
	let quantity = 1;
	let isBagHidden = false;
	let selectedIngredient;
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
		console.log(burger);
		let id = bag.length + 1;
		for (let i = 0; i < quantity; i++) {
			dummy.push({ id: `burger-${id}`, ...burger });
			id++;
		}
		bag = dummy;
		selectedIngredient = null;
		isBagHidden = false;
	};

	const handleRemoveFromBag = (id) => {
		console.log(id);
		let dummy = bag;
		bag = dummy.filter((burger) => burger.id !== id);
		console.log(dummy);
		console.log(bag);
	};

	const handleSubmit = async () => {
		const response = await apiPostBurgers(burger);
		console.log(response);
	};
</script>

<button on:click={() => console.log(bag)}>logBag</button>
<div class="pb-20">
	<header class="flex h-20 items-center justify-center text-4xl font-extrabold text-red-600">
		BYO BURGER
		<button on:click={() => (isBagHidden = !isBagHidden)}
			><i class="fa-sharp fa-solid fa-bag-shopping" /></button
		>
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
				{selectedIngredient}
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
	<div
		class="fixed right-0 top-0 h-[calc(100%-5rem)] w-80 border-l-2 bg-white transition-all duration-300 {isBagHidden
			? 'translate-x-full'
			: ''}"
	>
		<div class="mr-3 flex h-16 justify-end">
			<button
				class="mt-3 text-2xl font-bold hover:rotate-90"
				on:click={() => (isBagHidden = !isBagHidden)}
				><i class="fa-solid fa-xmark-large p-2 transition-all hover:rotate-90" /></button
			>
		</div>
		{#if !bag[0]}
			<p>Your bag is empty</p>
		{:else}
			<div class="flex h-[calc(100%-4rem)] flex-col gap-2 overflow-y-scroll">
				{#each bag as burger, index}
					<div class="mx-3 flex flex-col border-2 p-2">
						<div class="flex items-center justify-between">
							<h1 class="text-lg font-bold text-red-500">
								{burger.id.replaceAll('-', ' ').toUpperCase()}
							</h1>
							<button on:click={() => handleRemoveFromBag(burger.id)}
								><i class="fa-solid fa-trash p-1 transition-all hover:text-red-500" /></button
							>
						</div>

						<div>
							{#each Object.keys(burger) as key}
								{#if !(burger[key] === '' || burger[key].length == 0 || key === 'id')}
									<div class="flex flex-wrap gap-x-1 gap-y-0">
										<p class="font-bold">{key.toUpperCase()}:</p>
										{#if typeof burger[key] === 'string'}
											<span>{burger[key].replaceAll('_', ' ')}</span>
										{:else}
											{#each burger[key] as ingredient, index}
												{#if index === burger[key].length - 1}
													<span>{ingredient.replaceAll('_', ' ')}</span>
												{:else}
													<span>{ingredient.replaceAll('_', ' ')},</span>
												{/if}
											{/each}
										{/if}
									</div>
								{/if}
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
	<button on:click={handleSubmit} disabled={!burger.bun || !burger.patty}>Order</button>
	<button on:click={() => console.log(burger)}>Log burger</button>
</div>

<style>
</style>
