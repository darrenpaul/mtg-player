import { get, writable } from 'svelte/store';
import { user as userStore } from '$lib/stores/userStore';

export const board = writable({});

export const getCurrentPlayer = () => {
	const user = get(userStore);
	const boardStore = get(board);
	return boardStore.players.find((player) => {
		return player.username === user.username;
	});
};
