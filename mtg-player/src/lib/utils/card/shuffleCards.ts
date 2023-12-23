import { shuffle } from 'lodash-es';

export const shuffleCards = (cards) => {
	const shuffledCards = shuffle([...cards]);

	const groupedCards = Array.from({ length: 10 }, () => shuffledCards.splice(0, 10));

	const shuffledGroups = shuffle(groupedCards);

	const finalShuffledCards = shuffledGroups.map((group) => shuffle(group)).flat();

	return finalShuffledCards;
};
