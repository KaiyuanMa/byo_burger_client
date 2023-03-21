<script>
	export let quantity;
	export let burger;
	export let handleAddToBag;
</script>

<div
	class="fixed bottom-0 z-40 flex h-20 w-full items-center justify-around border-t bg-white"
>
	<div class="flex items-center justify-center gap-10 text-lg font-bold">
		QUANTITY <button
			on:click={() => quantity--}
			disabled={quantity <= 1}
			data-test={'decrement-quantity-btn'}
			class="flex h-10 w-10 items-center  justify-center rounded-full 
				border-2 border-red-500 bg-white font-extrabold text-red-500 transition-all 
				hover:bg-red-500 hover:text-white disabled:pointer-events-none disabled:border-gray-400 disabled:text-gray-400"
			><i class="fa-solid fa-minus" /></button
		>
		<span class="w-4 text-center">{quantity}</span>
		<button
			on:click={() => quantity++}
			data-test={'increment-quantity-btn'}
			class="flex h-10 w-10 items-center  justify-center rounded-full 
				border-2 border-red-500 bg-white text-red-500 transition-all hover:bg-red-500 hover:text-white"
			><i class="fa-solid fa-plus" /></button
		>
	</div>
	<button
		on:click={handleAddToBag}
		data-test={'add-to-bag-btn'}
		class="border-2 border-red-600 bg-red-600 p-2 px-9 
			text-base font-bold text-white transition-all duration-200 hover:bg-white hover:text-red-600 disabled:pointer-events-none 
			disabled:border-gray-300 disabled:bg-gray-300"
		disabled={!burger.bun || !burger.patty}>ADD TO BAG</button
	>
</div>
