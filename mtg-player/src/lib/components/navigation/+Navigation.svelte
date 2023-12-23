<script lang="ts">
	import { user as userStore } from '$lib/stores/userStore';
	import { DECKS_ROUTE, GAMES_ROUTE } from '$lib/routes';

	let navigationRoutes = [DECKS_ROUTE, GAMES_ROUTE];
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
			{#each navigationRoutes as route}
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
			@apply px-8;
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
