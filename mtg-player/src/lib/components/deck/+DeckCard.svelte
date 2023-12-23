<script lang="ts">
	import type { Card } from '$lib/types/card';
	import { trans } from '$lib/locales/translateCopy';
	import { handleUpdateDeckCard } from '$lib/apiHelper/deckCard';

	export let card: Card;
	export let removeCardFn: (card: Card) => void;

	let focusCard = false;
	let faceIndex = 0;
	let cardImage = '';

	$: cardImage = card.images[faceIndex];

	const onToggleFocusCard = () => {
		focusCard = !focusCard;
	};

	const onHideFocusCard = () => {
		focusCard = false;
	};

	const onSetCommander = async () => {
		card = { ...card, tag: 'commander' };
		await handleUpdateDeckCard(card.id, { tag: 'commander' });
	};

	const onUnsetCommander = async () => {
		card = { ...card, tag: '' };
		await handleUpdateDeckCard(card.id, { tag: '' });
	};

	const onRemoveCard = (card) => {
		removeCardFn(card);
	};
</script>

<button class="card" on:click={onToggleFocusCard} type="button">
	<img src={cardImage.small} alt={card.name} />
</button>

{#if focusCard}
	<div class="card-preview" on:mouseleave={onHideFocusCard} role="button" tabindex="0">
		<img src={cardImage.normal} alt={card.name} />

		<div class="actions">
			{#if card.tag === 'commander'}
				<button type="button" on:click={onUnsetCommander} class="submit-button">
					{trans('component.deckCard.unsetCommander')}
				</button>
			{:else}
				<button type="button" on:click={onSetCommander} class="submit-button">
					{trans('component.deckCard.setCommander')}
				</button>
			{/if}

			<button type="button" on:click={() => onRemoveCard(card)} class="submit-button">
				{trans('component.deckCard.removeCard')}
			</button>
		</div>
	</div>
{/if}

<style lang="postcss">
	.card {
		/* SIZE */
		/* MARGIN & PADDING */
		/* DISPLAY */
		/* ALIGNMENT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION */
		/* EFFECT */
	}

	.card-preview {
		/* SIZE */
		/* MARGIN & PADDING */
		/* DISPLAY */
		@apply fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;
		/* ALIGNMENT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION */
		/* EFFECT */
	}

	.actions {
		/* SIZE */
		/* MARGIN & PADDING */
		/* DISPLAY */
		@apply flex justify-between;
		/* ALIGNMENT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION */
		/* EFFECT */
	}
</style>
