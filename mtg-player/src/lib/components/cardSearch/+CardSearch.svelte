<script lang="ts">
	import { page } from '$app/stores';

	let name = 'Eriette of the Charmed Apple';

	let cards = [];

	const onCardSearch = async () => {
		const response = await fetch(`/api/card?name=${name}`, {
			method: 'GET'
		});

		cards = await response.json();
	};

	const onAddCardToDeck = async (card) => {
		const response = await fetch('/api/deck-cards', {
			method: 'POST',
			body: JSON.stringify({ deck: $page.params.slug, card: card.id })
		});
	};
</script>

<form on:submit|preventDefault={onCardSearch}>
	<div class="input-group">
		<label for="name">Name</label>
		<input type="text" id="name" name="name" bind:value={name} />
	</div>

	<button>Search</button>
</form>

<div>
	{#each cards as card}
		<img src={card.images.small} />
		<p>{card.name}</p>
		<button type="button" on:click={() => onAddCardToDeck(card)}>Add</button>
	{/each}
</div>
