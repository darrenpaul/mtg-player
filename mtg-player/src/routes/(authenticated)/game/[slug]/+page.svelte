<script lang="ts">
	import { page } from '$app/stores';
	import BoardComponent from '$lib/components/board/+Board.svelte';
	import DeckSelector from '$lib/components/deckSelector/+DeckSelector.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { isEmpty } from 'lodash-es';
	import PocketBase from 'pocketbase';
	import { handleFetchGame } from '$lib/stores/gameStore';
	import { board as boardStore, getCurrentPlayer, handleFetchBoard } from '$lib/stores/boardStore';
	import { user as userStore } from '$lib/stores/userStore';
	import { handleFetchGameLog } from '$lib/stores/gameLogStore.js';
	import ActivityLog from '$lib/components/game/activityLog/+ActivityLog.svelte';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import { creatureTokenStore } from '$lib/stores/creatureTokenStore';
	import { BOARDS_TABLE, GAMES_TABLE, GAME_LOGS_TABLE } from '$lib/constants/database.js';

	const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

	export let data;

	let authToken = data.authToken;
	let playerHasDeck: boolean = false;
	let showActivityLog = true;

	$: {
		if (isEmpty($boardStore) === false) {
			playerHasDeck = getCurrentPlayer()?.deck;
		}
	}

	onMount(async () => {
		joinGame();
	});

	onDestroy(() => {
		pb.collection(BOARDS_TABLE).unsubscribe();
		pb.collection(GAME_LOGS_TABLE).unsubscribe();
	});

	const joinGame = async () => {
		userStore.set(data.user);
		await pb.authStore.save(authToken, null);

		const game = await handleFetchGame($page.params.slug);

		const board = await handleFetchBoard(game.id);

		const gameLog = await handleFetchGameLog($page.params.slug);

		pb.collection(BOARDS_TABLE).subscribe(board.id, async () => {
			await handleFetchBoard(game.id);
		});

		pb.collection(GAME_LOGS_TABLE).subscribe(gameLog.id, async () => {
			await handleFetchGameLog($page.params.slug);
		});

		creatureTokenStore.set(data.creatureTokens);
	};
</script>

<div>
	{#if isEmpty($boardStore) === false && !playerHasDeck}
		<DeckSelector />
	{/if}

	{#if isEmpty($boardStore) === false && playerHasDeck}
		<BoardComponent />

		<ActivityLog show={showActivityLog} />
	{/if}
</div>
