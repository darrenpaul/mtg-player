import { GAMES_TABLE } from '$lib/server/constants/database';

type PB_Game = {
	board: object;
	collectionId: string;
	collectionName: string;
	counter: string;
	created: string;
	host: string;
	id: string;
	name: string;
	players: any[];
	updated: string;
};

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ locals: { pb } }) => {
	const results = await pb.collection(GAMES_TABLE).getList(1, 50, {});

	const games = results.items.map((game: PB_Game) => {
		return {
			board: game.board,
			created: game.created,
			host: game.host,
			id: game.id,
			name: game.name,
			players: game.players,
			updated: game.updated
		};
	});

	return new Response(JSON.stringify(games), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
