export const shuffleCards = (deck) => {
	return deck.sort(() => Math.random() - 0.5);
};
