<script lang="ts">
	import { asDropZone } from 'svelte-drag-and-drop-actions';
	import { BATTLEFIELD } from '$lib/constants/cardZones';
	import type { CardGame } from '$lib/types/card';
	import CardBattlefield from '$lib/components/game/card/+CardBattlefield.svelte';
	import { board as boardStore, getCurrentPlayer } from '$lib/stores/boardStore';
	import onDrop from '$lib/utils/game/onDrop';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { handleUpdateBoard } from '$lib/apiHelper/board';
	import { updateCurrentPlayer } from '$lib/utils/game/player';

	export let onFocusPlayer = () => {};

	let element;
	let cards: CardGame[] = [];
	let player;
	let width = 0;
	let height = 0;

	$: {
		$boardStore, boardUpdated();
	}

	onMount(() => {
		if (browser) {
			width = element.offsetWidth;
			height = element.offsetHeight;
			player = getCurrentPlayer();
			player.clientWidth = width;
			player.clientHeight = height;

			const newPlayerState = updateCurrentPlayer($boardStore.players, player.username, {
				...player
			});

			handleUpdateBoard($boardStore.id, newPlayerState);
		}
	});

	const boardUpdated = async () => {
		player = getCurrentPlayer();

		if (!player || !player.battlefield) return [];

		cards = player.battlefield;
	};
</script>

<button
	id="battlefield-element"
	type="button"
	on:click={onFocusPlayer}
	bind:this={element}
	class="battlefield"
	use:asDropZone={{
		Extras: { to: BATTLEFIELD },
		TypesToAccept: { 'card/plain': 'all' },
		onDrop: onDrop
	}}
>
	{#each cards as card (card.id)}
		<CardBattlefield
			{card}
			from={BATTLEFIELD}
			clientResolution={{ width, height }}
			usePosition={true}
			canTap={true}
		/>
	{/each}
</button>

<style lang="postcss">
	.battlefield {
		/* SIZE */
		@apply w-[screen];
		height: calc(100vh - 18rem);
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply block;
		/* BORDERS */
		@apply bg-green-400;
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
