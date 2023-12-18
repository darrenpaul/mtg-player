import type { CardGame } from './card';

export type BoardPlayer = {
	username: string;
	graveyard?: CardGame[];
	commandZone?: CardGame[];
	exile?: CardGame[];
	battlefield?: CardGame[];
	deck?: string;
};

export type Board = {
	players: BoardPlayer[];
};
