import { get, writable } from 'svelte/store';
import { game as gameStore } from '$lib/stores/gameStore';

const localStorageKey = 'cardsInHand';

export const hand = writable([]);

export const clearHand = () => {
	const game = get(gameStore);
	localStorage.removeItem(`${localStorageKey}-${game.id}`);
	hand.set([]);
};
