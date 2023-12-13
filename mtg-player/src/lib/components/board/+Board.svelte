<script lang="ts">
	import Hand from '$lib/components/game/hand/+Hand.svelte';
	import Deck from '$lib/components/game/deck/+Deck.svelte';
	import Battlefield from '$lib/components/game/battlefield/+Battlefield.svelte';
</script>

<div class="board">
	<Battlefield />

	<!-- HAND|DECK|GRAVEYARD|EXILE -->

	<div class="player-panel">
		<Hand />

		<Deck />
	</div>
</div>

<style lang="postcss">
	.board {
		/* SIZE */
		@apply w-screen h-[50vh];
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply relative flex flex-col;
		/* BORDERS */
		@apply bg-slate-400;
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}

	.battlefield {
		/* SIZE */
		@apply w-screen;
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply flex-grow;
		/* BORDERS */
		@apply bg-yellow-400;
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}

	.player-panel {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply flex;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
