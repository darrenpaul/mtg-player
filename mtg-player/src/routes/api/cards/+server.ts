import { CARDS_API } from '$lib/server/constants/api/scryfall';
import { CARDS_TABLE } from '$lib/server/constants/database';

const addCard = async (pb, card) => {
	const images = {
		small: card.image_uris.small,
		normal: card.image_uris.normal,
		large: card.image_uris.large
	};

	const data = {
		name: card.name,
		power: card.power,
		toughness: card.toughness,
		typeLine: card.type_line,
		oracleText: card.oracle_text,
		images: images,
		manaCost: card.mana_cost,
		keywords: card.keywords,
		scryfallId: card.id
	};

	try {
		return await pb.collection(CARDS_TABLE).create(data);
	} catch (error) {
		console.log('Error adding card to database');
		console.log(data);
		console.error(error);
	}
};

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url, locals: { pb } }) => {
	const name = url.searchParams.get('name');
	const records = await pb.collection(CARDS_TABLE).getList(1, 50, {
		filter: `name = "${name}"`
	});

	if (records.totalItems === 0) {
		const response = await fetch(`${CARDS_API}/named?fuzzy=${name}`, {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'GET'
		});

		if (!response.ok) {
			return new Response(JSON.stringify({ error: 'Error fetching card' }), {
				status: response.status,
				statusText: response.statusText
			});
		}

		const jsonData = await response.json();
		const newAddedCards = await addCard(pb, jsonData);
		if (!newAddedCards) {
			return new Response(JSON.stringify({ error: 'Error adding card to database' }), {
				status: 500
			});
		}
		return new Response(JSON.stringify([newAddedCards]));
	}

	return new Response(JSON.stringify(records.items));
};
