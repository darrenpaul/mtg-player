<script lang="ts">
	import { goto } from '$app/navigation';
	import { io } from 'socket.io-client';

	const socket = io('http://localhost:3000');

	let gameId = '123';
	let socketData;

	socket.on('next-turn', (message) => {
		socketData = message;
	});

	const onJoinGame = () => {
		goto(`/game/${gameId}`);
	};
</script>

<div>
	<h1>Game Lobby</h1>
	<input type="text" bind:value={gameId} />
	<button type="button" on:click={onJoinGame}>Join Game</button>
</div>
