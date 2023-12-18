import type { User } from '$lib/types/user';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { pb } }) => {
	if (pb.authStore.isValid === false) {
		throw redirect(302, '/login');
	}

	const user: User = pb.authStore.baseModel;
	return { user };
};
