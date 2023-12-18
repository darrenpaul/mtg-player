export const load = async ({ fetch, params }) => {
	const deckSlug = params.slug;

	const response = await fetch(`/api/deck?slug=${deckSlug}`, {
		method: 'GET'
	});

	return await response.json();
};
