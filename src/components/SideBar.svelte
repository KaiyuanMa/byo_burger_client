<script>
	import SideBarItem from './SideBarItem.svelte';
	export let isBagHidden;
	export let bag;
	export let handleRemoveFromBag;
	export let handleSubmit;
</script>

<div
	class="fixed right-0 top-0 h-[calc(100%-5rem)] w-80 border-l-2 bg-white transition-all duration-300 {isBagHidden
		? 'translate-x-full'
		: ''}"
>
	<div class="mr-3 flex h-16 justify-end">
		<button
			class="mt-3 rounded-full text-2xl font-bold hover:rotate-90"
			data-test={'toggle-bag-btn'}
			on:click={() => (isBagHidden = !isBagHidden)}
			><i
				class="fa-solid fa-xmark-large p-2 transition-all hover:rotate-90"
			/></button
		>
	</div>
	{#if !bag[0]}
		<div
			class="flex h-full w-full items-center justify-center"
			data-test="empty-bag"
		>
			<p class="text-2xl font-extrabold">YOUR BAG IS EMPTY</p>
		</div>
	{:else}
		<div
			class="flex h-[calc(100%-9rem)] flex-col gap-2 overflow-y-auto border-b-2"
		>
			{#each bag as burger}
				<SideBarItem {burger} {handleRemoveFromBag} />
			{/each}
		</div>
		<div class="flex w-full items-center justify-center py-4">
			<button
				class=" border-2 border-red-600 bg-red-600 p-2 px-14 
			text-base font-bold text-white transition-all duration-200 
			hover:bg-white hover:text-red-600"
				data-test={'order-btn'}
				on:click={handleSubmit}>Order</button
			>
		</div>
	{/if}
</div>
