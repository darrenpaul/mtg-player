import { redirect } from '@sveltejs/kit';

export const load = async ({ params, fetch, locals: { pb } }) => {
	if (pb.authStore.isValid === false) {
		throw redirect(302, '/login');
	}

	const user = pb.authStore.baseModel;

	const response = await fetch(`/api/game?name=${params.slug}`);

	try {
		const game = await response.json();
		return { user, game };
	} catch (error) {
		return { user };
	}
};
