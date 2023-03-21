<script>
	export let burger;
	export let handleRemoveFromBag;
</script>

<div
	class="mx-3 flex flex-col border-2 p-2"
	data-test={burger.id + '-side-bar-item'}
>
	<div class="flex items-center justify-between">
		<h1 class="text-lg font-bold text-red-500">
			{burger.id.replaceAll('-', ' ').toUpperCase()}
		</h1>
		<button
			on:click={() => handleRemoveFromBag(burger.id)}
			data-test={burger.id + '-remove-burger-btn'}
			><i
				class="fa-solid fa-trash p-1 transition-all hover:text-red-500"
			/></button
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
