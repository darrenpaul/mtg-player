import { PB_ADMIN_PASSWORD, PB_ADMIN_USERNAME } from '$env/static/private';
import { error } from '@sveltejs/kit';

const friendExists = async (pb, friendUsername: string) => {
	const resultList = await pb.collection('friends').getList(1, 1, {
		filter: `friendUsername = "${friendUsername}"`
	});

	if (resultList.items.length > 0) {
		return true;
	}
	return false;
};

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals: { pb } }) => {
	const currentUserId = pb.authStore.baseModel.id;

	const currentUserToken = pb.authStore.baseToken;

	const { friendUsername } = await request.json();

	if ((await friendExists(pb, friendUsername)) === true) {
		throw error(409);
	}

	await pb.admins.authWithPassword(PB_ADMIN_USERNAME, PB_ADMIN_PASSWORD);

	const resultList = await pb.collection('users').getList(1, 1, {
		filter: `username = "${friendUsername}"`
	});

	pb.authStore.clear();
	pb.authStore.save(currentUserToken, null);

	if (resultList.items.length === 0) {
		throw error(404);
	}

	const friendRecord = resultList.items[0];

	const data = {
		user: currentUserId,
		friend: friendRecord.id,
		friendUsername
	};

	const record = await pb.collection('friends').create(data);

	return new Response(JSON.stringify({ ...record }), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ locals: { pb } }) => {
	const result = await pb.collection('friends').getFullList({
		sort: '-created'
	});
	console.log('result ~ result:', result);

	const friends = result.map((record) => {
		return {
			id: record.friend,
			username: record.friendUsername
		};
	});

	return new Response(JSON.stringify(friends), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
