import type { CardGame } from './card';

export type BoardPlayer = {
	username: string;
	health: number;
	commanderDamage: number;
	poisonCounters: number;
	graveyard: CardGame[];
	commandZone: CardGame[];
	exile: CardGame[];
	battlefield: CardGame[];
	deck: string;
	color: string;
};

export type Board = {
	players: BoardPlayer[];
};
