import type { Board } from './board';

export type Game = {
	board: Board;
	created: string;
	host: string;
	id: string;
	name: string;
	players: string[];
	updated: string;
};
