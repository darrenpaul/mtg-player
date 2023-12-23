import { TOKENS_TABLE } from '$lib/server/constants/database';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ locals: { pb } }) => {
	const records = await pb.collection(TOKENS_TABLE).getFullList({
		sort: '+name'
	});

	return new Response(JSON.stringify({ tokens: records }));
};

// const prepareImages = (card) => {
// 	const images = [];

// 	if (card.card_faces) {
// 		const cardFaces = card.card_faces;
// 		cardFaces.forEach((face) => {
// 			if (face?.image_uris || face?.images) {
// 				images.push({
// 					small: face?.image_uris?.small || face?.images?.small,
// 					normal: face?.image_uris?.normal || face?.images?.normal,
// 					large: face?.image_uris?.large || face?.images?.normal
// 				});
// 			}
// 		});
// 	}

// 	if (card.image_uris || card.images) {
// 		images.push({
// 			small: card?.image_uris?.small || card?.images?.small,
// 			normal: card?.image_uris?.normal || card?.images?.normal,
// 			large: card?.image_uris?.large || card?.images?.normal
// 		});
// 	}

// 	return images;
// };

// export const GET = async ({ fetch: eventFetch, locals: { pb } }) => {
// 	const response = await fetch(
// 		'https://api.scryfall.com/cards/search?order=cmc&q=type%3Atoken+%28game%3Apaper%29&unique=cards',
// 		{
// 			headers: {
// 				'Content-Type': 'application/json'
// 			},
// 			method: 'GET'
// 		}
// 	);

// 	const tokensData = await response.json();

// 	const tokenPromises = tokensData.data.map(async (token) => {
// 		try {
// 			const keywordPromise = token.keywords.map((keyword: string) => {
// 				return eventFetch(`/api/keywords?name=${keyword}`, {
// 					method: 'GET'
// 				});
// 			});
// 			const keywords = await Promise.all(keywordPromise);
// 			const keywordData = await Promise.all(keywords.map((keyword) => keyword.json()));
// 			const keywordIds = keywordData.map((keyword) => keyword.id);

// 			const images = prepareImages(token);

// 			const layout = ['normal', 'adventure'].includes(token.layout) ? 'normal' : 'flip';

// 			const data: NewCard = {
// 				name: token.name,
// 				power: token.power,
// 				toughness: token.toughness,
// 				typeLine: token?.type_line,
// 				oracleText: token.oracle_text,
// 				images: images,
// 				manaCost: token.mana_cost,
// 				keywords: keywordIds,
// 				scryfallId: token.id,
// 				layout: layout
// 			};

// 			return data;
// 		} catch (error) {
// 			console.log('Error adding TOKEN to database');
// 			console.error(error);
// 			console.log(token.name);
// 		}
// 	});

// 	const tokens = await Promise.all(tokenPromises);
// 	const filteredTokens = tokens.filter((token) => token !== null);

// 	for (const token of filteredTokens) {
// 		await pb.collection(TOKENS_TABLE).create(token);
// 	}

// 	return new Response(JSON.stringify(filteredTokens));
// };
