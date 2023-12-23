import { DECKS_TABLE, DECK_CARDS_TABLE } from '$lib/server/constants/database';

const getDeckCards = async (pb, deckId) => {
	const cards = await pb.collection(DECK_CARDS_TABLE).getFullList({
		filter: `deck = "${deckId}"`,
		expand: ['card']
	});

	return cards.map((card) => {
		return {
			id: card.id,
			cardId: card.expand.card.id,
			deck: card.deck,
			images: card.expand.card.images,
			layout: card.expand.card.layout,
			name: card.expand.card.name,
			tag: card.tag
		};
	});
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
export const POST = async ({ request, locals: { pb } }) => {
	const { name } = await request.json();

	const data = {
		userId: pb.authStore.model.id,
		name: name
	};

	const record = await pb.collection(DECKS_TABLE).create(data);

	return new Response(JSON.stringify({ ...record }), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

/** @type {import('./$types').RequestHandler} */
export const PUT = async ({ request, locals: { pb } }) => {
	const { deckId, payload } = await request.json();

	const data = {
		...payload
	};

	await pb.collection(DECKS_TABLE).update(deckId, data);

	return new Response('Success');
};
