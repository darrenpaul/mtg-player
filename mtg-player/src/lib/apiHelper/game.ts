import type { Player } from '$lib/components/addPlayerForm/types';
import { GAME_API } from '$lib/routesApi';

type GamePayload = {
	host: string;
	name: string;
	players: string[];
	board: {
		players: Player[];
	};
};

export const handleCreateGame = async (payload: GamePayload) => {
	const response = await fetch(GAME_API, {
		method: 'POST',
		body: JSON.stringify(payload)
	});

	return await response.json();
};
