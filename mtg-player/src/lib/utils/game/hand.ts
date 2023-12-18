import type { CardGame } from '$lib/types/card';

const localStorageKey = 'cardsInHand';

export const saveCardsInHand = (id: string, cards: CardGame[]) => {
	localStorage.setItem(`${localStorageKey}-${id}`, JSON.stringify(cards));
};

export const getSavedCardsInHand = (id: string) => {
	return JSON.parse(localStorage.getItem(`${localStorageKey}-${id}`));
};
