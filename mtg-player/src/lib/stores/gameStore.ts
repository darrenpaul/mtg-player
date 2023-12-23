import { writable } from 'svelte/store';
import { board as boardStore } from '$lib/stores/boardStore';
import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

export const game = writable({});

export const handleFetchGame = async (gameId: string) => {
	const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

	const gameData = await pb.collection('games').getOne(gameId, {});

	game.set(gameData);

	boardStore.set(gameData.board);

	return gameData;
};
