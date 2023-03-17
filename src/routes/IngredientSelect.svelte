<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let inputType;
	export let ingredientArray;
	export let isOptional;
	let selectedIngredient;

	$: ingredientType = ingredientArray[0];

	let ingredientOptions = createIngredientOptions(ingredientArray[1]);

	function createIngredientOptions(ingredients) {
		return ingredients.map((name, index) => ({
			id: index + 1,
			isChecked: false,
			name
		}));
	}

	function toggleRadioButton(name) {
		if (selectedIngredient === name) {
			selectedIngredient = null;
		} else {
			selectedIngredient = name;
		}
	}

	$: dispatch('selectionChanged', {
		type: ingredientType,
		selection: selectedIngredient
	});
</script>

<div class="flex justify-start mx-auto flex-col w-200 mt-10">
	<div class="flex justify-between px-2">
		<h2 class="text-xl font-extrabold">SELECT {ingredientType.toUpperCase()}</h2>
		<div
			class="{isOptional
				? 'bg-gray-400'
				: 'bg-red-500'} p-1 text-xs font-bold text-white flex justify-center items-center"
		>
			{isOptional ? 'OPTIONAL' : 'REQUIRED'}
		</div>
	</div>
	<p class="px-2 text-xs">
		Select up to :{ingredientType === 'bun' || ingredientType === 'patty'
			? '1'
			: ingredientOptions.length}
	</p>
	<div class="flex justify-start align-center flex-wrap w-full">
		{#if inputType === 'radio'}
			{#each ingredientOptions as { id, name }}
				<div class="w-1/4 h-40 p-2">
					<label class="flex justify-center align-center w-full h-full" for={ingredientType + id}
						><input
							id={ingredientType + id}
							class="h-0 w-0"
							type="radio"
							bind:group={selectedIngredient}
							on:click={() => toggleRadioButton(name)}
							value={name}
						/>
						<div
							class="relative flex justify-center items-center transition-all duration-75 text-red-500 text-sm font-extrabold border-2 h-full w-full {selectedIngredient ===
							name
								? 'border-red-500 outline outline-red-500'
								: 'border-gray-400'}"
						>
							{name.replaceAll('_', ' ').toUpperCase()}
							<i
								class="transition-all duration-200 fa-solid fa-circle-check absolute top-2 right-2 text-xl {selectedIngredient ===
								name
									? 'opacity-100'
									: 'opacity-0'}"
							/>
						</div></label
					>
				</div>
			{/each}
			<!-- Check if allow multiple input  -->
		{:else if inputType === 'checkbox'}
			{#each ingredientOptions as { id, isChecked, name }}
				<div class="w-1/4 h-40 p-2">
					<label class="flex justify-center align-center w-full h-full"
						><input
							type="checkbox"
							class="h-0 w-0"
							bind:checked={isChecked}
							bind:group={selectedIngredient}
							value={name}
						/>
						<div
							class="relative flex justify-center items-center transition-all duration-75 text-red-500 text-sm font-extrabold border-2 h-full w-full {isChecked
								? 'border-red-500 outline outline-red-500'
								: 'border-gray-400'}"
						>
							{name.replaceAll('_', ' ').toUpperCase()}
							<i
								class="transition-all duration-200 fa-solid fa-circle-check absolute top-2 right-2 text-xl {isChecked
									? 'opacity-100'
									: 'opacity-0'}"
							/>
						</div>
					</label>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
</style>
