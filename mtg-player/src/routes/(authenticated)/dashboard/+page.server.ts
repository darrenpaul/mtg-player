import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch }) => {
	const response = await fetch('/api/deck', {
		method: 'GET'
	});

	const decks = await response.json();
	return { decks };
};
