<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Board from '$lib/components/board/+Board.svelte';
	import DeckSelector from '$lib/components/deckSelector/+DeckSelector.svelte';
	import { io } from 'socket.io-client';
	import { getContext, onMount, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { isEqual, isEmpty } from 'lodash-es';
	import EnemyBattlefield from '$lib/components/game/battlefield/+EnemyBattlefield.svelte';
	import AddUserForm from '$lib/components/addPlayerForm/+AddPlayerForm.svelte';
	import CreateGameForm from '$lib/components/createGameForm/+CreateGameForm.svelte';

	const socket = io('http://localhost:3000');

	export let data;
	let user = data.user;
	let game = data?.game;
	let gameId = $page.params.slug;
	let logs: Array<string> = [];
	let enemies = [];
	let playerHasDeck: boolean;

	let gameCreationStep = 'joined';

	const cardsInHandStore = writable([]);
	const socketStore = writable();
	const boardStore = writable({});
	const userStore = writable({});

	if (browser) {
		setContext('cardsInHandStore', cardsInHandStore);
		setContext('socketStore', socketStore);
		setContext('boardStore', boardStore);
		setContext('userStore', userStore);
		socketStore.set(socket);
		userStore.set(user);
	}

	onMount(() => {
		if (data.game) {
			console.log(data.game);
			boardStore.set(data.game.board);
			gameCreationStep = 'create-board';
			socket.emit('join-game', gameId, (message) => {
				logs = [...logs, JSON.stringify(message)];
			});
		} else {
			joinGame();
		}
	});

	$: enemies = $boardStore?.players?.filter((player) => player.email !== user.email) || [];
	$: playerHasDeck = $boardStore?.players?.find((player) => player.email === user.email)?.deck;

	const joinGame = () => {
		socket.emit('join-game', gameId, (message) => {
			logs = [...logs, JSON.stringify(message)];
		});
		socket.emit('get-board-state', gameId);
	};

	const onCreateGame = async () => {
		await fetch('/api/game', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ hostId: user.id, name: gameId, board: $boardStore })
		});
	};

	const onBoardStateChanged = () => {
		console.log('onBoardStateChanged ~ board:');
	};

	socket.on('get-board-state', () => {
		console.log('GET-BOARD-STATE');
		if ($boardStore && $boardStore.host === user.email) {
			socket.emit('push-board-state', { ...$boardStore }, gameId);
		}
	});

	socket.on('pull-board-state', (board) => {
		console.log('PULL-BOARD-STATE');

		if (isEmpty($boardStore) === false) {
			boardStore.set(board);
			return;
		}

		const newBoard = {
			...board,
			players: [...board.players]
		};
		boardStore.set(newBoard);
		// socket.emit('update-board', { ...$boardStore }, gameId);
	});

	socket.on('update-board', async (board) => {
		if (board.host === user.email) {
			console.log('UPDATE-BOARD');
			boardStore.set(board);

			await fetch('/api/game', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id: game.id, board: $boardStore })
			});
			socket.emit('updated-board', { ...$boardStore }, gameId);
		}
	});

	socket.on('updated-board', (board) => {
		if (board.host !== user.id) {
			console.log('UPDATED-BOARD-BOARD');
			console.log('socket.on ~ board:', board);
			boardStore.set(board);

			// socket.emit('updated-board', { ...$boardStore }, gameId);
		}
	});
</script>

<div>
	<!-- WHEN HOST -->
	<!-- {#if gameCreationStep === 'joined'}
		<button class="submit-button" type="button" on:click={onCreateBoard}>Add Players</button>
		<button class="submit-button" type="button" on:click={onCreateBoard}>Join Game</button>
	{/if} -->

	{#if !$boardStore}
		<CreateGameForm />

		<button class="submit-button" type="button" on:click={onCreateGame}>Create Game</button>
	{/if}

	{#if !playerHasDeck}
		<DeckSelector />
	{/if}

	{#if isEmpty($boardStore) === false}
		{#if $boardStore?.players?.length > 0}
			{#each enemies as enemy}
				<EnemyBattlefield battlefieldCards={enemy.battlefield} />
			{/each}
		{/if}

		<Board />

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

		<button class="submit-button" type="button" on:click={onCreateBoard}>Setup Board</button>

		<button class="submit-button" type="button" on:click={onNextTurn}>Next Turn</button>

		{#each logs as message}
			<p>
				{message}
			</p>
		{/each}
	</div>





-->
</div>
