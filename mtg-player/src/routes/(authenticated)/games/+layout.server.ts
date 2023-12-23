import { DECKS_API, GAMES_API } from '$lib/routesApi';
import type { User } from '$lib/types/user';
import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch, locals: { pb } }) => {
	if (pb.authStore.isValid === false) {
		throw redirect(302, '/login');
	}

	const user: User = pb.authStore.baseModel;

	const decksResponse = await fetch(DECKS_API, {
		method: 'GET'
	});
	const decks = await decksResponse.json();

	const gamesResponse = await fetch(GAMES_API, {
		method: 'GET'
	});
	const games = await gamesResponse.json();

	return { decks, user, games };
};
