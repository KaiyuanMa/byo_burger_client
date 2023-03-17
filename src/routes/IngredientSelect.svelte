<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let inputType;
	export let ingredientArray;
	export let isOptional;
	let selectedIngredient;

	$: ingredientType = ingredientArray[0];
	$: ingredientOptions = ingredientArray[1];
	$: dispatch('selectionChanged', {
		type: ingredientType,
		selection: selectedIngredient
	});
</script>

<div class="text-3xl font-bold underline">
	Type: {ingredientType}
	{#if inputType === 'radio'}
		{#each ingredientOptions as option (option)}
			<label class="text-green"
				><input type="radio" bind:group={selectedIngredient} value={option} />{option.replaceAll(
					'_',
					' '
				)}</label
			>
		{/each}
		<!-- Check if allow multiple input  -->
	{:else if inputType === 'checkbox'}
		{#each ingredientOptions as option (option)}
			<label
				><input type="checkbox" bind:group={selectedIngredient} value={option} />{option.replaceAll(
					'_',
					' '
				)}</label
			>
		{/each}
	{/if}
	selected: {selectedIngredient}
</div>

<style>
</style>
