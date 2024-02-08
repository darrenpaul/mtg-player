<script lang="ts">
	import type { Player } from './types';
	import { MAX_PLAYERS } from './constants';
	import { trans } from '$lib/locales/translateCopy';
	import type { Deck } from '$lib/types/deck';
	import type { User } from '$lib/types/user';
	import type { Board } from '$lib/types/board';
	import { goto } from '$app/navigation';
	import TrashIcon from '$lib/icons/+TrashIcon.svelte';
	import { DECK_API } from '$lib/routesApi';
	import { handleGetDeck } from '$lib/apiHelper/deck';
	import { handleCreateGame } from '$lib/apiHelper/game';

	export let user: User;
	export let decks: Deck[] = [];
	export let friends = [];

	let gameName = '';
	let players: Player[] = [];
	let hostPlayerColor: string;
	let canAddPlayer: boolean;
	let deck: string;
	let boardState: Board;

	$: canAddPlayer = players.length < MAX_PLAYERS;

	const onAddPlayer = () => {
		players = [...players, { id: '', username: '', color: '' }];
	};

	const onSave = async () => {
		const host = user.username;
		console.log(players);

		const { cards } = await handleGetDeck(deck);

		const commanders = cards
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

		const board = [
			{
				username: host,
				health: 40,
				commanderDamage: 0,
				poisonCounters: 0,
				graveyard: [],
				exile: [],
				battlefield: [],
				commandZone: [...commanders],
				deck: deck,
				color: hostPlayerColor
			},
			...players.map((player) => {
				return {
					username: player.username,
					health: 40,
					commanderDamage: 0,
					poisonCounters: 0,
					graveyard: [],
					exile: [],
					battlefield: [],
					commandZone: [],
					deck: '',
					color: player.color
				};
			})
		];

		const gameData = {
			host: user.id,
			name: gameName,
			players: [user.id, ...players.map((player) => player.id)],
			board: board
		};
		console.log('onSave ~ gameData:', gameData);

		const game = await handleCreateGame(gameData);

		goto(`/game/${game.id}`);
	};
</script>

{JSON.stringify(players)}

<form class="create-game-form" on:submit|preventDefault={onSave}>
	<div class="header">
		<h1>{trans('page.games.creatingNewGame')}</h1>
	</div>

	<div class="input-group">
		<label for="gameName">{trans('component.createGameForm.gameName')}</label>
		<input type="gameName" id="gameName" name="gameName" bind:value={gameName} required />
	</div>

	<div class="header">
		<h2>{trans('page.games.players')}</h2>

		<button disabled={!canAddPlayer} type="button" class="submit-button" on:click={onAddPlayer}>
			{trans('component.createGameForm.addPlayer')}
		</button>
	</div>

	<div class="input-group">
		<label for="player">{trans('component.createGameForm.player', { index: 1 })}</label>
		<input disabled type="text" id="player" name="player" value={user.username} required />

		<div class="player-color-select">
			<button
				type="button"
				class={`-button bg-plains ${hostPlayerColor === 'plains' ? '-active' : ''}`}
				on:click={() => {
					hostPlayerColor = 'plains';
				}}
			/>

			<button
				type="button"
				class={`-button bg-mountain ${hostPlayerColor === 'mountain' ? '-active' : ''}`}
				on:click={() => {
					hostPlayerColor = 'mountain';
				}}
			/>

			<button
				type="button"
				class={`-button bg-swamp ${hostPlayerColor === 'swamp' ? '-active' : ''}`}
				on:click={() => {
					hostPlayerColor = 'swamp';
				}}
			/>

			<button
				type="button"
				class={`-button bg-forest ${hostPlayerColor === 'forest' ? '-active' : ''}`}
				on:click={() => {
					hostPlayerColor = 'forest';
				}}
			/>

			<button
				type="button"
				class={`-button bg-island ${hostPlayerColor === 'island' ? '-active' : ''}`}
				on:click={() => {
					hostPlayerColor = 'island';
				}}
			/>
		</div>
	</div>

	{#each players as player, index}
		<div class="input-group">
			<div class="flex items-center justify-between">
				<label for={`player-${index}`}>
					{trans('component.createGameForm.player', { index: index + 2 })}
				</label>

				<button type="button" on:click={() => (players = players.filter((_, i) => i !== index))}>
					<TrashIcon width="18" />
				</button>
			</div>

			<select
				id={`player-${player.index}`}
				name="player"
				bind:value={player}
				placeholder=""
				required
			>
				{#each friends as friend}
					<option value={friend}>{friend.username}</option>
				{/each}
			</select>

			<div class="player-color-select">
				<button
					type="button"
					class={`-button bg-plains ${player.color === 'plains' ? '-active' : ''}`}
					on:click={() => {
						player.color = 'plains';
					}}
				/>

				<button
					type="button"
					class={`-button bg-mountain ${player.color === 'mountain' ? '-active' : ''}`}
					on:click={() => {
						player.color = 'mountain';
					}}
				/>

				<button
					type="button"
					class={`-button bg-swamp ${player.color === 'swamp' ? '-active' : ''}`}
					on:click={() => {
						player.color = 'swamp';
					}}
				/>

				<button
					type="button"
					class={`-button bg-forest ${player.color === 'forest' ? '-active' : ''}`}
					on:click={() => {
						player.color = 'forest';
					}}
				/>

				<button
					type="button"
					class={`-button bg-island ${player.color === 'island' ? '-active' : ''}`}
					on:click={() => {
						player.color = 'island';
					}}
				/>
			</div>
		</div>
	{/each}

	<div class="header">
		<h2>{trans('page.games.deck')}</h2>
	</div>

	<div class="input-group">
		<label for="deck">{trans('component.createGameForm.deckSelection')}</label>

		<select id="deck" name="deck" bind:value={deck} placeholder="" required>
			<option value={null} disabled selected>{trans('component.createGameForm.selectDeck')}</option>
			{#each decks as deck}
				<option value={deck.id}>{deck.name}</option>
			{/each}
		</select>
	</div>

	<button class="submit-button">{trans('component.createGameForm.createNewGame')}</button>
</form>

<style lang="postcss">
	.create-game-form {
		/* SIZE */
		@apply w-[800px];
		/* MARGIN & PADDING */
		@apply mx-auto;
		/* DISPLAY */
		/* ALIGNMENT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION */
		/* EFFECT */

		.player-color-select {
			/* SIZE */
			/* MARGIN & PADDING */
			/* DISPLAY */
			@apply flex gap-4;
			/* ALIGNMENT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION */
			/* EFFECT */

			.-button {
				/* SIZE */
				@apply w-12 h-12;
				/* MARGIN & PADDING */
				@apply mt-2;
				/* DISPLAY */
				/* ALIGNMENT */
				/* BORDERS */
				@apply rounded-full;
				/* COLORS */
				/* TEXT */
				/* ANIMATION */
				/* EFFECT */
			}

			.-active {
				@apply border-2 border-black;
			}
		}
	}
</style>
