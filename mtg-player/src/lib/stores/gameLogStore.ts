import { get, writable } from 'svelte/store';
import { user as userStore } from '$lib/stores/userStore';
import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

export const gameLog = writable({});

export const saveActivity = async (action: string) => {
	const gameLogStore = get(gameLog);
	const user = get(userStore);

	const data = {
		player: user.username,
		action: action,
		time: new Date().toISOString()
	};

	const newActivityLog = [...gameLogStore.activity, data];

	const newLog = {
		...gameLogStore,
		activity: newActivityLog
	};

	gameLog.set(newLog);

	await fetch('/api/game-log', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			id: gameLogStore.id,
			activity: newActivityLog
		})
	});
};

export const handleFetchGameLog = async (gameId: string) => {
	const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

	const activityLog = await pb.collection('game_log').getFirstListItem(`game.id="${gameId}"`, {});
	gameLog.set(activityLog);
	return activityLog;
};
