<script lang="ts">
	import { trans } from '$lib/locales/translateCopy';
	import type { CardGame } from '$lib/types/card';
	import Card from '$lib/components/game/card/+Card.svelte';
	import { creatureTokenStore } from '$lib/stores/creatureTokenStore';
	import { TOKEN_MODAL } from '$lib/constants/cardZones';

	export let show: boolean = false;

	let cards: CardGame[] = [];

	$: cards = $creatureTokenStore;

	const onClose = () => {
		show = false;
	};
</script>

{#if show}
	<div class="peek-modal">
		<div class="header">
			<h1>{trans('component.modal.peek')}</h1>

			<div class="group">
				<button class="submit-button" type="button" on:click={onClose}>
					{trans('component.modal.close')}
				</button>
			</div>
		</div>

		<div class="cards">
			{#each cards as card (card.id)}
				<Card {card} from={TOKEN_MODAL} />
			{/each}
		</div>
	</div>
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
