export const ssr = false;

import { redirect } from '@sveltejs/kit';

export const load = async ({ params, fetch, locals: { pb } }) => {
	if (pb.authStore.isValid === false) {
		throw redirect(302, '/login');
	}

	const user = pb.authStore.baseModel;

	const response = await fetch(`/api/game?id=${params.slug}`);
	const creatureTokenResponse = await fetch('/api/tokens', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'GET'
	});

	const creatureTokenData = await creatureTokenResponse.json();
	const creatureTokens = creatureTokenData.tokens.map((card) => {
		const cardFaces = card.images.map((image) => image.normal);
		return {
			id: card.id,
			cardId: card.id,
			name: card.name,
			cardFaces: cardFaces,
			faceIndex: 0,
			layout: card.layout,
			token: true,
			tag: card.tag
		};
	});

	try {
		const game = await response.json();
		return { user, game, creatureTokens, authToken: pb.authStore.baseToken };
	} catch (error) {
		return { user };
	}
};
