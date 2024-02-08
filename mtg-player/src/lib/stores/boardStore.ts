import { get, writable } from 'svelte/store';
import { user as userStore } from '$lib/stores/userStore';
import { isEmpty } from 'lodash-es';
import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { BOARDS_TABLE, GAMES_TABLE } from '$lib/constants/database';

export const board = writable({});

export const getCurrentPlayer = () => {
	const user = get(userStore);

	const boardStore = get(board);

	if (isEmpty(boardStore)) return;

	return boardStore.players.find((player) => {
		return player.username === user.username;
	});
};

export const handleFetchBoard = async (gameId: string) => {
	const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

	const boardData = await pb.collection(BOARDS_TABLE).getFirstListItem(`game="${gameId}"`, {});

	board.set(boardData);

	return boardData;
};
