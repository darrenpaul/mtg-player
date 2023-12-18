<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import BoardComponent from '$lib/components/board/+Board.svelte';
	import DeckSelector from '$lib/components/deckSelector/+DeckSelector.svelte';
	import { io } from 'socket.io-client';
	import { getContext, onDestroy, onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { isEqual, isEmpty } from 'lodash-es';
	import EnemyBattlefield from '$lib/components/game/battlefield/+EnemyBattlefield.svelte';
	import PocketBase from 'pocketbase';
	import type { BoardPlayer } from '$lib/types/board';
	import { game as gameStore } from '$lib/stores/gameStore';
	import { board as boardStore } from '$lib/stores/boardStore';
	import { user as userStore } from '$lib/stores/userStore';

	const pb = new PocketBase('http://127.0.0.1:8090');
	const socket = io('http://localhost:3000');

	export let data;
	let user = data.user;
	let authToken = data.authToken;
	let gameId = $page.params.slug;
	let logs: Array<string> = [];
	let enemies: BoardPlayer[] = [];
	let playerHasDeck: boolean;
	let players: BoardPlayer[] = [];

	const cardsInHandStore = writable([]);
	const socketStore = writable();
	const playerStore = writable({});
	const pbStore = writable({});

	if (browser) {
		setContext('cardsInHandStore', cardsInHandStore);
		setContext('socketStore', socketStore);
		setContext('playerStore', playerStore);
		setContext('pbStore', pbStore);
		socketStore.set(socket);
		userStore.set(user);
		pbStore.set(pb);
	}

	onMount(async () => {
		joinGame();
	});

	onDestroy(() => {
		pb.collection('game').unsubscribe();
	});

	$: playerHasDeck = $boardStore?.players?.find(
		(player) => player.username === user.username
	)?.deck;
	$: players = $boardStore?.board?.players || [];
	$: enemies = players.filter((player) => player.username !== user.username) || [];

	const getGame = () => {
		return pb.collection('games').getOne(gameId, {});
	};

	const joinGame = async () => {
		// socket.emit('join-game', gameId, (message) => {
		// 	logs = [...logs, JSON.stringify(message)];
		// });
		// socket.emit('get-board-state', gameId);

		await pb.authStore.save(authToken, null);

		const game = await getGame();
		gameStore.set(game);

		const newBoard = {
			...game.board
		};
		boardStore.set(newBoard);

		pb.collection('games').subscribe(gameId, async () => {
			const game = await getGame();

			gameStore.set(game);
			const newBoard = {
				...game.board
			};
			boardStore.set(newBoard);
		});
	};

	// socket.on('get-board-state', () => {
	// 	console.log('GET-BOARD-STATE');
	// 	if ($boardStore && $boardStore.host === user.email) {
	// 		socket.emit('push-board-state', { ...$boardStore }, gameId);
	// 	}
	// });

	// socket.on('pull-board-state', (board) => {
	// 	console.log('PULL-BOARD-STATE');

	// 	if (isEmpty($boardStore) === false) {
	// 		boardStore.set(board);
	// 		return;
	// 	}

	// 	const newBoard = {
	// 		...board,
	// 		players: [...board.players]
	// 	};
	// 	boardStore.set(newBoard);
	// 	// socket.emit('update-board', { ...$boardStore }, gameId);
	// });

	// socket.on('update-board', async (board) => {
	// 	if (board.host === user.email) {
	// 		console.log('UPDATE-BOARD');
	// 		boardStore.set(board);

	// 		await fetch('/api/game', {
	// 			method: 'PUT',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify({ id: game.id, board: $boardStore })
	// 		});
	// 		socket.emit('updated-board', { ...$boardStore }, gameId);
	// 	}
	// });

	// socket.on('updated-board', (board) => {
	// 	if (board.host !== user.id) {
	// 		console.log('UPDATED-BOARD-BOARD');
	// 		console.log('socket.on ~ board:', board);
	// 		boardStore.set(board);

	// 		// socket.emit('updated-board', { ...$boardStore }, gameId);
	// 	}
	// });
</script>

<div>
	<!-- WHEN HOST -->
	<!-- {#if gameCreationStep === 'joined'}
		<button class="submit-button" type="button" on:click={onCreateBoard}>Add Players</button>
		<button class="submit-button" type="button" on:click={onCreateBoard}>Join Game</button>
	{/if} -->

	{JSON.stringify($boardStore)}

	{#if isEmpty($boardStore) === false}
		{#if !playerHasDeck}
			<DeckSelector />
		{/if}

		<div class="grid grid-rows-2 h-screen">
			<!-- {#each enemies as enemy}
				<EnemyBattlefield battlefieldCards={enemy.battlefield} />
			{/each} -->

			<BoardComponent />
		</div>

		<div class="absolute right-0 top-0 bg-white">
			{#each logs as message}
				<p>
					{message}
				</p>
			{/each}
		</div>
	{/if}

	<!-- <div class="absolute top-0 left-0 z-50">

		{JSON.stringify($boardStore)}

		<DeckSelector bind:deckId />
		{deckId}

		<button class="submit-button" type="button" on:click={onCreateBoard}>Setup BoardComponent</button>

		<button class="submit-button" type="button" on:click={onNextTurn}>Next Turn</button>

		{#each logs as message}
			<p>
				{message}
			</p>
		{/each}
	</div>





-->
</div>
