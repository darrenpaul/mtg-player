import { GAMES_TABLE } from '$lib/server/constants/database';

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
	const { name, host, board } = await request.json();

	const data = {
		name,
		host,
		board
	};

	const record = await pb.collection(GAMES_TABLE).create(data);

	return new Response(JSON.stringify(record), {
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
