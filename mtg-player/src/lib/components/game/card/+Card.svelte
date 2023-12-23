<script lang="ts">
	import type { CardGame } from '$lib/types/card';
	import { asDroppable } from 'svelte-drag-and-drop-actions';

	export let card: CardGame;
	export let from: string;
	export let display = 'relative';
	export let contextMenuDisabled = false;

	let previewing = false;
	let faceIndex = 0;
	let cardImage = '';

	$: faceIndex = card.faceIndex;
	$: cardImage = card.cardFaces[faceIndex];

	const onCardPreview = () => {
		if (contextMenuDisabled) return;
		previewing = !previewing;
	};

	const onFlipCard = () => {
		if (card.cardFaces.length > 1) {
			const newIndex = faceIndex + 1;
			faceIndex = newIndex % 2;
			card.faceIndex = faceIndex;
		}
	};

	const onMouseExit = () => {
		previewing = false;
	};
</script>

<button
	class={`card ${display}`}
	use:asDroppable={{
		Operations: 'copy',
		DataToOffer: { 'card/plain': '' },
		Extras: { card, from: from }
	}}
	type="button"
	on:contextmenu|preventDefault={onCardPreview}
	on:dblclick={onFlipCard}
	on:mouseleave={onMouseExit}
>
	<img class="card-normal" src={cardImage} alt={card.name} />
</button>

{#if previewing}
	<div class="card-preview">
		<img src={cardImage} alt={card.name} />
	</div>
{/if}

<style lang="postcss">
	.card {
		/* SIZE */
		/* MARGIN & PADDING */
		/* DISPLAY */
		@apply flex-shrink-0 z-10;
		/* ALIGNMENT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION */
		/* EFFECT */

		.card-normal {
			/* SIZE */
			@apply w-[146px] h-[204px];
			/* MARGIN & PADDING */
			/* DISPLAY */
			/* ALIGNMENT */
			/* BORDERS */
			@apply rounded-xl;
			/* COLORS */
			/* TEXT */
			/* ANIMATION */
			/* EFFECT */
		}
	}

	.card-preview {
		/* SIZE */
		@apply w-[438px];
		/* MARGIN & PADDING */
		/* DISPLAY */
		@apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden z-50;
		/* ALIGNMENT */
		/* BORDERS */
		@apply rounded-2xl;
		/* COLORS */
		/* TEXT */
		/* ANIMATION */
		/* EFFECT */
		@apply pointer-events-none;
	}
</style>
