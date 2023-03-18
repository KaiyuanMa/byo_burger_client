<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let inputType;
	export let ingredientArray;
	export let isOptional;
	export let selectedIngredient;

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

<div class="mx-auto flex w-200 flex-col justify-start pt-10">
	<div class="flex justify-between px-2">
		<h2 class="text-xl font-extrabold">
			SELECT {ingredientType.toUpperCase()}
		</h2>
		<div
			class="{isOptional
				? 'bg-gray-400'
				: 'bg-red-500'} flex items-center justify-center p-1 text-xs font-bold text-white"
		>
			{isOptional ? 'OPTIONAL' : 'REQUIRED'}
		</div>
	</div>
	<p class="px-2 text-xs">
		Select up to : {ingredientType === 'bun' ||
		ingredientType === 'patty' ||
		ingredientType === 'cheese'
			? '1'
			: ingredientOptions.length}
	</p>
	<div class="align-center flex w-full flex-wrap justify-start">
		{#if inputType === 'radio'}
			{#each ingredientOptions as { id, name }}
				<div class="h-40 w-1/4 p-2">
					<label class="align-center flex h-full w-full justify-center" for={ingredientType + id}
						><input
							id={ingredientType + id}
							class="h-0 w-0"
							type="radio"
							bind:group={selectedIngredient}
							on:click={() => toggleRadioButton(name)}
							value={name}
						/>
						<div
							class="relative flex h-full w-full cursor-pointer items-center justify-center border-2 bg-white text-sm font-extrabold 
              text-red-500 shadow-xl transition-all duration-75 {selectedIngredient === name
								? 'border-red-500 outline outline-red-500'
								: 'border-gray-400'}"
						>
							{name.replaceAll('_', ' ').toUpperCase()}
							<i
								class="fa-solid fa-circle-check absolute top-2 right-2 text-xl transition-all duration-200 {selectedIngredient ===
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
				<div class="h-40 w-1/4 p-2">
					<label class="align-center flex h-full w-full justify-center"
						><input
							type="checkbox"
							class="h-0 w-0"
							bind:checked={isChecked}
							bind:group={selectedIngredient}
							value={name}
						/>
						<div
							class="relative flex h-full w-full cursor-pointer items-center justify-center border-2 bg-white text-sm font-extrabold text-red-500 shadow-xl transition-all duration-75 {isChecked
								? 'border-red-500 outline outline-red-500'
								: 'border-gray-400'}"
						>
							{name.replaceAll('_', ' ').toUpperCase()}
							<i
								class="fa-solid fa-circle-check absolute top-2 right-2 text-xl transition-all duration-200 {isChecked
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
