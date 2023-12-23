import { DECKS_TABLE } from '$lib/server/constants/database';

type PB_DECK = {
	collectionId: string;
	collectionName: string;
	created: string;
	id: string;
	name: string;
	updated: string;
	userId: string;
};

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ locals: { pb } }) => {
	const result = await pb.collection(DECKS_TABLE).getList(1, 50, {});

	const decks = result.items.map((deck: PB_DECK) => {
		return {
			id: deck.id,
			name: deck.name,
			created: deck.created,
			updated: deck.updated
		};
	});

	return new Response(JSON.stringify(decks), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
