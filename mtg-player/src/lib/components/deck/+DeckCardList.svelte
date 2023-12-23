<script lang="ts">
	import DeckCard from './+DeckCard.svelte';
	import type { Card } from '$lib/types/card';
	import { trans } from '$lib/locales/translateCopy';
	import { handleRemoveDeckCard } from '$lib/apiHelper/deckCard';

	export let cards: Array<Card> = [];

	const onRemoveCard = (card) => {
		handleRemoveDeckCard(card);
		cards = cards.filter((c) => c.id !== card.id);
	};
</script>

<div class="header">
	<h3>{trans('component.cardList.commander')}</h3>
</div>

<div class="card-list">
	{#each cards as card, index (card.id)}
		{#if card.tag == 'commander'}
			<DeckCard bind:card={cards[index]} removeCardFn={onRemoveCard} />
		{/if}
	{/each}
</div>

<div class="header">
	<h3>{trans('component.cardList.cards')}</h3>
</div>

<div class="card-list">
	{#each cards as card, index (card.id)}
		{#if card.tag !== 'commander'}
			<DeckCard bind:card={cards[index]} removeCardFn={onRemoveCard} />
		{/if}
	{/each}
</div>

<style lang="postcss">
	.card-list {
		/* SIZE */
		@apply w-full;
		/* MARGIN & PADDING */
		@apply mb-4;
		/* DISPLAY */
		@apply flex flex-wrap gap-4;
		/* ALIGNMENT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION */
		/* EFFECT */
	}
</style>
