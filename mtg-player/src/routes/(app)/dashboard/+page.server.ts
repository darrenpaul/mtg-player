import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch, locals: { pb } }) => {
	if (pb.authStore.isValid === false) {
		throw redirect(302, '/login');
	}

	const response = await fetch('/api/deck', {
		method: 'GET'
	});

	const decks = await response.json();
	return { decks };
};
