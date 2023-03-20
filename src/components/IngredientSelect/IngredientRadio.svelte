<script>
	import IngredientHeader from './IngredientHeader.svelte';
	export let isOptional;
	export let ingredientArray;
	export let selectedIngredient = [];
	export let saveBurgerToLocalStorage;
	$: ingredientType = ingredientArray[0];
	$: ingredientOptions = ingredientArray[1];
	let ingredientType = 'radio';

	function toggleRadioButton(name) {
		if (selectedIngredient === name) {
			selectedIngredient = null;
		} else {
			selectedIngredient = name;
		}
	}
</script>

<div class="mx-auto flex w-200 flex-col justify-start pt-10">
	<IngredientHeader {ingredientType} {isOptional} {ingredientOptions} />
	<div class="align-center flex w-full flex-wrap justify-start">
		{#each ingredientOptions as name, index}
			<div class="h-40 w-1/4 p-2">
				<label
					class="align-center flex h-full w-full justify-center"
					for={ingredientType + index}
					><input
						id={ingredientType + index}
						class="h-0 w-0"
						type="radio"
						bind:group={selectedIngredient}
						on:click={() => toggleRadioButton(name)}
						on:change={() => saveBurgerToLocalStorage(selectedIngredient)}
						value={name}
					/>
					<div
						class="relative flex h-full w-full cursor-pointer items-center justify-center border-2 bg-white text-sm font-extrabold 
              text-red-500 shadow-xl transition-all duration-75 {selectedIngredient ===
						name
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
	</div>
</div>
