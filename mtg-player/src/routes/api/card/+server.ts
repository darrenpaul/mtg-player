import { CARDS_API } from '$lib/server/constants/api/scryfall';
import { CARDS_TABLE } from '$lib/server/constants/database';
import type { NewCard } from '$lib/types/card.js';

const getScryfallCard = async (name: string) => {
	const response = await fetch(`${CARDS_API}/named?exact=${name}`, {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'GET'
	});

	return await response.json();
};

const getKeywords = async (eventFetch, keywords: string[]) => {
	const keywordPromise = keywords.map((keyword: string) => {
		return eventFetch(`/api/keywords?name=${keyword}`, {
			method: 'GET'
		});
	});

	const keywordsResolved = await Promise.all(keywordPromise);
	const keywordData = await Promise.all(keywordsResolved.map((keyword) => keyword.json()));
	return keywordData.map((keyword) => keyword.id);
};

const prepareImages = (card) => {
	const images = [];

	if (card.card_faces) {
		const cardFaces = card.card_faces;
		cardFaces.forEach((face) => {
			if (face?.image_uris || face?.images) {
				images.push({
					small: face?.image_uris?.small || face?.images?.small,
					normal: face?.image_uris?.normal || face?.images?.normal,
					large: face?.image_uris?.large || face?.images?.normal
				});
			}
		});
	}

	if (card.image_uris || card.images) {
		images.push({
			small: card?.image_uris?.small || card?.images?.small,
			normal: card?.image_uris?.normal || card?.images?.normal,
			large: card?.image_uris?.large || card?.images?.normal
		});
	}

	return images;
};

const addCard = async (eventFetch, pb, card) => {
	try {
		const keywordIds = await getKeywords(eventFetch, card.keywords);

		const images = prepareImages(card);

		const layout = ['normal', 'adventure'].includes(card.layout) ? 'normal' : 'flip';

		const data: NewCard = {
			name: card.name,
			power: card.power,
			toughness: card.toughness,
			typeLine: card?.type_line,
			oracleText: card.oracle_text,
			images: images,
			manaCost: card.mana_cost,
			keywords: keywordIds,
			scryfallId: card.id,
			layout: layout
		};

		return await pb.collection(CARDS_TABLE).create(data);
	} catch (error) {
		console.log('Error adding card to database');
		console.error(error);
		console.log(card.name);
	}
};

const getCardFromLocalDb = async (pb, name) => {
	const records = await pb.collection(CARDS_TABLE).getList(1, 50, {
		filter: `name = "${name}"`
	});

	if (records.totalItems === 0) {
		return null;
	}
	return records.items[0];
};

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url, fetch: eventFetch, locals: { pb } }) => {
	const name = url.searchParams.get('name');

	if (!name) {
		return new Response(JSON.stringify({ error: 'No name provided' }), {
			status: 400
		});
	}

	const card = await getCardFromLocalDb(pb, name);
	console.log('GET ~ card:', card);

	if (!card) {
		const scryfallCard = await getScryfallCard(name);

		const newCard = await addCard(eventFetch, pb, scryfallCard);

		return new Response(JSON.stringify(newCard));
	}

	return new Response(JSON.stringify(card));
};
