<script lang="ts">
	import type { Writable } from 'svelte/store';
	import routes from './routes';
	import { getContext } from 'svelte';
	import type { User } from '$lib/types/user';
	import { user as userStore } from '$lib/stores/userStore';
</script>

<div class="navigation">
	<nav class="desktop">
		<div class="branding">
			<h3>MTG Player</h3>

			{#if $userStore && $userStore.username}
				<p>{$userStore.username}</p>
			{/if}
		</div>

		<div class="links">
			{#each routes as route}
				<a href={route.path}>{route.name}</a>
			{/each}

			{#if $userStore && $userStore.username}
				<a href="/logout">Logout</a>
			{/if}
		</div>
	</nav>
</div>

<style lang="postcss">
	.navigation {
		/* SIZE */
		/* MARGIN & PADDING */
		/* DISPLAY */
		@apply block;
		/* ALIGNMENT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION */
		/* EFFECT */

		.desktop {
			/* SIZE */
			@apply h-navigation-desktop;
			/* MARGIN & PADDING */
			/* DISPLAY */
			@apply flex;
			/* ALIGNMENT */
			@apply items-center justify-between;
			/* BORDERS */
			/* COLORS */
			@apply bg-black text-white;
			/* TEXT */
			/* ANIMATION */
			/* EFFECT */

			.branding {
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

			.links {
				/* SIZE */
				/* MARGIN & PADDING */
				/* DISPLAY */
				@apply flex gap-4;
				/* ALIGNMENT */
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				/* ANIMATION */
				/* EFFECT */
			}
		}
	}
</style>
