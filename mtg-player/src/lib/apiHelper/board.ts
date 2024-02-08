import { BOARD_API } from '$lib/routesApi';

export const handleUpdateBoard = async (id, players) => {
	await fetch(BOARD_API, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ id, players })
	});
};
