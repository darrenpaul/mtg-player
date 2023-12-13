<script lang="ts">
	export let battlefieldCards = [];
</script>

<div class="battlefield">
	{#each battlefieldCards as card}
		<div class="card" style="left:{card.x}px; top:{card.y}px;">
			<img src={card.imageUrl} />
		</div>
	{/each}
</div>

<style lang="postcss">
	.battlefield {
		/* SIZE */
		@apply w-screen h-[50vh];
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply relative flex-grow;
		/* BORDERS */
		@apply border-2;
		/* COLORS */
		@apply bg-green-400 border-black;
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}

	.card {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply block absolute;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
