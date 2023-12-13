import { DECK_CARDS_TABLE } from '$lib/server/constants/database';

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals }) => {
	const { deckId, cardId } = await request.json();

	const data = {
		deckId,
		cardId
	};

	const record = await locals.pb.collection(DECK_CARDS_TABLE).create(data);

	return new Response(JSON.stringify({ ...record }), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
