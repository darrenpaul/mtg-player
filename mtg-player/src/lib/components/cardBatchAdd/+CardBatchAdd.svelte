<script lang="ts">
	import { page } from '$app/stores';
	import { batchImportParser } from '$lib/utils/card/cardParser';
	import type { Card } from '$lib/types/card';
	import { trans } from '$lib/locales/translateCopy';

	export let cards: Array<Card> = [];

	let batchString = '';

	const onCardSearch = async () => {
		const cardList = batchImportParser(batchString);
		const newCards: Array<Card> = [];

		cardList.forEach(async ({ name, quantity }) => {
			for (let i = 0; i < quantity; i++) {
				const response = await fetch(`/api/cards?name=${name}`, {
					method: 'GET'
				});

				const card = await response.json();

				newCards.push(card[0]);
			}

			cards = newCards;
		});

		// cards = await response.json();
	};

	const onAddCardToDeck = async (card) => {
		const response = await fetch('/api/deck-cards', {
			method: 'POST',
			body: JSON.stringify({ deckId: $page.params.slug, card: card.id })
		});
	};
</script>

<form on:submit|preventDefault={onCardSearch}>
	<div class="input-group">
		<label for="batchString">Name</label>
		<textarea id="batchString" name="batchString" bind:value={batchString} />
	</div>

	<button class="submit-button">{trans('component.cardBatchAdd.addCards')}</button>
</form>
