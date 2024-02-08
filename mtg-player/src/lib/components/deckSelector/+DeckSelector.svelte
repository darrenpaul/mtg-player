<script lang="ts">
	import { onMount } from 'svelte';
	import { board as boardStore } from '$lib/stores/boardStore';
	import { user as userStore } from '$lib/stores/userStore';
	import { game as gameStore } from '$lib/stores/gameStore';
	import { handleUpdateBoard } from '$lib/apiHelper/board';

	let deckId: string;
	let decks = [];

	onMount(async () => {
		const response = await fetch('/api/deck');
		const jsonData = await response.json();
		if (jsonData) {
			decks = jsonData.items;
		}
	});

	const onSaveDeck = async () => {
		const response = await fetch(`/api/deck?slug=${deckId}`, {
			method: 'GET'
		});
		const jsonData = await response.json();

		const commanders = jsonData.cards
			.filter((card) => card.tag === 'commander')
			.map((card) => {
				const cardFaces = card.images.map((image) => image.normal);
				return {
					id: card.id,
					cardId: card.cardId,
					name: card.name,
					cardFaces: cardFaces,
					faceIndex: 0,
					layout: card.layout,
					tag: card.tag
				};
			});

		const player = $boardStore.players.find((player) => {
			return player.username === $userStore.username;
		});

		player.deck = deckId;
		player.commandZone = [...commanders];
		player.exile = [];
		player.graveyard = [];
		player.battlefield = [];
		player.health = 40;
		player.commanderDamage = 0;

		const newPlayers = [
			player,
			...$boardStore.players.filter((player) => player.username !== $userStore.username)
		];

		boardStore.set({ ...$boardStore, players: newPlayers });

		const { id, players } = $boardStore;
		handleUpdateBoard(id, players);
	};
</script>

<form on:submit|preventDefault={onSaveDeck}>
	<select id="deck" name="deck" bind:value={deckId} placeholder="" required>
		<option value={null} disabled selected> Select a deck </option>
		{#each decks as deck}
			<option value={deck.id}>{deck.name}</option>
		{/each}
	</select>

	<button class="submit-button">Save</button>
</form>
