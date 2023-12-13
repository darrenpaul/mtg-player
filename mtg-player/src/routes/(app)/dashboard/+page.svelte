<script lang="ts">
	import DeckList from '$lib/components/deckList/+DeckList.svelte';

	export let data;
	let name = '';
	let decks = [];

	$: {
		decks = data?.decks ?? [];
	}

	const onCreateDeck = async () => {
		const response = await fetch('/api/deck', {
			method: 'POST',
			body: JSON.stringify({ name })
		});
		const json = await response.json();
	};
</script>

<div>
	<h1>Dashboard</h1>

	<form on:submit|preventDefault={onCreateDeck}>
		<div class="input-group">
			<label for="name">name</label>
			<input type="text" id="name" name="name" bind:value={name} />
		</div>

		<button>Create New</button>
	</form>

	<DeckList {decks} />
</div>
