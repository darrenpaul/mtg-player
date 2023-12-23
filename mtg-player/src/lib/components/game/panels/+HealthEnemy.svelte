<script lang="ts">
	import { trans } from '$lib/locales/translateCopy';
	import { updateCurrentPlayer } from '$lib/utils/game/player';
	import { board as boardStore, getCurrentPlayer } from '$lib/stores/boardStore';
	import { user as userStore } from '$lib/stores/userStore';
	import { game as gameStore } from '$lib/stores/gameStore';

	let enemies = [];

	$: enemies =
		$boardStore?.players.filter((player) => player.username !== $userStore.username) || [];
</script>

<div class="health">
	{#each enemies as player (player.username)}
		<div class="group">
			<p class="health-text">{player.username}</p>
			<p class="health-text">{player.health}</p>
			<p class="health-text">{player.commanderDamage}</p>
		</div>
	{/each}
</div>

<style lang="postcss">
	.health {
		/* SIZE */
		@apply h-20;
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply flex gap-8;
		/* BORDERS */
		@apply border-2;
		/* COLORS */
		@apply border-black bg-black text-white;
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.group {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply px-4;
			/* LAYOUT */
			@apply flex items-center gap-4;
			/* BORDERS */
			@apply rounded-3xl;
			/* COLORS */
			@apply bg-slate-600;
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.health-text {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			@apply text-2xl text-center;
			/* ANIMATION AND EFFECTS */
		}

		.health-button {
			/* SIZE */
			@apply w-[40px] h-[40px];
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex items-center justify-center;
			/* BORDERS */
			@apply rounded-full;
			/* COLORS */
			@apply bg-neutral-600;
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
