<script lang="ts">
	import type { Player } from './types';
	import { MAX_PLAYERS } from './constants';
	import { trans } from '$lib/locales/translateCopy';
	import type { Deck } from '$lib/types/deck';
	import type { User } from '$lib/types/user';
	import type { Board } from '$lib/types/board';
	import { goto } from '$app/navigation';
	import type { CardGame } from '$lib/types/card';

	export let user: User;
	export let decks: Deck[] = [];

	let gameName = '';
	let players: Player[] = [];
	let canAddPlayer: boolean;
	let deck: string;
	let boardState: Board;

	$: canAddPlayer = players.length < MAX_PLAYERS;

	const onAddPlayer = () => {
		players = [...players, { username: '' }];
	};

	const onSave = async () => {
		const host = user.username;

		const deckResponse = await fetch(`/api/deck?slug=${deck}`, {
			method: 'GET'
		});
		const { cards } = await deckResponse.json();

		const commanders = cards
			.filter((card: CardGame) => card.tag === 'commander')
			.map((card) => {
				return {
					id: card.id,
					cardId: card.expand.card.id,
					name: card.expand.card.name,
					imageUrl: card.expand.card.images.small,
					tag: card.tag
				};
			});

		const newBoardState: Board = {
			players: [
				{
					username: host,
					graveyard: [],
					exile: [],
					battlefield: [],
					commandZone: [...commanders],
					deck: deck
				},
				...players.map((player) => {
					return {
						username: player.username
					};
				})
			]
		};
		boardState = newBoardState;

		const response = await fetch('/api/game', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ host: user.id, name: gameName, board: boardState })
		});

		const game = await response.json();
		goto(`/game/${game.id}`);
	};
</script>

<h2>Add Players to Game</h2>

<form on:submit|preventDefault={onSave}>
	<div class="input-group">
		<label for="gameName">{trans('component.createGameForm.gameName')}</label>
		<input type="gameName" id="gameName" name="gameName" bind:value={gameName} required />
	</div>

	<button disabled={!canAddPlayer} type="button" class="submit-button" on:click={onAddPlayer}>
		Add Player
	</button>

	<div class="input-group">
		<label for="username">{trans('component.createGameForm.username')}</label>
		<input disabled type="username" id="username" name="username" value={user.username} required />
	</div>

	{#each players as player, index}
		<div class="input-group">
			<label for={`username-${index}`}>{trans('component.createGameForm.username')}</label>
			<input
				id={`username-${index}`}
				name={`username-${index}`}
				bind:value={player.username}
				required
			/>
		</div>
	{/each}

	<select id="deck" name="deck" bind:value={deck} placeholder="" required>
		<option value={null} disabled selected>{trans('component.createGameForm.selectDeck')}</option>
		{#each decks as deck}
			<option value={deck.id}>{deck.name}</option>
		{/each}
	</select>

	<button class="submit-button">Save</button>
</form>
