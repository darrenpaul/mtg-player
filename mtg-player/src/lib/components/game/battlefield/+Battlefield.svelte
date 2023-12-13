<script lang="ts">
	import { page } from '$app/stores';
	import { getContext } from 'svelte';
	import { asDroppable, asDropZone } from 'svelte-drag-and-drop-actions';
	import type { Writable } from 'svelte/store';

	const socketStore: Writable<Array<any>> = getContext('socketStore');
	const boardStore: Writable<Array<any>> = getContext('boardStore');
	const userStore: Writable<Array<any>> = getContext('userStore');
	const cardsInHandStore: Writable<Array<any>> = getContext('cardsInHandStore');

	let battlefieldCards = [];

	function onDrop(x, y, Operation, DataOffered, DroppableExtras, DropZoneExtras) {
		const { card, from } = DroppableExtras;

		if (from === 'hand') {
			battlefieldCards = [
				...battlefieldCards,
				{
					...card,
					x,
					y
				}
			];
			cardsInHandStore.set($cardsInHandStore.filter((c) => c.id !== card.id));

			const newPlayerState = $boardStore.players.map((player) => {
				if (player.email === $userStore.email) {
					return {
						...player,
						battlefield: battlefieldCards
					};
				}
				return player;
			});

			console.log('battlefieldCards:', battlefieldCards);

			boardStore.set({ ...$boardStore, players: newPlayerState });
			$socketStore.emit('updated-board', { ...$boardStore }, $page.params.slug);
		}
	}
</script>

<div
	class="battlefield"
	use:asDropZone={{
		Extras: 'battlefield',
		TypesToAccept: { 'card/plain': 'all' },
		onDrop
	}}
>
	{#each battlefieldCards as card}
		<div
			class="card"
			style="left:{card.x}px; top:{card.y}px;"
			use:asDroppable={{
				Operations: 'move',
				DataToOffer: { 'card/plain': '' },
				onDragEnd: (x, y) => {
					card.x = x;
					card.y = y;
				},
				Extras: { card, from: 'battlefield' }
			}}
		>
			<img src={card.imageUrl} />
		</div>
	{/each}
</div>

<style lang="postcss">
	.battlefield {
		/* SIZE */
		@apply w-screen;
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply relative flex-grow;
		/* BORDERS */
		@apply bg-yellow-400;
		/* COLORS */
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
