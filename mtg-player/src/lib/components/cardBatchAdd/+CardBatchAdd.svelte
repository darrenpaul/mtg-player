<script lang="ts">
	import { page } from '$app/stores';
	import { batchImportParser } from '$lib/utils/card/cardParser';

	let batchString = '';

	let cards = [];

	const onCardSearch = async () => {
		const cardList = batchImportParser(batchString);

		cardList.forEach(async ({ name, quantity }) => {
			for (let i = 0; i < quantity; i++) {
				const response = await fetch(`/api/cards?name=${name}`, {
					method: 'GET'
				});

				const card = await response.json();

				await fetch('/api/deck-cards', {
					method: 'POST',
					body: JSON.stringify({ deckId: $page.params.slug, cardId: card[0].id })
				});
			}
		});

		// cards = await response.json();
	};

	const onAddCardToDeck = async (card) => {
		const response = await fetch('/api/deck-cards', {
			method: 'POST',
			body: JSON.stringify({ deckId: $page.params.slug, cardId: card.id })
		});
	};
</script>

<form on:submit|preventDefault={onCardSearch}>
	<div class="input-group">
		<label for="batchString">Name</label>
		<textarea id="batchString" name="batchString" bind:value={batchString} />
	</div>

	<button>Add</button>
</form>
