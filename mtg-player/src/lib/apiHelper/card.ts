const BASE_URL = '/api/card';

export const handleGetCard = async (cardName: string) => {
	const response = await fetch(`${BASE_URL}?name=${cardName}`, {
		method: 'GET'
	});

	return await response.json();
};
