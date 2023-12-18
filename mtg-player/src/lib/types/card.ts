export type Card = {
	collectionId: string;
	collectionName: string;
	created: string;
	id: string;
	images: {
		large: string;
		normal: string;
		small: string;
	};
	keywords: string[];
	manaCost: string;
	name: string;
	oracleText: string;
	power: string;
	scryfallId: string;
	toughness: string;
	typeLine: string;
	updated: string;
};

export type CardGame = {
	id: string;
	cardId: string;
	name: string;
	imageUrl: string;
	tag: string;
};
