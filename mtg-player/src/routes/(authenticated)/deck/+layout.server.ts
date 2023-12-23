import { DECKS_API } from '$lib/routesApi';
import type { User } from '$lib/types/user';
import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch, locals: { pb } }) => {
	if (pb.authStore.isValid === false) {
		throw redirect(302, '/login');
	}

	const user: User = pb.authStore.baseModel;

	const response = await fetch(DECKS_API, {
		method: 'GET'
	});

	const decks = await response.json();
	return { decks, user };
};
