<script lang="ts">
	import { BATTLEFIELD } from '$lib/constants/cardZones';
	import type { CardGame } from '$lib/types/card';
	import { asDroppable } from 'svelte-drag-and-drop-actions';
	import { board as boardStore, getCurrentPlayer } from '$lib/stores/boardStore';
	import { user as userStore } from '$lib/stores/userStore';
	import { game as gameStore } from '$lib/stores/gameStore';
	import { updateCurrentPlayer } from '$lib/utils/game/player';
	import CardContextMenu from '$lib/components/game/cardContextMenu/+CardContextMenu.svelte';
	import { trans } from '$lib/locales/translateCopy';
	import CardCounter from '$lib/components/game/card/+CardCounter.svelte';
	import CounterModal from '$lib/components/game/counterModal/+CounterModal.svelte';
	import { handleUpdateBoard } from '$lib/apiHelper/board';

	export let card: CardGame;
	export let from: string;
	export let usePosition = false;
	export let canTap = false;
	export let clientResolution = { width: 0, height: 0 };

	let previewing = false;
	let showContextMenu = false;
	let showCounterModal = false;
	let cardTapped = card.tapped || false;
	let style = '';
	let faceIndex = 0;
	let cardImage = '';

	$: if (usePosition === true) {
		style = `left:${card.x}px; top:${card.y}px;`;
	} else {
		style = '';
	}

	$: {
		if (card) {
			faceIndex = card.faceIndex;
			cardImage = card.cardFaces[faceIndex];
			card.clientResolution = clientResolution;
		}
	}

	const onContextMenu = (event: MouseEvent) => {
		showContextMenu = true;
	};

	const onPreview = () => {
		previewing = true;
	};

	const onCardTap = (event) => {
		if (event.target.id !== 'card') return;
		if (!canTap) return;

		if (from === BATTLEFIELD) {
			cardTapped = !cardTapped;

			const battlefield = getCurrentPlayer().battlefield;
			const newCards = battlefield.map((battleFieldCard) => {
				if (battleFieldCard.id === card.id) {
					battleFieldCard.tapped = cardTapped;
				}
				return battleFieldCard;
			});

			const newPlayerState = updateCurrentPlayer($boardStore.players, $userStore.username, {
				battlefield: newCards
			});

			boardStore.set({ ...$boardStore, players: newPlayerState });
			onSaveCard();
		}
	};

	const onSaveCard = async () => {
		handleUpdateBoard($boardStore.id, $boardStore.players);
	};

	const onMouseExit = () => {
		showContextMenu = false;
		previewing = false;
	};

	const onFlipCard = () => {
		if (card.cardFaces.length > 1) {
			const newIndex = faceIndex + 1;
			faceIndex = newIndex % 2;
			card.faceIndex = faceIndex;
		}
	};

	const onShowCounterModal = () => {
		showCounterModal = true;
	};

	const onAddCounter = (counter) => {
		const cardCounters = card?.counters || {};
		if (cardCounters[counter]) {
			cardCounters[counter] += 1;
		} else {
			cardCounters[counter] = 1;
		}
		card.counters = cardCounters;

		onSaveCard();
	};

	const onRemoveCounter = (counter) => {
		const cardCounters = card?.counters || {};
		if (cardCounters[counter]) {
			cardCounters[counter] -= 1;
		}

		if (cardCounters[counter] === 0) {
			delete cardCounters[counter];
		}

		card.counters = cardCounters;
		onSaveCard();
	};

	const onTokenCopy = () => {
		const timestamp = new Date().getTime();
		const newCard = {
			...card,
			id: `${card.id}-${timestamp}`,
			token: true,
			x: card.x + 20,
			y: card.y + 20
		};

		const battlefield = getCurrentPlayer().battlefield;
		const newCards = [...battlefield, newCard];

		const newPlayerState = updateCurrentPlayer($boardStore.players, $userStore.username, {
			battlefield: newCards
		});

		boardStore.set({ ...$boardStore, players: newPlayerState });
		onSaveCard();
	};

	const onDragMove = (x, y, dx, dy) => {
		card.x = x;
		card.y = y;
	};
	const onDragEnd = async (x, y, dx, dy) => {
		console.log(x, y);
		card.x = x;
		card.y = y;
		const battlefield = getCurrentPlayer().battlefield;
		const newCards = battlefield.map((battleFieldCard) => {
			if (battleFieldCard.id === card.id) {
				battleFieldCard.tapped = cardTapped;
				return card;
			}
			return battleFieldCard;
		});
		console.log('newCards ~ newCards:', newCards);

		const newPlayerState = updateCurrentPlayer($boardStore.players, $userStore.username, {
			battlefield: newCards
		});

		boardStore.set({ ...$boardStore, players: newPlayerState });

		onSaveCard();
	};
</script>

<button
	class="card"
	use:asDroppable={{
		DataToOffer: { 'card/plain': '' },
		Extras: { card, from: from },
		onDragStart: { x: card.x || 0, y: card.y || 0 },
		onDragMove,
		onDragEnd
	}}
	{style}
	type="button"
	on:click={onCardTap}
	on:contextmenu|preventDefault={onContextMenu}
	on:mouseleave={onMouseExit}
>
	<div class={cardTapped ? 'card-rotate' : ''}>
		<img id="card" class="card-normal" src={cardImage} alt={card.name} />

		<CardCounter counters={card.counters} />

		{#if card.token}
			<div class="token-banner">
				<p>{trans('component.card.token')}</p>
			</div>
		{/if}
	</div>

	<CardContextMenu show={showContextMenu}>
		<div class="context-menu-list">
			<button type="button" on:click={onPreview}>{trans('component.card.preview')}</button>
			<button type="button" on:click={onFlipCard}>{trans('component.card.flipCard')}</button>
			<button type="button" on:click={onShowCounterModal}>
				{trans('component.card.addCounter')}
			</button>
			<button type="button" on:click={onTokenCopy}>{trans('component.card.tokenCopy')}</button>
		</div>
	</CardContextMenu>
</button>

<CounterModal bind:show={showCounterModal} {onAddCounter} {onRemoveCounter} />

{#if previewing}
	<div class="card-preview">
		<img src={cardImage} alt={card.name} />
	</div>
{/if}

<style lang="postcss">
	.card {
		/* SIZE */
		@apply w-[146px] h-[204px];
		/* MARGIN & PADDING */
		/* DISPLAY */
		@apply block absolute z-10;
		/* ALIGNMENT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION */
		/* EFFECT */

		.card-normal {
			/* SIZE */
			@apply w-[146px] h-[204px];
			/* MARGIN & PADDING */
			/* DISPLAY */
			/* ALIGNMENT */
			/* BORDERS */
			@apply rounded-xl;
			/* COLORS */
			/* TEXT */
			/* ANIMATION */
			/* EFFECT */
		}

		.token-banner {
			/* SIZE */
			@apply w-full;
			/* MARGIN & PADDING */
			/* DISPLAY */
			@apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;
			/* ALIGNMENT */
			/* BORDERS */
			/* COLORS */
			@apply bg-black text-white text-center;
			/* TEXT */
			/* ANIMATION */
			/* EFFECT */
		}

		.card-rotate {
			/* SIZE */
			/* MARGIN & PADDING */
			/* DISPLAY */
			@apply transform rotate-90;
			/* ALIGNMENT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION */
			/* EFFECT */
		}
		.context-menu-list {
			/* SIZE */
			/* MARGIN & PADDING */
			/* DISPLAY */
			@apply flex flex-col;
			/* ALIGNMENT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION */
			/* EFFECT */
		}
	}

	.card-preview {
		/* SIZE */
		@apply w-[438px];
		/* MARGIN & PADDING */
		/* DISPLAY */
		@apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden z-50;
		/* ALIGNMENT */
		/* BORDERS */
		@apply rounded-2xl;
		/* COLORS */
		/* TEXT */
		/* ANIMATION */
		/* EFFECT */
		@apply pointer-events-none;
	}
</style>
