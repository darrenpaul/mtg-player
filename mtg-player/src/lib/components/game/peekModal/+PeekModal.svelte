<script lang="ts">
	import { trans } from '$lib/locales/translateCopy';
	import type { CardGame } from '$lib/types/card';
	import { library as libraryStore, peekIndex as peekIndexStore } from '$lib/stores/libraryStore';
	import { LIBRARY } from '$lib/constants/cardZones';
	import Card from '$lib/components/game/card/+Card.svelte';

	export let show: boolean = false;

	let peekedCards: CardGame[] = [];
	let peekIndex: number;

	$: peekIndex = $peekIndexStore;

	$: if ($libraryStore) {
		peekedCards = [];

		for (let index = 0; index < peekIndex; index++) {
			peekedCards = [...peekedCards, $libraryStore[index]];
		}
	}

	$: if (show) {
		peekedCards = [];
		peekIndexStore.set(0);
	}

	const onPeekTopCard = () => {
		peekedCards = [...peekedCards, $libraryStore[peekIndex]];
		peekIndex += 1;
		peekIndexStore.set(peekIndex);
	};

	const onPeekBottomCard = () => {};

	const onClose = () => {
		show = false;
	};
</script>

{#if show}
	<div class="peek-modal">
		<div class="header">
			<h1>{trans('component.peekModal.peek')}</h1>

			<div class="group">
				<button class="submit-button" type="button" on:click={onPeekTopCard}>
					{trans('component.peekModal.peekTop')}
				</button>

				<button class="submit-button" type="button" on:click={onPeekBottomCard}>
					{trans('component.peekModal.peekBottom')}
				</button>

				<button class="submit-button" type="button" on:click={onClose}>
					{trans('component.peekModal.close')}
				</button>
			</div>
		</div>

		<div class="peek-cards">
			{#each peekedCards as card (card.id)}
				<Card {card} from={LIBRARY} />
			{/each}
		</div>
	</div>
{/if}

<style lang="postcss">
	.peek-modal {
		/* SIZE */
		@apply w-fit h-screen;
		/* MARGIN & PADDING */
		/* DISPLAY */
		@apply absolute top-0 left-0 overflow-y-auto z-20;
		/* ALIGNMENT */
		/* BORDERS */
		@apply rounded-lg;
		/* COLORS */
		@apply bg-white;
		/* TEXT */
		/* ANIMATION */
		/* EFFECT */

		.header {
			/* SIZE */
			/* MARGIN & PADDING */
			@apply mb-4;
			/* DISPLAY */
			@apply flex;
			/* ALIGNMENT */
			@apply items-center justify-between;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION */
			/* EFFECT */

			.group {
				/* SIZE */
				/* MARGIN & PADDING */
				/* DISPLAY */
				@apply flex;
				/* ALIGNMENT */
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				/* ANIMATION */
				/* EFFECT */
			}
		}

		.peek-cards {
			/* SIZE */
			/* MARGIN & PADDING */
			/* DISPLAY */
			@apply flex flex-col gap-4;
			/* ALIGNMENT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION */
			/* EFFECT */
		}
	}
</style>
