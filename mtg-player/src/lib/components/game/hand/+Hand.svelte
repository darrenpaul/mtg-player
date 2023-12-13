<script lang="ts">
	import { getContext } from 'svelte';
	import { asDroppable, asDropZone } from 'svelte-drag-and-drop-actions';
	import type { Writable } from 'svelte/store';

	const cardsInHandStore: Writable<Array<any>> = getContext('cardsInHandStore');

	function onHandDrop(x, y, Operation, DataOffered, DroppableExtras, DropZoneExtras) {
		const { card, from } = DroppableExtras;
		cards = [
			...cards,
			{
				...card
			}
		];

		if (from === 'battlefield') {
			battlefieldCards = battlefieldCards.filter((c) => c.id !== card.id);
		}
	}
</script>

{#if $cardsInHandStore}
	<div
		class="hand"
		use:asDropZone={{
			Extras: 'hand',
			TypesToAccept: { 'card/plain': 'all' },
			onDrop: onHandDrop
		}}
	>
		{#each $cardsInHandStore as card}
			<div
				class="card"
				style="left:{card.x}px; top:{card.y}px;"
				use:asDroppable={{
					Operations: 'copy',
					DataToOffer: { 'card/plain': '' },
					Extras: { card, from: 'hand' }
				}}
			>
				<img src={card.imageUrl} />
			</div>
		{/each}
	</div>
{/if}

<style lang="postcss">
	.hand {
		/* SIZE */
		@apply w-full h-[204px];
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply relative flex;
		/* BORDERS */
		@apply bg-red-400;
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
