const BASE_URL = '/api/decks';

export const handleGetDecks = async () => {
	const response = await fetch(`${BASE_URL}`, {
		method: 'GET'
	});

	return await response.json();
};
