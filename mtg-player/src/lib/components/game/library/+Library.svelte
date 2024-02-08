<script lang="ts">
	import type { BoardPlayer } from '$lib/types/board';
	import { shuffleCards } from '$lib/utils/card/shuffleCards';
	import { onMount } from 'svelte';
	import { trans } from '$lib/locales/translateCopy';
	import PeekModal from '$lib/components/game/modals/+PeekModal.svelte';
	import { getSavedCardsInHand, saveCardsInHand } from '$lib/utils/game/hand';
	import { page } from '$app/stores';
	import { getCurrentPlayer } from '$lib/stores/boardStore';
	import { hand as handStore, clearHand } from '$lib/stores/handStore';
	import { asDropZone } from 'svelte-drag-and-drop-actions';
	import { LIBRARY } from '$lib/constants/cardZones';
	import onDrop from '$lib/utils/game/onDrop';
	import { library as libraryStore } from '$lib/stores/libraryStore';
	import { game as gameStore } from '$lib/stores/gameStore';
	import { board as boardStore } from '$lib/stores/boardStore';
	import { updateCurrentPlayer } from '$lib/utils/game/player';
	import { user as userStore } from '$lib/stores/userStore';
	import { saveActivity } from '$lib/stores/gameLogStore';
	import type { CardGame } from '$lib/types/card';
	import LibraryDropModal from '$lib/components/game/modals/+LibraryDropModal.svelte';
	import CardZoneModal from '$lib/components/game/modals/+CardZoneModal.svelte';
	import CreatureTokenModal from '$lib/components/game/modals/+CreatureTokenModal.svelte';
	import { handleUpdateBoard } from '$lib/apiHelper/board';

	let originalLibrary: Array<any> = [];
	let player: BoardPlayer;
	let showPeekModal = false;
	let showContextMenu = false;
	let showLibraryDropModal = false;
	let showLibrarySearchModal = false;
	let showCreatureTokenModal = false;
	let libraryDropData = {};

	onMount(() => {
		player = getCurrentPlayer();
		onFetchDeck();
	});

	const onShuffle = () => {
		saveActivity('Shuffled Library');
		const cards = [...$libraryStore];
		const shuffledCards = shuffleCards(cards);
		libraryStore.set(shuffledCards);
	};

	const onFetchDeck = async () => {
		player = getCurrentPlayer();
		const deckId = player.deck;

		const response = await fetch(`/api/deck?slug=${deckId}`, {
			method: 'GET'
		});

		const jsonData = await response.json();

		let cards: CardGame[] = jsonData.cards.map((card) => {
			const cardFaces = card.images.map((image) => image.normal);
			return {
				id: card.id,
				cardId: card.cardId,
				name: card.name,
				cardFaces: cardFaces,
				faceIndex: 0,
				layout: card.layout,
				tag: card.tag
			} as CardGame;
		});

		originalLibrary = [...cards];

		const handFromStorage = getSavedCardsInHand($page.params.slug);
		if (handFromStorage) {
			handStore.set(handFromStorage);
		}

		const cardsToFilter = [
			...player.battlefield,
			...player.graveyard,
			...player.commandZone,
			...player.exile,
			...$handStore
		].map((card) => card.id);

		cards = cards.filter((card) => !cardsToFilter.includes(card.id));

		// SHUFFLE LIBRARY
		const shuffledCards = shuffleCards(cards);
		libraryStore.set(shuffledCards);
	};

	const onRightClick = () => {
		showContextMenu = true;
	};

	const onDrawCard = (event) => {
		if (event.target.id !== 'library') return;

		saveActivity('Drew Card');

		libraryStore.update((deck) => {
			const drawnCard = deck.shift();
			handStore.update((cardsInHand) => [...cardsInHand, drawnCard]);
			saveCardsInHand($page.params.slug, $handStore);
			return deck.filter((card) => card.id !== drawnCard.id);
		});
	};

	const onCreatureToken = () => {
		saveActivity('Opened Creature Tokens');
		showCreatureTokenModal = true;
	};

	const onPeekCard = () => {
		saveActivity('Opened Peek');
		showPeekModal = true;
	};

	const onLibrarySearch = () => {
		saveActivity('Searching for Card');
		showLibrarySearchModal = true;
	};

	const onMulligan = () => {
		saveActivity('Did Mulligan');
		clearHand();
		onFetchDeck();
	};

	const onReset = async () => {
		saveActivity('Reset Board');
		const commanders = originalLibrary.filter((card) => card.tag === 'commander');
		const newPlayerState = updateCurrentPlayer($boardStore.players, $userStore.username, {
			battlefield: [],
			exile: [],
			graveyard: [],
			commandZone: [...commanders]
		});

		boardStore.set({ ...$boardStore, players: newPlayerState });

		player = getCurrentPlayer();

		handleUpdateBoard($boardStore.id, $boardStore.players);

		clearHand();

		onFetchDeck();
	};

	const onLibraryDrop = (x, y, Operation, DataOffered, DroppableExtras, DropZoneExtras) => {
		libraryDropData = {
			x,
			y,
			Operation,
			DataOffered,
			DroppableExtras,
			DropZoneExtras
		};

		showLibraryDropModal = true;
	};

	const onLibraryDropSave = (event: Event) => {
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const { insertIndex, insertPosition } = Object.fromEntries(formData.entries());

		libraryDropData.DropZoneExtras = {
			...libraryDropData.DropZoneExtras,
			insertIndex,
			insertPosition
		};

		onDrop(
			libraryDropData.x,
			libraryDropData.y,
			libraryDropData.Operation,
			libraryDropData.DataOffered,
			libraryDropData.DroppableExtras,
			libraryDropData.DropZoneExtras
		);
	};
</script>

<PeekModal bind:show={showPeekModal} />

<CardZoneModal bind:show={showLibrarySearchModal} cards={$libraryStore} zone={LIBRARY} />

<LibraryDropModal bind:show={showLibraryDropModal} onSave={onLibraryDropSave} />

<CreatureTokenModal bind:show={showCreatureTokenModal} />

<button
	use:asDropZone={{
		Extras: { to: LIBRARY },
		TypesToAccept: { 'card/plain': 'all' },
		onDrop: onLibraryDrop
	}}
	id="library"
	class="library"
	type="button"
	on:click={onDrawCard}
	on:mouseleave={() => (showContextMenu = false)}
	on:contextmenu|preventDefault={onRightClick}
>
	<img
		src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/513b7bfa-42c9-4d08-ad6c-8e5d478c42d3/dalfpib-83f22b02-5802-40b4-901b-3eecf0ca2058.png/v1/fill/w_1024,h_1463,q_80,strp/unofficial_magic_the_gathering_six_color_card_back_by_lordnyriox_dalfpib-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQ2MyIsInBhdGgiOiJcL2ZcLzUxM2I3YmZhLTQyYzktNGQwOC1hZDZjLThlNWQ0NzhjNDJkM1wvZGFsZnBpYi04M2YyMmIwMi01ODAyLTQwYjQtOTAxYi0zZWVjZjBjYTIwNTgucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.OGsglye34mbde4lkXNsDFFCl83jSzl1zNBLep-hhyKY"
		alt="Library"
	/>

	<p class="library-size">{$libraryStore.length}</p>

	{#if showContextMenu}
		<div class="context-menu">
			<button class="context-menu-item" on:click={onDrawCard}>
				{trans('component.library.drawCard')}
			</button>

			<button class="context-menu-item" on:click={onCreatureToken}>
				{trans('component.library.creatureTokens')}
			</button>

			<button class="context-menu-item" on:click={onPeekCard}>
				{trans('component.library.peek')}
			</button>

			<button class="context-menu-item" on:click={onLibrarySearch}>
				{trans('component.library.search')}
			</button>

			<button class="context-menu-item" on:click={onShuffle}>
				{trans('component.library.shuffle')}
			</button>

			<button class="context-menu-item" on:click={onMulligan}>
				{trans('component.library.mulligan')}
			</button>

			<button class="context-menu-item" on:click={onReset}>
				{trans('component.library.reset')}
			</button>
		</div>
	{/if}
</button>

<style lang="postcss">
	.library {
		/* SIZE */
		/* MARGIN & PADDING */
		/* DISPLAY */
		@apply relative flex-shrink-0;
		/* ALIGNMENT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION */
		/* EFFECT */

		img {
			/* SIZE */
			@apply w-[146px] h-[204px];
			/* MARGIN & PADDING */
			/* DISPLAY */
			/* ALIGNMENT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION */
			/* EFFECT */
			@apply pointer-events-none;
		}

		.context-menu {
			/* SIZE */
			@apply w-full;
			/* MARGIN & PADDING */
			/* DISPLAY */
			@apply absolute top-0 left-0 flex flex-col z-50;
			/* ALIGNMENT */
			/* BORDERS */
			@apply bg-black text-white;
			/* COLORS */
			/* TEXT */
			@apply text-left;
			/* ANIMATION */
			/* EFFECT */
		}
	}

	.library-size {
		/* SIZE */
		/* MARGIN & PADDING */
		@apply p-2;
		/* DISPLAY */
		@apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10;
		/* ALIGNMENT */
		/* BORDERS */
		@apply rounded-full;
		/* COLORS */
		@apply bg-black text-white;
		/* TEXT */
		/* ANIMATION */
		/* EFFECT */
	}
</style>
