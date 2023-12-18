<script lang="ts">
	export let show: boolean = false;
</script>

{#if show}
	<div class="context-menu">
		<slot />
	</div>
{/if}

<style lang="postcss">
	.context-menu {
		/* SIZE */
		@apply w-full;
		/* MARGIN & PADDING */
		/* DISPLAY */
		@apply absolute flex flex-col top-0 left-0;
		/* ALIGNMENT */
		/* BORDERS */
		/* COLORS */
		@apply bg-yellow-400;
		/* TEXT */
		/* ANIMATION */
		/* EFFECT */
	}
</style>
