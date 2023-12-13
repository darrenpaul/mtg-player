import { DECKS_TABLE } from '$lib/server/constants/database';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ locals: { pb } }) => {
	const userDecks = await pb.collection(DECKS_TABLE).getList(1, 50, {});

	return new Response(JSON.stringify(userDecks), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
