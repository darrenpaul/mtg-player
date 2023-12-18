import type { User } from '$lib/types/user';
import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch, locals: { pb } }) => {
	if (pb.authStore.isValid === false) {
		throw redirect(302, '/login');
	}

	const response = await fetch('/api/deck', {
		method: 'GET'
	});

	const { items: decks } = await response.json();

	const user: User = pb.authStore.baseModel;
	return { user, decks };
};
