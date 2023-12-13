import { DECKS_TABLE, DECK_CARDS_TABLE } from '$lib/server/constants/database';

const getDeckCards = async (pb, deckId) => {
	const cards = await pb.collection(DECK_CARDS_TABLE).getFullList({
		filter: `deckId = "${deckId}"`,
		expand: ['cardId']
	});

	return cards;
};

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url, locals: { pb } }) => {
	const deckSlug = url.searchParams.get('slug');

	if (deckSlug) {
		const deck = await pb.collection(DECKS_TABLE).getOne(deckSlug);
		const cards = await getDeckCards(pb, deck.id);
		return new Response(JSON.stringify({ deck, cards }), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	const userDecks = await pb.collection(DECKS_TABLE).getList(1, 50, {});
	return new Response(JSON.stringify(userDecks), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals }) => {
	const { name } = await request.json();

	const data = {
		userId: locals.pb.authStore.model.id,
		name
	};

	const record = await locals.pb.collection(DECKS_TABLE).create(data);

	return new Response(JSON.stringify({ ...record }), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
