import { KEYWORDS_TABLE } from '$lib/server/constants/database';

const addKeyword = async (pb, keyword) => {
	const data = {
		name: keyword
	};

	return await pb.collection(KEYWORDS_TABLE).create(data);
};

const getKeywordFromLocalDb = async (pb, name) => {
	const records = await pb.collection(KEYWORDS_TABLE).getList(1, 50, {
		filter: `name = "${name}"`
	});

	if (records.totalItems === 0) {
		return null;
	}
	return records.items[0];
};

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url, locals: { pb } }) => {
	const name = url.searchParams.get('name');
	const keyword = await getKeywordFromLocalDb(pb, name);

	if (keyword === null) {
		const newKeyword = await addKeyword(pb, name);
		return new Response(JSON.stringify(newKeyword));
	}

	return new Response(JSON.stringify(keyword));
};
