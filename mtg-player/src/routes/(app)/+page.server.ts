/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const response = await fetch(`/api/card`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	return { cards: await response.json() };
}
