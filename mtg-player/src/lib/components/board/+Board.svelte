<script lang="ts">
	import Hand from '$lib/components/game/hand/+Hand.svelte';
	import Library from '$lib/components/game/library/+Library.svelte';
	import Battlefield from '$lib/components/game/battlefield/+Battlefield.svelte';
	import CardZone from '$lib/components/game/cardZone/+CardZone.svelte';
	import { COMMAND_ZONE, EXILE, GRAVEYARD } from '$lib/constants/cardZones';
	import { trans } from '$lib/locales/translateCopy';
	import { board as boardStore, getCurrentPlayer } from '$lib/stores/boardStore';

	let player;
	let commandZone;
	let graveyard;
	let exile;

	$: {
		$boardStore, boardUpdated();
	}

	const boardUpdated = async () => {
		player = getCurrentPlayer();
		commandZone = player.commandZone;
		graveyard = player.graveyard;
		exile = player.exile;

		if (!player || !player.battlefield) return [];
	};
</script>

<div class="board">
	<Battlefield />

	<div class="player-panel">
		<Hand />

		<CardZone
			cards={commandZone}
			zone={COMMAND_ZONE}
			placeholder={trans('component.board.commandZone')}
		/>

		<CardZone cards={exile} zone={EXILE} placeholder={trans('component.board.exile')} />

		<CardZone cards={graveyard} zone={GRAVEYARD} placeholder={trans('component.board.graveyard')} />

		<Library />
	</div>
</div>

<style lang="postcss">
	.board {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply relative flex flex-col;
		/* BORDERS */
		@apply bg-slate-400;
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.player-panel {
			/* SIZE */
			@apply w-full;
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
