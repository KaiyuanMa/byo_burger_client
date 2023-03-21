<script>
	export let bag;
	export let isBagHidden;
</script>

<header
	class="relative flex h-20 items-center justify-center bg-white text-4xl font-extrabold text-red-600"
>
	BYO BURGER
	<span class="absolute right-3 top-2 text-lg"
		>{bag.length >= 1 ? bag.length : ''}</span
	>
	<button
		class="absolute right-5 my-auto"
		on:click={() => (isBagHidden = !isBagHidden)}
		data-test={'toggle-bag-btn'}
		><i class="fa-sharp fa-regular fa-bag-shopping" />
	</button>
</header>
<h1
	class="flex h-72 items-center justify-center bg-red-600 text-6xl font-extrabold text-white"
>
	BUILD YOUR OWN
</h1>
