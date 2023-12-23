<script lang="ts">
	export let counters;

	let countersArray = [];

	$: {
		if (counters) {
			const entries = Object.entries(counters);
			countersArray = entries.map(([key, value]) => {
				return `${value}x ${key}`;
			});
		}
	}
</script>

{#if countersArray.length > 0}
	<div class="counters">
		{#each countersArray as counter}
			<p>{counter}</p>
		{/each}
	</div>
{/if}

<style lang="postcss">
	.counters {
		/* SIZE */
		/* MARGIN & PADDING */
		@apply p-2;
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
