import { CARDS_API } from '$lib/server/constants/api/scryfall';
import { CARDS_TABLE } from '$lib/server/constants/database';

const addCard = async (locals, card) => {
	const images = {
		small: card.image_uris.small,
		normal: card.image_uris.normal,
		large: card.image_uris.large
	};

	const data = {
		name: card.name,
		power: card.power,
		toughness: card.toughness,
		type_line: card.type_line,
		oracle_text: card.oracle_text,
		images: images,
		mana_cost: card.colors,
		keywords: card.keywords,
		scryfall_id: card.id
	};

	try {
		return await locals.pb.collection(CARDS_TABLE).create(data);
	} catch (error) {
		console.log(data);
		console.error(error);
	}
};

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url, locals }) => {
	const name = url.searchParams.get('name');
	const records = await locals.pb.collection(CARDS_TABLE).getList(1, 50, {
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
		await addCard(locals, jsonData);
	}

	return new Response(JSON.stringify(records.items));
};
