import { get } from 'svelte/store';
import { game as gameStore } from '$lib/stores/gameStore';
import { board as boardStore, getCurrentPlayer } from '$lib/stores/boardStore';
import { hand as handStore } from '$lib/stores/handStore';
import { user as userStore } from '$lib/stores/userStore';
import { library as libraryStore, peekIndex as peekIndexStore } from '$lib/stores/libraryStore';
import {
	BATTLEFIELD,
	HAND,
	COMMAND_ZONE,
	GRAVEYARD,
	LIBRARY,
	EXILE,
	TOKEN_MODAL
} from '$lib/constants/cardZones';
import { updateCurrentPlayer } from '$lib/utils/game/player';
import { saveCardsInHand } from '$lib/utils/game/hand';

export default async (x, y, Operation, DataOffered, DroppableExtras, DropZoneExtras) => {
	const { card, from } = DroppableExtras;
	const { to } = DropZoneExtras;

	if (from === TOKEN_MODAL) {
		const timestamp = new Date().getTime();
		card.id = `${card.id}-${timestamp}`;
	}

	if (from === LIBRARY) {
		fromLibrary({ droppedCard: card });
	}

	if (from === BATTLEFIELD) {
		card.tapped = false;
		fromBattlefield({ droppedCard: card });
	}

	if (from === HAND) {
		fromHand({ droppedCard: card });
	}

	if (from === COMMAND_ZONE) {
		fromCardZone({ droppedCard: card, zone: COMMAND_ZONE });
	}

	if (from === GRAVEYARD) {
		fromCardZone({ droppedCard: card, zone: GRAVEYARD });
	}

	if (!card.token) {
		if (from === GRAVEYARD) {
			fromCardZone({ droppedCard: card, zone: GRAVEYARD });
		}

		if (to === HAND) {
			toHand({ droppedCard: card });
		}

		if (to === COMMAND_ZONE) {
			toCardZone({ droppedCard: card, zone: COMMAND_ZONE });
		}

		if (to === GRAVEYARD) {
			toCardZone({ droppedCard: card, zone: GRAVEYARD });
		}

		if (to === EXILE) {
			toCardZone({ droppedCard: card, zone: EXILE });
		}

		if (to === LIBRARY) {
			toLibrary({
				droppedCard: card,
				insertPosition: DropZoneExtras.insertPosition,
				insertIndex: DropZoneExtras.insertIndex
			});
		}
	}

	if (to === BATTLEFIELD) {
		toBattlefield({ droppedCard: card, position: { x, y } });
	}

	if (from === BATTLEFIELD && to === BATTLEFIELD) return;

	const board = get(boardStore);
	const game = get(gameStore);
	await fetch('/api/game', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ id: game.id, board: board })
	});
};

const fromLibrary = ({ droppedCard }) => {
	const libraryCards = get(libraryStore);
	const newLibraryCards = libraryCards.filter((card) => card.id !== droppedCard.id);
	libraryStore.set(newLibraryCards);
	const peekIndex = get(peekIndexStore);
	if (peekIndex - 1 >= 0) {
		peekIndexStore.set(peekIndex - 1);
	}
};

const fromBattlefield = ({ droppedCard }) => {
	const user = get(userStore);
	const board = get(boardStore);
	const player = getCurrentPlayer();
	const battlefield: Array<any> = player.battlefield;

	const newBattlefield = battlefield.filter((card) => card.id !== droppedCard.id);

	const newPlayerState = updateCurrentPlayer(board.players, user.username, {
		battlefield: newBattlefield
	});

	boardStore.set({ ...board, players: newPlayerState });
};

const fromCardZone = ({ droppedCard, zone }) => {
	const user = get(userStore);
	const board = get(boardStore);
	const player = getCurrentPlayer();
	const cards: Array<any> = player[zone];

	const newCards = cards.filter((card) => card.id !== droppedCard.id);

	const newPlayerState = updateCurrentPlayer(board.players, user.username, {
		[zone]: newCards
	});

	boardStore.set({ ...board, players: newPlayerState });
};

const fromHand = ({ droppedCard }) => {
	const game = get(gameStore);
	const hand = get(handStore);

	const filteredCardsInHand = hand.filter((card) => card.id !== droppedCard.id);
	handStore.set(filteredCardsInHand);
	saveCardsInHand(game.id, filteredCardsInHand);
};

const toHand = ({ droppedCard }) => {
	const game = get(gameStore);
	const hand = get(handStore);

	const cards = [...hand, droppedCard];
	handStore.set(cards);
	saveCardsInHand(game.id, cards);
};

const toBattlefield = ({ droppedCard, position }) => {
	const user = get(userStore);
	const board = get(boardStore);
	const player = getCurrentPlayer();
	const battlefield: Array<any> = player.battlefield;
	if (!droppedCard.x) {
		droppedCard.x = position.x;
	}
	if (!droppedCard.y) {
		droppedCard.y = position.y;
	}

	const newBattlefield = [
		...battlefield,
		{
			...droppedCard
		}
	];

	const newPlayerState = updateCurrentPlayer(board.players, user.username, {
		battlefield: newBattlefield
	});

	boardStore.set({ ...board, players: newPlayerState });
};

const toCardZone = ({ droppedCard, zone }) => {
	const user = get(userStore);
	const board = get(boardStore);
	const player = getCurrentPlayer();
	const cards: Array<any> = player[zone];

	const newCards = [
		...cards,
		{
			...droppedCard
		}
	];

	const newPlayerState = updateCurrentPlayer(board.players, user.username, {
		[zone]: newCards
	});

	boardStore.set({ ...board, players: newPlayerState });
};

const toLibrary = ({ droppedCard, insertPosition, insertIndex }) => {
	const insertIndexNumber = parseInt(insertIndex);
	let newLibraryCards = [...get(libraryStore)];
	newLibraryCards.splice(insertIndexNumber, 0, droppedCard);
	libraryStore.set(newLibraryCards);
};
