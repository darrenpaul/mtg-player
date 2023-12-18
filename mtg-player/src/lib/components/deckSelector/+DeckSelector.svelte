<script lang="ts">
	import { page } from '$app/stores';
	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { board as boardStore } from '$lib/stores/boardStore';
	import { user as userStore } from '$lib/stores/userStore';

	const socketStore: Writable<Array<any>> = getContext('socketStore');

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
				return {
					id: card.id,
					cardId: card.expand.card.id,
					name: card.expand.card.name,
					imageUrl: card.expand.card.images.small,
					tag: card.tag
				};
			});

		const player = $boardStore.players.find((player) => {
			return player.email === $userStore.email;
		});
		player.deck = deckId;
		player.commandZone = [...commanders];

		const players = [
			player,
			...$boardStore.players.filter((player) => player.email !== $userStore.email)
		];

		const newBoardState = {
			...$boardStore,
			players
		};

		boardStore.set(newBoardState);

		$socketStore.emit('update-board', $boardStore, $page.params.slug);
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
