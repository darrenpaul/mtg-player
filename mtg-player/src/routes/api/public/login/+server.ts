import { USERS_TABLE } from '$lib/server/constants/database.js';

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals: { pb } }) => {
	const { email, password } = await request.json();

	const authData = await pb.collection(USERS_TABLE).authWithPassword(email, password);

	return new Response(
		JSON.stringify({
			id: authData.record.id,
			username: authData.record.username,
			token: authData.token
		}),
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
};
