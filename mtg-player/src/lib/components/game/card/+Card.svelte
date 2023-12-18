<script lang="ts">
	import type { CardGame } from '$lib/types/card';
	import { asDroppable } from 'svelte-drag-and-drop-actions';

	export let card: CardGame;
	export let from: string;

	let previewing = false;

	const onCardPreview = () => {
		previewing = true;
	};

	const onMouseExit = () => {
		previewing = false;
	};
</script>

<button
	class="card"
	use:asDroppable={{
		Operations: 'copy',
		DataToOffer: { 'card/plain': '' },
		Extras: { card, from: from }
	}}
	type="button"
	on:contextmenu={onCardPreview}
	on:mouseleave={onMouseExit}
>
	<img class="card-normal" src={card.imageUrl} alt={card.name} />

	{#if previewing}
		<div class="card-preview">
			<img src={card.imageUrl} alt={card.name} />
		</div>
	{/if}
</button>

<style lang="postcss">
	.card {
		/* SIZE */
		/* MARGIN & PADDING */
		/* DISPLAY */
		@apply relative z-10;
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

		.card-preview {
			/* SIZE */
			@apply w-[292px];
			/* MARGIN & PADDING */
			/* DISPLAY */
			@apply absolute top-0 left-0 overflow-hidden z-50;
			/* ALIGNMENT */
			/* BORDERS */
			@apply rounded-2xl;
			/* COLORS */
			/* TEXT */
			/* ANIMATION */
			/* EFFECT */
			@apply pointer-events-none;
		}
	}
</style>
