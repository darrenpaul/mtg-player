import { DECK_CARDS_TABLE } from '$lib/server/constants/database';

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals: { pb } }) => {
	const { deck, card, tag } = await request.json();

	const data = {
		deck,
		card,
		tag
	};

	const record = await pb.collection(DECK_CARDS_TABLE).create(data, { expand: ['card'] });

	const deckCard = {
		id: record.id,
		cardId: record.expand.card.id,
		deck: record.deck,
		images: record.expand.card.images,
		layout: record.expand.card.layout,
		name: record.expand.card.name,
		tag: record.tag
	};

	return new Response(JSON.stringify({ ...deckCard }), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

/** @type {import('./$types').RequestHandler} */
export const PUT = async ({ request, locals: { pb } }) => {
	const { cardId, payload } = await request.json();

	const data = {
		...payload
	};

	await pb.collection(DECK_CARDS_TABLE).update(cardId, data);

	return new Response('Success');
};

/** @type {import('./$types').RequestHandler} */
export const DELETE = async ({ request, locals: { pb } }) => {
	const { card } = await request.json();

	await pb.collection(DECK_CARDS_TABLE).delete(card);

	return new Response('Success');
};
