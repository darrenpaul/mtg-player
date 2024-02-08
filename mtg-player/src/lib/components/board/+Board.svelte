<script lang="ts">
	import Hand from '$lib/components/game/hand/+Hand.svelte';
	import Library from '$lib/components/game/library/+Library.svelte';
	import Battlefield from '$lib/components/game/battlefield/+Battlefield.svelte';
	import CardZone from '$lib/components/game/cardZone/+CardZone.svelte';
	import { COMMAND_ZONE, EXILE, GRAVEYARD } from '$lib/constants/cardZones';
	import { trans } from '$lib/locales/translateCopy';
	import { board as boardStore, getCurrentPlayer } from '$lib/stores/boardStore';
	import Health from '$lib/components/game/panels/+Health.svelte';
	import BattlefieldEnemy from '$lib/components/game/battlefield/+BattlefieldEnemy.svelte';
	import { user as userStore } from '$lib/stores/userStore';
	import { GRID, APPLESFOCUS, PREVIEW } from '$lib/constants/viewLayouts';

	let players: BoardPlayer[] = [];
	let focusPlayer: BoardPlayer;
	let player;
	let commandZone;
	let graveyard;
	let exile;
	let viewLayout = GRID;

	$: {
		$boardStore, boardUpdated();
	}

	$: players = $boardStore?.players;

	const boardUpdated = async () => {
		player = getCurrentPlayer();
		commandZone = player.commandZone;
		graveyard = player.graveyard;
		exile = player.exile;

		if (!player || !player.battlefield) return [];
	};

	const onFocusPlayer = (event, player) => {
		if (event.target.id !== 'battlefield-element') return;

		if (player.username === $userStore.username) {
			viewLayout = APPLESFOCUS;
		} else {
			focusPlayer = player;
			viewLayout = PREVIEW;
		}
	};

	const onUnfocusPlayer = (event) => {
		if (event.target.id !== 'battlefield-element') return;
		focusPlayer = null;
		viewLayout = GRID;
	};
</script>

<div class="board">
	{#if viewLayout === GRID}
		<div class="grid-layout">
			{#each players as player}
				<BattlefieldEnemy {player} {viewLayout} {onFocusPlayer} />
			{/each}
		</div>
	{/if}

	{#if viewLayout === PREVIEW}
		<div class="preview-layout">
			<BattlefieldEnemy player={focusPlayer} {viewLayout} onFocusPlayer={onUnfocusPlayer} />
		</div>
	{/if}

	{#if viewLayout === APPLESFOCUS}
		<Battlefield onFocusPlayer={onUnfocusPlayer} />
	{/if}

	<div class="player-panel">
		<Hand />

		<CardZone
			cards={commandZone}
			zone={COMMAND_ZONE}
			display="absolute"
			placeholder={trans('component.board.commandZone')}
			disabledCardContextMenu={true}
		/>

		<CardZone
			cards={exile}
			zone={EXILE}
			display="absolute"
			placeholder={trans('component.board.exile')}
			disabledCardContextMenu={true}
		/>

		<CardZone
			cards={graveyard}
			zone={GRAVEYARD}
			display="absolute"
			placeholder={trans('component.board.graveyard')}
			disabledCardContextMenu={true}
		/>

		<Library />
	</div>

	<Health />
</div>

<style lang="postcss">
	.board {
		/* SIZE */
		height: h-screen;
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply flex flex-col;
		/* BORDERS */
		@apply bg-slate-400;
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.grid-layout {
			/* SIZE */
			height: calc(100vh - 18rem);
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply grid grid-cols-2;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.preview-layout {
			/* SIZE */
			height: calc(100vh - 18rem);
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply grid grid-cols-1;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

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
