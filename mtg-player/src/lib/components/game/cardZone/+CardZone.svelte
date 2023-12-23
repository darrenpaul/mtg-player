<script lang="ts">
	import { asDropZone } from 'svelte-drag-and-drop-actions';
	import Card from '$lib/components/game/card/+Card.svelte';
	import onDrop from '$lib/utils/game/onDrop';
	import type { CardGame } from '$lib/types/card';
	import CardZoneModal from '$lib/components/game/modals/+CardZoneModal.svelte';

	export let cards: CardGame[] = [];
	export let zone: string;
	export let placeholder: string;
	export let display = 'relative';
	export let disabledCardContextMenu = false;

	let showCardZoneModal: boolean = false;

	const onShowCardZoneModal = () => {
		showCardZoneModal = true;
	};
</script>

<button
	type="button"
	class="card-zone"
	on:contextmenu|preventDefault={onShowCardZoneModal}
	use:asDropZone={{
		Extras: { to: zone },
		TypesToAccept: { 'card/plain': 'all' },
		onDrop: onDrop
	}}
>
	{#each cards as card (card.id)}
		<Card {card} from={zone} {display} contextMenuDisabled={disabledCardContextMenu} />
	{/each}

	<p class="placeholder">{placeholder}</p>
</button>

<CardZoneModal bind:show={showCardZoneModal} {cards} {zone} />

<style lang="postcss">
	.card-zone {
		/* SIZE */
		@apply w-[146px] h-[204px];
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply flex-shrink-0 relative flex;
		/* BORDERS */
		@apply border-2;
		/* COLORS */
		@apply bg-white border-black;
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.placeholder {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0;
			/* BORDERS */
			/* COLORS */
			@apply text-gray-400 text-center select-none;
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
