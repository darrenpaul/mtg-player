import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { pb } }) => {
	if (pb.authStore.isValid === true) {
		throw redirect(302, '/dashboard');
	}
};
