<script lang="ts">
	import { browser } from '$app/environment';
	import CardEnemyBattlefield from '$lib/components/game/card/+CardEnemyBattlefield.svelte';
	import { user as userStore } from '$lib/stores/userStore';
	import { onMount } from 'svelte';
	import PlayerStats from '$lib/components/game/+PlayerStats.svelte';

	export let player: BoardPlayer;
	export let viewLayout: string;
	export let onFocusPlayer = () => {};

	let element;
	let offsetWidth = 0;
	let offsetHeight = 0;
	let battlefield = [];
	let battlefieldColor = 'enemy-player';

	onMount(() => {
		if (browser) {
			offsetWidth = element.offsetWidth;
			offsetHeight = element.offsetHeight;
		}
	});

	$: battlefield = player.battlefield || [];
	$: battlefieldColor = player.username === $userStore.username ? 'current-player' : 'enemy-player';
</script>

<button
	id="battlefield-element"
	type="button"
	on:click={(event) => onFocusPlayer(event, player)}
	bind:this={element}
	class={`battlefield ${battlefieldColor}`}
>
	<PlayerStats {player} />

	{#each battlefield as card (card.id)}
		<CardEnemyBattlefield
			{card}
			{player}
			responsive={true}
			parentSize={{ width: offsetWidth, height: offsetHeight }}
		/>
	{/each}
</button>

<style lang="postcss">
	.battlefield {
		/* SIZE */
		@apply h-full;
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply block relative;
		/* BORDERS */
		@apply border-2;
		/* COLORS */
		@apply bg-red-400 border-black;
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.player-stats {
			/* SIZE */
			@apply w-full;
			/* MARGIN & PADDING */
			/* DISPLAY */
			@apply absolute top-0 left-0;
			/* ALIGNMENT */
			/* BORDERS */
			/* COLORS */
			@apply bg-black/50;
			/* TEXT */
			/* ANIMATION */
			/* EFFECT */
		}
	}

	.enemy-player {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		@apply bg-red-300;
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}

	.current-player {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		@apply bg-green-300;
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
