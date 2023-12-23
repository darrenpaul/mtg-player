<script lang="ts">
	import { GAME_ROUTE } from '$lib/routes';
	import type { Game } from '$lib/types/game';

	export let games: Game[] = [];
</script>

<ol class="game-list">
	{#each games as game (game.id)}
		<li>
			<a href={GAME_ROUTE.path(game.id)}>
				{game.name}
			</a>
		</li>
	{/each}
</ol>

<style lang="postcss">
	.game-list {
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
</style>
