<script lang="ts">
	import { batchImportParser } from '$lib/utils/card/cardParser';
	import type { Card } from '$lib/types/card';
	import { trans } from '$lib/locales/translateCopy';
	import { handleGetCard } from '$lib/apiHelper/card';
	import { page } from '$app/stores';
	import { handleAddDeckCard } from '$lib/apiHelper/deckCard';

	export let cards: Array<Card> = [];

	let cardAddString = '';

	const onAddCards = async () => {
		const cardList = batchImportParser(cardAddString);

		const getCardsPromise: any[] = [];

		cardList.forEach(({ name, quantity }) => {
			for (let i = 0; i < quantity; i++) {
				getCardsPromise.push(handleGetCard(name));
			}
		});

		const cardsResolved = await Promise.all(getCardsPromise);

		const deckId = $page.params.id;
		const cardsToSavePromise: any[] = [];
		cardsResolved.forEach((card) =>
			cardsToSavePromise.push(
				handleAddDeckCard({ deck: deckId, card: card.id, tag: card.tag || '' })
			)
		);

		const newCards = await Promise.all(cardsToSavePromise);
		cards = [...cards, ...newCards];
		console.log('onAddCards ~ cards:', cards);
	};
</script>

<form on:submit|preventDefault={onAddCards}>
	<div class="input-group">
		<label for="batchString">{trans('component.AddCardForm.cardsToAdd')}</label>
		<small>{trans('component.AddCardForm.batchAddFormatting')}</small>
		<textarea id="batchString" name="batchString" bind:value={cardAddString} />
	</div>

	<button class="submit-button">{trans('component.AddCardForm.add')}</button>
</form>
