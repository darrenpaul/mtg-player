<script lang="ts">
	import CardComponent from './+Card.svelte';
	import type { Card } from '$lib/types/card';
	import { trans } from '$lib/locales/translateCopy';

	export let cards: Array<Card> = [];
</script>

<div>
	<h3>{trans('component.cardList.commander')}</h3>
	<div class="commader-list">
		{#each cards as card, index}
			{#if card.tag == 'commander'}
				<CardComponent bind:card={cards[index]} />
			{/if}
		{/each}
	</div>

	<h3>{trans('component.cardList.cards')}</h3>
	<div class="card-list">
		{#each cards as card, index}
			{#if card.tag !== 'commander'}
				<CardComponent bind:card={cards[index]} />
			{/if}
		{/each}
	</div>
</div>

<style lang="postcss">
	.card-list {
		/* SIZE */
		@apply w-full;
		/* MARGIN & PADDING */
		/* DISPLAY */
		@apply flex flex-wrap gap-4;
		/* ALIGNMENT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION */
		/* EFFECT */
	}

	.commader-list {
		@extend .card-list;
		/* SIZE */
		/* MARGIN & PADDING */
		@apply mb-4;
		/* DISPLAY */
		/* ALIGNMENT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION */
		/* EFFECT */
	}
</style>
