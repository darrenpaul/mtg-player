<script lang="ts">
	export let onRightClick: Function = () => {};
	export let show: boolean = false;
	export let position = { x: 0, y: 0 };
	export let size = { w: 0, h: 0 };

	const onPageClick = () => {
		show = false;
	};
</script>

{#if show}
	<nav class="context-menu" style="top:{position.y}px; left:{position.x}px; width:{size.w}px;">
		<slot />
	</nav>
{/if}

<svelte:window on:contextmenu|preventDefault={onRightClick} on:click={onPageClick} />

<style lang="postcss">
	.context-menu {
		/* SIZE */
		/* MARGIN & PADDING */
		/* DISPLAY */
		@apply absolute flex flex-col top-0;
		/* ALIGNMENT */
		/* BORDERS */
		/* COLORS */
		@apply bg-yellow-400;
		/* TEXT */
		/* ANIMATION */
		/* EFFECT */
	}
</style>
