<script lang="ts">
	import { page } from '$app/stores';
	import { BATTLEFIELD, GRAVEYARD, HAND } from '$lib/constants/cardZones';
	import { getContext } from 'svelte';
	import { asDroppable, asDropZone } from 'svelte-drag-and-drop-actions';
	import type { Writable } from 'svelte/store';
	import Card from '$lib/components/game/card/+Card.svelte';
	import { updateCurrentPlayer } from '$lib/utils/game/player';
	import { saveCardsInHand } from '$lib/utils/game/hand';
	import { board as boardStore } from '$lib/stores/boardStore';
	import { hand as handStore } from '$lib/stores/handStore';
	import onDrop from '$lib/utils/game/onDrop';
	import { user as userStore } from '$lib/stores/userStore';

	const socketStore: Writable<Array<any>> = getContext('socketStore');

	let player;

	// const onDrop = async (x, y, Operation, DataOffered, DroppableExtras, DropZoneExtras) => {
	// 	console.log('onDrop ~ DropZoneExtras:', DropZoneExtras);
	// 	let boardChanged = false;
	// 	const { card, from } = DroppableExtras;

	// 	player = getCurrentPlayer($boardStore.players, $userStore.username);
	// 	const battlefield: Array<any> = player.battlefield;
	// 	const commandZone: Array<any> = player.commandZone;
	// 	const graveyard: Array<any> = player.graveyard;

	// 	if (from === BATTLEFIELD) {
	// 		const newBattlefield = battlefield.filter((c) => c.id !== card.id);

	// 		const newPlayerState = updateCurrentPlayer($boardStore.players, $userStore.username, {
	// 			battlefield: newBattlefield
	// 		});

	// 		const newHand = [...$handStore, card];
	// 		handStore.set(newHand);

	// 		boardStore.set({ ...$boardStore, players: newPlayerState });
	// 		boardChanged = true;
	// 	}

	// 	if (from === GRAVEYARD) {
	// 		const newGraveyard = graveyard.filter((c) => c.id !== card.id);

	// 		const newPlayerState = $boardStore.players.map((player) => {
	// 			if (player.email === $userStore.email) {
	// 				return {
	// 					...player,
	// 					graveyard: newGraveyard
	// 				};
	// 			}
	// 			return player;
	// 		});

	// 		const newHand = [...$handStore, card];
	// 		handStore.set(newHand);

	// 		boardStore.set({ ...$boardStore, players: newPlayerState });
	// 		boardChanged = true;
	// 	}

	// 	if (boardChanged) {
	// 		await fetch('/api/game', {
	// 			method: 'PUT',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify({ id: $page.params.slug, board: $boardStore })
	// 		});
	// 	}

	// 	saveCardsInHand($page.params.slug, $handStore);
	// };
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
		@apply w-full h-[204px];
		/* MARGIN & PADDING */
		/* DISPLAY */
		@apply flex;
		/* ALIGNMENT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION */
		/* EFFECT */
	}
</style>
