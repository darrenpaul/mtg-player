<script lang="ts">
	import GameList from '$lib/components/+GameList.svelte';
	import CreateGameForm from '$lib/components/game/createGameForm/+CreateGameForm.svelte';
	import { trans } from '$lib/locales/translateCopy.js';

	export let data;
	let user = data.user;
	let decks = data.decks;
	let games = data.games;
	let friends = data.friends;
	let creatingNewGame = true;

	const onCreateDeck = async () => {
		creatingNewGame = true;
	};
</script>

{#if creatingNewGame}
	<CreateGameForm {user} {decks} {friends} />
{/if}

{#if creatingNewGame === false}
	<div class="header">
		<h1>{trans('page.games.games')}</h1>

		<button class="submit-button" type="button" on:click={onCreateDeck}>
			{trans('page.games.createGame')}
		</button>
	</div>

	<h2>{trans('page.games.myGames')}</h2>

	<GameList {games} />
{/if}
