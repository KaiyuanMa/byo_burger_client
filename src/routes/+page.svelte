<script>
	import { onMount } from 'svelte';
	import { apiGetIngredients, apiPostBurgers } from '../api';

	import SideBar from '../components/SideBar.svelte';
	import OrderModal from '../components/OrderModal.svelte';
	import BottomBar from '../components/BottomBar.svelte';
	import TopBar from '../components/TopBar.svelte';
	import IngredientCheckbox from '../components/IngredientSelect/IngredientCheckbox.svelte';
	import IngredientRadio from '../components/IngredientSelect/IngredientRadio.svelte';
	let ingredients = {};
	let bag = [];
	let quantity = 1;
	let isBagHidden = true;
	let isModalVisible = false;
	let burger = {};

	function saveBurgerToLocalStorage() {
		localStorage.setItem('burger', JSON.stringify(burger));
	}

	onMount(async () => {
		console.log('mounting');
		await fetchIngredients();
		const storeBurger = localStorage.getItem('burger');
		const storeBag = localStorage.getItem('bag');
		if (!storeBurger) {
			console.log(storeBurger);
			burger = setEmptyBurger(ingredients);
			localStorage.setItem('burger', JSON.stringify(burger));
		} else {
			burger = JSON.parse(storeBurger);
		}
		if (storeBag && JSON.parse(storeBag).length > 0) {
			bag = JSON.parse(storeBag);
		} else {
			localStorage.setItem('bag', JSON.stringify([]));
		}
	});

	function setEmptyBurger(ingredients) {
		return Object.keys(ingredients).reduce((acc, key) => {
			if (key === 'toppings' || key === 'sauces') {
				acc[key] = [];
			} else {
				acc[key] = '';
			}
			return acc;
		}, {});
	}

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

	const handleAddToBag = () => {
		let dummy = bag;
		let id = bag.length + 1;
		if (!burger['cheese']) {
			delete burger.cheese;
		}
		for (let i = 0; i < quantity; i++) {
			dummy.push({ id: `burger-${id}`, ...burger });
			id++;
		}
		bag = dummy;
		ingredients = ingredients;
		isBagHidden = false;
		localStorage.setItem('bag', JSON.stringify(bag));
		burger = setEmptyBurger(ingredients);
		localStorage.setItem('burger', JSON.stringify(burger));
	};

	const handleRemoveFromBag = (id) => {
		let dummy = bag;
		bag = dummy.filter((burger) => burger.id !== id);
		localStorage.setItem('bag', JSON.stringify(bag));
	};

	const handleSubmit = async () => {
		const promises = bag.map(async (burger) => {
			try {
				const response = await apiPostBurgers(burger);
				console.log(response);
			} catch (error) {
				console.log(error);
			}
		});

		await Promise.all(promises);
		isModalVisible = true;
		bag = [];
	};
</script>

<div class="bg-gray-100 pb-20">
	<OrderModal bind:isModalVisible />
	<div class="bg-gray-100">
		<TopBar {bag} bind:isBagHidden />
		{#each Object.entries(ingredients) as ingredientArray (ingredientArray[0])}
			{#if ingredientArray[0] === 'toppings' || ingredientArray[0] === 'sauces'}
				<IngredientCheckbox
					isOptional={ingredientArray[0] === 'bun' ||
					ingredientArray[0] === 'patty'
						? false
						: true}
					{ingredientArray}
					bind:selectedIngredient={burger[ingredientArray[0]]}
					{saveBurgerToLocalStorage}
				/>
			{:else}
				<IngredientRadio
					isOptional={ingredientArray[0] === 'bun' ||
					ingredientArray[0] === 'patty'
						? false
						: true}
					{ingredientArray}
					bind:selectedIngredient={burger[ingredientArray[0]]}
					{saveBurgerToLocalStorage}
				/>
			{/if}
		{/each}
	</div>
	<BottomBar bind:quantity {burger} {handleAddToBag} />
	<SideBar bind:isBagHidden bind:bag {handleRemoveFromBag} {handleSubmit} />
</div>

<style>
</style>
