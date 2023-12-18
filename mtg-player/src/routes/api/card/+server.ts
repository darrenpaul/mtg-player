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
	const id = url.searchParams.get('id');
	const record = await pb.collection(CARDS_TABLE).getOne(id, {});

	return new Response(JSON.stringify(record));
};
