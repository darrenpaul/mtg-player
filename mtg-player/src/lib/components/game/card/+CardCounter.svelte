<script lang="ts">
	export let counters;

	let countersArray = [];

	$: {
		if (counters) {
			const entries = Object.entries(counters);
			countersArray = entries.map(([key, value]) => {
				return `${key}: ${value}`;
			});
		}
	}
</script>

<div class="counters">
	{#each countersArray as counter}
		<p>{counter}</p>
	{/each}
</div>

<style lang="postcss">
	.counters {
		/* SIZE */
		/* MARGIN & PADDING */
		/* DISPLAY */
		@apply absolute flex flex-col top-0 left-0;
		/* ALIGNMENT */
		/* BORDERS */
		/* COLORS */
		@apply bg-black text-white;
		/* TEXT */
		@apply text-left;
		/* ANIMATION */
		/* EFFECT */
	}
</style>
