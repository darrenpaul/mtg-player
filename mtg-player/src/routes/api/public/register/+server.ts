/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals: { pb } }) => {
	const { username, email, password } = await request.json();

	const data = {
		username,
		name: username,
		email,
		emailVisibility: true,
		password: password,
		passwordConfirm: password
	};

	const record = await pb.collection('users').create(data);

	return new Response(JSON.stringify({ id: record.id, username: record.username }), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
