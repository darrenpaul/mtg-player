import { DECK_API } from '$lib/routesApi';

const BASE_URL = '/api/deck';

export const handleCreateDeck = async () => {
	const response = await fetch(BASE_URL, {
		method: 'POST',
		body: JSON.stringify({ name: 'New Deck' })
	});

	return await response.json();
};

export const handleUpdateDeck = async (deckId: string, payload: object) => {
	await fetch(BASE_URL, {
		method: 'PUT',
		body: JSON.stringify({ deckId, payload })
	});
};

export const handleGetDeck = async (deckId: string) => {
	const response = await fetch(DECK_API(deckId), {
		method: 'GET'
	});
	return await response.json();
};
