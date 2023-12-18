export const ssr = false;

import { redirect } from '@sveltejs/kit';

export const load = async ({ params, fetch, locals: { pb } }) => {
	if (pb.authStore.isValid === false) {
		throw redirect(302, '/login');
	}

	const user = pb.authStore.baseModel;

	const response = await fetch(`/api/game?id=${params.slug}`);

	try {
		const game = await response.json();
		return { user, game, authToken: pb.authStore.baseToken };
	} catch (error) {
		return { user };
	}
};
