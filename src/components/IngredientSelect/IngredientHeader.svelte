<script>
	export let ingredientType;
	export let isOptional;
	export let ingredientOptions;
</script>

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
