<script lang="ts">
	import { trans } from '$lib/locales/translateCopy';
	import type { CardGame } from '$lib/types/card';
	import { library as libraryStore, peekIndex as peekIndexStore } from '$lib/stores/libraryStore';
	import { LIBRARY } from '$lib/constants/cardZones';
	import Card from '$lib/components/game/card/+Card.svelte';
	import { saveActivity } from '$lib/stores/gameLogStore';

	const PEEK_TOP = 'top';
	const PEEK_BOTTOM = 'bottom';

	export let show: boolean = false;

	let peekedCards: CardGame[] = [];
	let peekIndex: number = 0;
	let peekFrom: string = '';

	$: peekIndex = $peekIndexStore;

	$: if ($libraryStore) {
		peekedCards = [];

		let libraryCards = [...$libraryStore];

		if (peekFrom !== PEEK_BOTTOM) {
			libraryCards.reverse();
		}
		for (let index = 0; index < peekIndex; index++) {
			peekedCards = [...peekedCards, libraryCards[index]];
		}
	}

	$: if (show) {
		peekedCards = [];
		peekIndexStore.set(0);
	}

	const resetPeek = () => {
		peekIndex = 0;
		peekIndexStore.set(0);
		peekedCards = [];
	};

	const onPeekTopCard = () => {
		saveActivity('Peeked Top Card');
		if (peekFrom === PEEK_BOTTOM) {
			resetPeek();
		}
		peekFrom = 'top';
		peekedCards = [...peekedCards, $libraryStore[peekIndex]];
		peekIndex += 1;
		peekIndexStore.set(peekIndex);
	};

	const onPeekBottomCard = () => {
		saveActivity('Peeked Bottom Card');
		if (peekFrom === PEEK_TOP) {
			resetPeek();
		}
		peekFrom = 'bottom';
		peekedCards = [...peekedCards, $libraryStore[peekIndex]];
		peekIndex += 1;
		peekIndexStore.set(peekIndex);
	};

	const onClose = () => {
		resetPeek();
		show = false;
	};
</script>

{#if show}
	<div class="peek-modal">
		<div class="header">
			<h1>{trans('component.modal.peek')}</h1>

			<div class="group">
				<button class="submit-button" type="button" on:click={onPeekTopCard}>
					{trans('component.modal.peekTop')}
				</button>

				<button class="submit-button" type="button" on:click={onPeekBottomCard}>
					{trans('component.modal.peekBottom')}
				</button>

				<button class="submit-button" type="button" on:click={onClose}>
					{trans('component.modal.close')}
				</button>
			</div>
		</div>

		<div class="cards">
			{#each peekedCards as card (card.id)}
				<Card {card} from={LIBRARY} />
			{/each}
		</div>
	</div>

	<div role="button" tabindex="99" on:click={onClose} class="modal-backdrop"></div>
{/if}

<style lang="postcss">
	.peek-modal {
		/* SIZE */
		@apply w-[50vw] h-[50vh];
		/* MARGIN & PADDING */
		/* DISPLAY */
		@apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-auto z-50;
		/* ALIGNMENT */
		/* BORDERS */
		@apply border-2 rounded-lg;
		/* COLORS */
		@apply bg-white border-black;
		/* TEXT */
		/* ANIMATION */
		/* EFFECT */
		@apply shadow;

		.header {
			/* SIZE */
			/* MARGIN & PADDING */
			@apply p-4 mb-4;
			/* DISPLAY */
			@apply flex;
			/* ALIGNMENT */
			@apply items-center justify-between;
			/* BORDERS */
			@apply bg-black text-white;
			/* COLORS */
			/* TEXT */
			/* ANIMATION */
			/* EFFECT */

			.group {
				/* SIZE */
				/* MARGIN & PADDING */
				/* DISPLAY */
				@apply flex gap-4;
				/* ALIGNMENT */
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				/* ANIMATION */
				/* EFFECT */
			}
		}

		.cards {
			/* SIZE */
			/* MARGIN & PADDING */
			@apply p-4;
			/* DISPLAY */
			@apply flex flex-wrap items-center justify-center gap-4;
			/* ALIGNMENT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION */
			/* EFFECT */
		}
	}

	.modal-backdrop {
		/* SIZE */
		@apply w-screen h-screen;
		/* MARGIN & PADDING */
		/* DISPLAY */
		@apply absolute top-0 left-0 z-40;
		/* ALIGNMENT */
		/* BORDERS */
		/* COLORS */
		@apply bg-black/50;
		/* TEXT */
		/* ANIMATION */
		/* EFFECT */
	}
</style>
