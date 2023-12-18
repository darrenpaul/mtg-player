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

	export let card: CardGame;
	export let from: string;
	export let usePosition = false;
	export let canTap = false;

	let previewing = false;
	let showContextMenu = false;
	let showCounterModal = false;
	let cardTapped = card.tapped || false;
	let style = '';

	$: if (usePosition === true) {
		style = `left:${card.x}px; top:${card.y}px;`;
	} else {
		style = '';
	}

	const onContextMenu = (event: MouseEvent) => {
		showContextMenu = true;
	};

	const onCardPreview = () => {
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
		await fetch('/api/game', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: $gameStore.id, board: $boardStore })
		});
	};

	const onMouseExit = () => {
		showContextMenu = false;
		previewing = false;
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
		console.log('token copy');
	};
</script>

<button
	class="card"
	use:asDroppable={{
		Operations: 'copy',
		DataToOffer: { 'card/plain': '' },
		Extras: { card, from: from }
	}}
	{style}
	type="button"
	on:click={onCardTap}
	on:contextmenu={onContextMenu}
	on:mouseleave={onMouseExit}
>
	<div class={cardTapped ? 'card-rotate' : ''}>
		<img id="card" class="card-normal" src={card.imageUrl} alt={card.name} />

		<CardCounter counters={card.counters || {}} />
	</div>

	{#if previewing}
		<div class="card-preview">
			<img src={card.imageUrl} alt={card.name} />
		</div>
	{/if}

	<CardContextMenu show={showContextMenu}>
		<div>
			<button type="button" on:click={onShowCounterModal}>
				{trans('component.card.addCounter')}
			</button>
			<button type="button" on:click={onTokenCopy}>{trans('component.card.tokenCopy')}</button>
		</div>
	</CardContextMenu>
</button>

<CounterModal show={showCounterModal} {onAddCounter} {onRemoveCounter} />

<style lang="postcss">
	.card {
		/* SIZE */
		/* MARGIN & PADDING */
		/* DISPLAY */
		@apply relative z-10;
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

		.card-preview {
			/* SIZE */
			@apply w-[292px];
			/* MARGIN & PADDING */
			/* DISPLAY */
			@apply absolute top-0 left-0 overflow-hidden z-50;
			/* ALIGNMENT */
			/* BORDERS */
			@apply rounded-2xl;
			/* COLORS */
			/* TEXT */
			/* ANIMATION */
			/* EFFECT */
			@apply pointer-events-none;
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
	}
</style>
