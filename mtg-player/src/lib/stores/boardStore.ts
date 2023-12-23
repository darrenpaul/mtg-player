import { get, writable } from 'svelte/store';
import { user as userStore } from '$lib/stores/userStore';
import { isEmpty } from 'lodash-es';

export const board = writable({});

export const getCurrentPlayer = () => {
	const user = get(userStore);

	const boardStore = get(board);

	if (isEmpty(boardStore)) return;

	return boardStore.players.find((player) => {
		return player.username === user.username;
	});
};
