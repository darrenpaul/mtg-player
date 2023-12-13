import { GAMES_TABLE } from '$lib/server/constants/database';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url, locals: { pb } }) => {
	const gameName = url.searchParams.get('name');

	const resultList = await pb.collection(GAMES_TABLE).getList(1, 50, {
		filter: `name = "${gameName}"`
	});

	if (resultList.length === 0) {
		return new Response(JSON.stringify({}), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	return new Response(JSON.stringify(resultList.items[0]), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals: { pb } }) => {
	const { name, hostId, board } = await request.json();

	const data = {
		name,
		hostId,
		board
	};

	const record = await pb.collection(GAMES_TABLE).create(data);

	return new Response(JSON.stringify({}), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
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
