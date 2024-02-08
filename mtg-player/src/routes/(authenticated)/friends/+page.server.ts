import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { pb } }) => {
	if (pb.authStore.isValid === false) {
		throw redirect(302, '/login');
	}
	const records = await pb.collection('friends').getFullList({
		sort: '-created'
	});
};
