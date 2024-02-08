const BASE_URL = '/api/deck-cards';

export const handleAddDeckCard = async ({ deck, card, tag }) => {
	console.log('handleAddDeckCard ~ tag:', tag);
	console.log('handleAddDeckCard ~ card:', card);
	console.log('handleAddDeckCard ~ deck:', deck);
	const response = await fetch(BASE_URL, {
		method: 'POST',
		body: JSON.stringify({ deck, card, tag })
	});

	return await response.json();
};

export const handleUpdateDeckCard = async (cardId: string, payload: object) => {
	await fetch(BASE_URL, {
		method: 'PUT',
		body: JSON.stringify({ cardId, payload })
	});
};

export const handleRemoveDeckCard = async (card) => {
	await fetch(BASE_URL, {
		method: 'DELETE',
		body: JSON.stringify({ card: card.id })
	});
};
