<script lang="ts">
	import CardList from '$lib/components/cardList/+CardList.svelte';
	import CardBatchAdd from '$lib/components/cardBatchAdd/+CardBatchAdd.svelte';
	import { trans } from '$lib/locales/translateCopy';
	import type { Card } from '$lib/types/card';
	import { goto } from '$app/navigation';

	export let data;
	console.log('data:', data);

	let deckName = data.deck.name;
	let cards: Array<Card> = data.cards.map((card) => {
		const { name, images } = card.expand.card;
		return { ...card, name, images };
	});

	const onCreateDeck = async () => {
		const deckId = await createDeck();

		if (!deckId) return;

		cards.forEach(async ({ id: cardId, tag }) => {
			await fetch('/api/deck-cards', {
				method: 'POST',
				body: JSON.stringify({ deckId, cardId, tag })
			});
		});

		goto(`/decks/${deckId}`);
	};

	const createDeck = async () => {
		const response = await fetch('/api/deck', {
			method: 'POST',
			body: JSON.stringify({ deckName })
		});

		if (response.ok) {
			const json = await response.json();
			return json.id;
		}
	};
</script>

<div class="decks-page">
	<div class="header">
		<h1>{trans('page.decks.newDeck')}</h1>
	</div>

	<form on:submit|preventDefault={onCreateDeck}>
		<div class="input-group">
			<label for="deckName">{trans('page.decks.deckName')}</label>
			<input type="text" id="deckName" name="deckName" bind:value={deckName} />
		</div>

		<CardBatchAdd bind:cards />

		<CardList bind:cards />

		<button class="submit-button">{trans('page.decks.updateDeck')}</button>
	</form>
</div>

<style lang="postcss">
	.decks-page {
		/* SIZE */
		/* MARGIN & PADDING */
		/* DISPLAY */
		/* ALIGNMENT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION */
		/* EFFECT */

		.header {
			/* SIZE */
			/* MARGIN & PADDING */
			/* DISPLAY */
			@apply flex;
			/* ALIGNMENT */
			@apply items-center justify-between;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION */
			/* EFFECT */
		}
	}
</style>
