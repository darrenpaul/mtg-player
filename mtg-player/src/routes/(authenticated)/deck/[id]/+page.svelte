<script lang="ts">
	import DeckCardList from '$lib/components/deck/+DeckCardList.svelte';
	import AddCardForm from '$lib/components/deck/+AddCardForm.svelte';
	import { trans } from '$lib/locales/translateCopy';
	import type { Card } from '$lib/types/card';
	import { handleUpdateDeck } from '$lib/apiHelper/deck.js';

	export let data;

	let deckName = data.deck.name;
	let deckId = data.deck.id;
	let cards: Array<Card> = data.cards;

	const onSaveDeck = async () => {
		handleUpdateDeck(deckId, { name: deckName });
	};
</script>

<div class="deck-page">
	<div class="header">
		<h1>{trans('page.deck.deck', { name: deckName })}</h1>
	</div>

	<form on:submit|preventDefault={onSaveDeck}>
		<div class="input-group">
			<label for="deckName">{trans('page.deck.deckName')}</label>
			<input type="text" id="deckName" name="deckName" bind:value={deckName} />
		</div>

		<AddCardForm bind:cards />

		<DeckCardList bind:cards />

		<button class="submit-button">{trans('page.deck.saveDeck')}</button>
	</form>
</div>

<style lang="postcss">
	.deck-page {
		/* SIZE */
		/* MARGIN & PADDING */
		@apply mt-8 px-8;
		/* DISPLAY */
		/* ALIGNMENT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION */
		/* EFFECT */
	}
</style>
