<script lang="ts">
	import HeartIcon from '$lib/icons/+HeartIcon.svelte';
	import PoisonIcon from '$lib/icons/+PoisonIcon.svelte';
	import ShieldIcon from '$lib/icons/+ShieldIcon.svelte';

	export let player: BoardPlayer;
</script>

<div class="player-stats">
	<div class="group">
		<HeartIcon fill="fill-white" />
		<h2>{player.health}</h2>
	</div>

	<div class="group">
		<ShieldIcon fill="fill-white" />
		<h2>{player.commanderDamage}</h2>
	</div>

	<div class="group">
		<PoisonIcon fill="fill-white" />
		<h2>{player.poisonCounters}</h2>
	</div>
</div>

<style lang="postcss">
	.player-stats {
		/* SIZE */
		@apply w-full h-12;
		/* MARGIN & PADDING */
		/* DISPLAY */
		@apply absolute top-0 left-0 flex items-center justify-center gap-8;
		/* ALIGNMENT */
		/* BORDERS */
		/* COLORS */
		@apply bg-black/50 text-white;
		/* TEXT */
		/* ANIMATION */
		/* EFFECT */

		.group {
			/* SIZE */
			@apply flex gap-2;
			/* MARGIN & PADDING */
			/* DISPLAY */
			/* ALIGNMENT */
			@apply items-center justify-center;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION */
			/* EFFECT */
		}
	}
</style>
