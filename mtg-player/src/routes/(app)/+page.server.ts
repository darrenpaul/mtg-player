/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const response = await fetch(`/api/cards`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	return { cards: await response.json() };
}
