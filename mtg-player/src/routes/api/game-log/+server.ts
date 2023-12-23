import { GAME_LOGS_TABLE } from '$lib/server/constants/database';

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals: { pb } }) => {
	const { game, activity } = await request.json();

	const data = {
		game,
		activity
	};

	const record = await pb.collection(GAME_LOGS_TABLE).create(data);

	return new Response(JSON.stringify(record), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

/** @type {import('./$types').RequestHandler} */
export const PUT = async ({ request, locals: { pb } }) => {
	const { id, activity } = await request.json();

	const data = {
		activity
	};

	const record = await pb.collection(GAME_LOGS_TABLE).update(id, data);

	return new Response(JSON.stringify(record), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
