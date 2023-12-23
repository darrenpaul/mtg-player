import { DECK_API } from '$lib/routesApi.js';

export const load = async ({ fetch, params }) => {
	const id = params.id;

	const response = await fetch(DECK_API(id), {
		method: 'GET'
	});

	return await response.json();
};
