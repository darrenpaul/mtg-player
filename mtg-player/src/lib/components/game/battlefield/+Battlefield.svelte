<script lang="ts">
	import { asDropZone } from 'svelte-drag-and-drop-actions';
	import { BATTLEFIELD } from '$lib/constants/cardZones';
	import type { CardGame } from '$lib/types/card';
	import CardBattlefield from '$lib/components/game/card/+CardBattlefield.svelte';
	import { board as boardStore, getCurrentPlayer } from '$lib/stores/boardStore';
	import onDrop from '$lib/utils/game/onDrop';

	let cards: CardGame[] = [];
	let player;

	$: {
		$boardStore, boardUpdated();
	}

	const boardUpdated = async () => {
		player = getCurrentPlayer();

		if (!player || !player.battlefield) return [];

		cards = player.battlefield;
	};
</script>

<div
	class="battlefield"
	use:asDropZone={{
		Extras: { to: BATTLEFIELD },
		TypesToAccept: { 'card/plain': 'all' },
		onDrop: onDrop
	}}
>
	{#each cards as card (card.id)}
		<CardBattlefield {card} from={BATTLEFIELD} usePosition={true} canTap={true} />
	{/each}
</div>

<style lang="postcss">
	.battlefield {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply relative flex-grow;
		/* BORDERS */
		@apply bg-green-400;
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
