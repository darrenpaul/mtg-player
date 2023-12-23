<script lang="ts">
	import ScrollIcon from '$lib/icons/+ScrollIcon.svelte';
	import { trans } from '$lib/locales/translateCopy';
	import { gameLog as gameLogStore } from '$lib/stores/gameLogStore';

	let open: boolean = false;
</script>

<div class="activity-log">
	<div class="flex items-center justify-center">
		<button class="activity-log-button" type="button" on:click={() => (open = !open)}>
			<ScrollIcon />
		</button>
	</div>

	{#if open}
		<div class="activity-log-content">
			<h1>Activity Log</h1>

			<div class="activities">
				{#each $gameLogStore.activity as activity}
					<div class="activity">
						<div class="header">
							<p>{activity.player}</p>
							<small>{activity.time}</small>
						</div>

						<p>{activity.action}</p>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	.activity-log {
		/* SIZE */
		@apply h-screen;
		/* MARGIN & PADDING */
		/* DISPLAY */
		@apply absolute top-0 right-0 z-20 flex;
		/* ALIGNMENT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION */
		/* EFFECT */

		.activity-log-content {
			/* SIZE */
			@apply w-96;
			/* MARGIN & PADDING */
			@apply p-2;
			/* DISPLAY */
			@apply overflow-y-auto;
			/* ALIGNMENT */
			/* BORDERS */
			/* COLORS */
			@apply bg-white;
			/* TEXT */
			/* ANIMATION */
			/* EFFECT */
			.activities {
				/* SIZE */
				/* MARGIN & PADDING */
				/* DISPLAY */
				@apply flex flex-col gap-2;
				/* ALIGNMENT */
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				/* ANIMATION */
				/* EFFECT */
			}

			.activity {
				/* SIZE */
				/* MARGIN & PADDING */
				@apply p-2;
				/* DISPLAY */
				/* ALIGNMENT */
				/* BORDERS */
				@apply border-2 rounded-xl;
				/* COLORS */
				/* TEXT */
				/* ANIMATION */
				/* EFFECT */

				.header {
					/* SIZE */
					/* MARGIN & PADDING */
					/* DISPLAY */
					@apply flex items-center justify-between;
					/* ALIGNMENT */
					/* BORDERS */
					/* COLORS */
					/* TEXT */
					/* ANIMATION */
					/* EFFECT */
				}
			}
		}

		.activity-log-button {
			/* SIZE */
			@apply w-12 h-12;
			/* MARGIN & PADDING */
			/* DISPLAY */
			@apply flex items-center justify-center;
			/* ALIGNMENT */
			/* BORDERS */
			@apply rounded-l-full;
			/* COLORS */
			@apply bg-white;
			/* TEXT */
			/* ANIMATION */
			/* EFFECT */
		}
	}
</style>
