<script lang="ts">
	import { goto } from '$app/navigation';
	import { handleCreateDeck } from '$lib/apiHelper/deck.js';
	import DeckList from '$lib/components/deckList/+DeckList.svelte';
	import { trans } from '$lib/locales/translateCopy';
	import type { Deck } from '$lib/types/deck';

	export let data;

	let decks: Deck[] = data.decks;

	const onCreateDeck = async () => {
		const deck = await handleCreateDeck();
		goto(`/decks/${deck.id}`);
	};
</script>

<div class="decks-page">
	<div class="header">
		<h1>{trans('page.decks.myDecks')}</h1>

		<button class="submit-button" type="button" on:click={onCreateDeck}>
			{trans('page.decks.createDeck')}
		</button>
	</div>

	<DeckList {decks} />
</div>

<style lang="postcss">
	.decks-page {
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
