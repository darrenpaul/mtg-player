import { BOARDS_TABLE, GAMES_TABLE, GAME_LOGS_TABLE } from '$lib/server/constants/database';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url, locals: { pb } }) => {
	const id = url.searchParams.get('id');

	const record = await pb.collection(GAMES_TABLE).getOne(id, {
		expand: 'relField1,relField2.subRelField'
	});

	return new Response(JSON.stringify(record), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals: { pb } }) => {
	try {
		const { name, host, players, board } = await request.json();

		const data = {
			name,
			host,
			players
		};

		const game = await pb.collection(GAMES_TABLE).create(data);

		const gameActivityData = {
			game: game.id,
			activity: []
		};

		await pb.collection(GAME_LOGS_TABLE).create(gameActivityData);

		const boardData = {
			game: game.id,
			players: board
		};

		await pb.collection(BOARDS_TABLE).create(boardData);

		return new Response(JSON.stringify(game), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		console.log(error);
	}
};

/** @type {import('./$types').RequestHandler} */
export const PUT = async ({ request, locals: { pb } }) => {
	const { id, board } = await request.json();

	const data = {
		board
	};

	const record = await pb.collection(GAMES_TABLE).update(id, data);

	return new Response(JSON.stringify(record), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
