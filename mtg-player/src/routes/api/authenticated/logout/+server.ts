/** @type {import('./$types').RequestHandler} */
export const GET = async ({ locals: { pb } }) => {
	pb.authStore.clear();

	return new Response('Success...');
};
