<script lang="ts">
	import { browser } from '$app/environment';
	import type { BoardPlayer } from '$lib/types/board';
	import { shuffleCards } from '$lib/utils/card/shuffleCards';
	import { onMount } from 'svelte';
	import ContextMenu from '$lib/components/contextMenu/+ContextMenu.svelte';
	import { trans } from '$lib/locales/translateCopy';
	import PeekModal from '$lib/components/game/peekModal/+PeekModal.svelte';
	import { getSavedCardsInHand, saveCardsInHand } from '$lib/utils/game/hand';
	import { page } from '$app/stores';
	import { getCurrentPlayer } from '$lib/stores/boardStore';
	import { hand as handStore } from '$lib/stores/handStore';
	import { asDropZone } from 'svelte-drag-and-drop-actions';
	import { LIBRARY } from '$lib/constants/cardZones';
	import onDrop from '$lib/utils/game/onDrop';
	import { library as libraryStore } from '$lib/stores/libraryStore';

	let player: BoardPlayer;
	let showPeekModal = false;
	let contextMenuPosition = { x: 0, y: 0 };
	let contextMenuSize = { h: 0, y: 0 };
	let showContextMenu = false;

	onMount(() => {
		player = getCurrentPlayer();
		onFetchDeck();
	});

	const onShuffle = () => {
		const cards = [...$libraryStore];
		const shuffledCards = shuffleCards(cards);
		libraryStore.set(shuffledCards);
	};

	const onFetchDeck = async () => {
		const deckId = player.deck;

		const response = await fetch(`/api/deck?slug=${deckId}`, {
			method: 'GET'
		});

		const jsonData = await response.json();

		let cards = jsonData.cards.map((card) => {
			return {
				id: card.id,
				cardId: card.expand.card.id,
				name: card.expand.card.name,
				imageUrl: card.expand.card.images.normal,
				tag: card.tag
			};
		});

		// FILTER OUT COMMANDERS FROM DECK
		if (player.commandZone.length > 0) {
			player.commandZone.forEach((element) => {
				cards = cards.filter((card) => card.id !== element);
			});
		}

		// FILTER OUT GRAVEYARD FROM DECK
		player.graveyard.forEach((element) => {
			cards = cards.filter((card) => card.id !== element);
		});

		const handFromStorage = getSavedCardsInHand($page.params.slug);
		if (handFromStorage) {
			handStore.set(handFromStorage);
			// FILTER OUT HAND FROM DECK
			handFromStorage.forEach((element) => {
				cards = cards.filter((card) => card.id !== element);
			});
		}

		// SHUFFLE LIBRARY
		const shuffledCards = shuffleCards(cards);
		libraryStore.set(shuffledCards);
	};

	const onRightClick = (event) => {
		if (showContextMenu === true) {
			showContextMenu = false;
			return;
		}
		if (event.target.id !== 'library') return;

		showContextMenu = true;

		const elementPosition = event.target.getBoundingClientRect();

		contextMenuPosition = {
			x: elementPosition.x,
			y: elementPosition.top
		};

		contextMenuSize = {
			w: elementPosition.width,
			h: elementPosition.height
		};
	};

	const onDrawCard = () => {
		libraryStore.update((deck) => {
			const drawnCard = deck.shift();
			handStore.update((cardsInHand) => [...cardsInHand, drawnCard]);
			saveCardsInHand($page.params.slug, $handStore);
			return deck.filter((card) => card.id !== drawnCard.id);
		});
	};

	const onPeekCard = () => {
		showPeekModal = true;
	};
</script>

<ContextMenu
	bind:show={showContextMenu}
	{onRightClick}
	position={contextMenuPosition}
	size={contextMenuSize}
>
	<button class="context-menu-item" on:click={onDrawCard}>
		{trans('component.library.drawCard')}
	</button>

	<button class="context-menu-item" on:click={onPeekCard}>{trans('component.library.peek')}</button>

	<button class="context-menu-item" on:click={onShuffle}>
		{trans('component.library.shuffle')}
	</button>
</ContextMenu>

<button
	use:asDropZone={{
		Extras: { to: LIBRARY },
		TypesToAccept: { 'card/plain': 'all' },
		onDrop: onDrop
	}}
	id="library"
	class="library"
	type="button"
	on:click={onDrawCard}
>
	<img
		src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/513b7bfa-42c9-4d08-ad6c-8e5d478c42d3/dalfpib-83f22b02-5802-40b4-901b-3eecf0ca2058.png/v1/fill/w_1024,h_1463,q_80,strp/unofficial_magic_the_gathering_six_color_card_back_by_lordnyriox_dalfpib-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQ2MyIsInBhdGgiOiJcL2ZcLzUxM2I3YmZhLTQyYzktNGQwOC1hZDZjLThlNWQ0NzhjNDJkM1wvZGFsZnBpYi04M2YyMmIwMi01ODAyLTQwYjQtOTAxYi0zZWVjZjBjYTIwNTgucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.OGsglye34mbde4lkXNsDFFCl83jSzl1zNBLep-hhyKY"
		alt="Library"
	/>
</button>

<PeekModal bind:show={showPeekModal} />

<style lang="postcss">
	.library {
		/* SIZE */
		/* MARGIN & PADDING */
		/* DISPLAY */
		@apply flex-shrink-0;
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
	}
</style>
