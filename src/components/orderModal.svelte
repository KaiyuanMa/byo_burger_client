<script>
	export let isModalVisible = false;
	function close() {
		isModalVisible = false;
	}
</script>

{#if isModalVisible}
	<div
		class="fixed z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
		on:click={close}
	>
		<div
			class="relative flex h-20 w-1/3 items-center justify-center rounded-md border-2  bg-white"
			on:click={(e) => e.stopPropagation()}
		>
			<p class="text-xl font-bold text-red-500">
				<i class="fa-solid fa-check" /> Order Successful!
			</p>
			<button
				class="bg absolute top-2 right-4 text-lg transition-all hover:text-red-500"
				on:click={close}><i class="fa-regular fa-circle-xmark" /></button
			>
		</div>
	</div>
{/if}
