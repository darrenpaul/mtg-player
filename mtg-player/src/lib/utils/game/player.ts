import type { BoardPlayer } from '$lib/types/board';

// export const getCurrentPlayer = (players: BoardPlayer[], username: string) => {
// 	return players.find((player) => {
// 		return player.username === username;
// 	});
// };

type Data = {
	[key: string]: any;
};

export const updateCurrentPlayer = (players: BoardPlayer[], username: string, data: Data) => {
	return players.map((player) => {
		if (player.username === username) {
			return {
				...player,
				...data
			};
		}
		return player;
	});
};
