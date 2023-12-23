<script lang="ts">
	import { HAND } from '$lib/constants/cardZones';
	import { asDropZone } from 'svelte-drag-and-drop-actions';
	import Card from '$lib/components/game/card/+Card.svelte';
	import { hand as handStore } from '$lib/stores/handStore';
	import onDrop from '$lib/utils/game/onDrop';
</script>

{#if $handStore}
	<div
		class="hand"
		use:asDropZone={{
			Extras: { to: HAND },
			TypesToAccept: { 'card/plain': 'all' },
			onDrop: onDrop
		}}
	>
		{#each $handStore as card (card.id)}
			<Card {card} from={HAND} />
		{/each}
	</div>
{/if}

<style lang="postcss">
	.hand {
		/* SIZE */
		@apply w-full h-[13rem];
		/* MARGIN & PADDING */
		/* DISPLAY */
		@apply flex overflow-x-auto;
		/* ALIGNMENT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION */
		/* EFFECT */
	}
</style>
