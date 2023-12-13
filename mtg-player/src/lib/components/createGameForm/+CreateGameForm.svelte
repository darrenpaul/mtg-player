<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { Player } from './types';
	import { MAX_PLAYERS } from './constants';

	const userStore: Writable<Array<any>> = getContext('userStore');
	const boardStore: Writable<Array<any>> = getContext('boardStore');

	let players: Array<Player> = [];
	let canAddPlayer: boolean;
	let deckId: string;
	let decks = [];

	onMount(async () => {
		const response = await fetch('/api/deck');
		const jsonData = await response.json();
		if (jsonData) {
			decks = jsonData.items;
		}
	});

	$: canAddPlayer = players.length < MAX_PLAYERS;

	const onAddPlayer = () => {
		players = [...players, { email: '' }];
	};

	const onSavePlayers = () => {
		const newBoardState = {
			host: $userStore.email,
			players: [
				{
					player: $userStore.email,
					email: $userStore.email,
					graveyard: [],
					exile: [],
					battlefield: []
				},
				...players.map((player) => {
					return {
						player: player.email,
						email: player.email,
						graveyard: [],
						exile: [],
						battlefield: []
					};
				})
			]
		};
		boardStore.set(newBoardState);

		gameCreationStep = 'select-deck';
	};

	const onSave = () => {
		const newBoardState = {
			host: $userStore.email,
			players: [
				{
					player: $userStore.email,
					email: $userStore.email,
					graveyard: [],
					exile: [],
					battlefield: [],
					deck: deckId
				},
				...players.map((player) => {
					return {
						player: player.email,
						email: player.email,
						graveyard: [],
						exile: [],
						battlefield: []
					};
				})
			]
		};

		boardStore.set(newBoardState);
	};
</script>

<h2>Add Players to Game</h2>

{#if $userStore?.email}
	<form on:submit|preventDefault={onSave}>
		<button disabled={!canAddPlayer} type="button" class="submit-button" on:click={onAddPlayer}>
			Add Player
		</button>

		<div class="input-group">
			<label for="email">Email</label>
			<input disabled type="email" id="email" name="email" value={$userStore.email} />
		</div>

		{#each players as player, index}
			<div class="input-group">
				<label for={`email-${index}`}>Email</label>
				<input id={`email-${index}`} name={`email-${index}`} bind:value={player.email} />
			</div>
		{/each}

		<select id="deck" name="deck" bind:value={deckId} placeholder="" required>
			<option value={null} disabled selected> Select a deck </option>
			{#each decks as deck}
				<option value={deck.id}>{deck.name}</option>
			{/each}
		</select>

		<button class="submit-button">Save</button>
	</form>
{/if}
