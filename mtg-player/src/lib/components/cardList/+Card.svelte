<script lang="ts">
	import type { Card } from '$lib/types/card';
	import { trans } from '$lib/locales/translateCopy';

	export let card: Card;

	let isPreviewing = false;

	const onTogglePreview = () => {
		isPreviewing = !isPreviewing;
	};

	const onSetCommander = () => {
		card = { ...card, tag: 'commander' };
	};

	const onUnsetCommander = () => {
		card = { ...card, tag: '' };
	};
</script>

<div class="card" on:click={onTogglePreview} role="button" tabindex="0">
	{#if isPreviewing}
		<div class="preview">
			<img src={card.images.normal} alt={card.name} />

			<div class="actions">
				{#if card.tag === 'commander'}
					<button type="button" on:click={onUnsetCommander} class="submit-button">
						{trans('component.card.unsetCommander')}
					</button>
				{/if}

				{#if card.tag !== 'commander'}
					<button type="button" on:click={onSetCommander} class="submit-button">
						{trans('component.card.setCommander')}
					</button>
				{/if}
			</div>
		</div>
	{/if}

	<img src={card.images.small} alt={card.name} />
</div>

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

		.preview {
			/* SIZE */
			/* MARGIN & PADDING */
			/* DISPLAY */
			@apply absolute;
			/* ALIGNMENT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION */
			/* EFFECT */

			.actions {
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
		}
	}
</style>
