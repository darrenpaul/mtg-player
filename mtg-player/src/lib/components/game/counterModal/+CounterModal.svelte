<script lang="ts">
	import { trans } from '$lib/locales/translateCopy';

	export let show: boolean = false;
	export let onAddCounter: () => void;
	export let onRemoveCounter: () => void;

	const counters = [
		'+1/+1',
		'-1/-1',
		'Poison',
		'Energy',
		'Charge',
		'Loyalty',
		'Experience',
		'Level',
		'Time',
		'Quest',
		'Bounty',
		'Aim',
		'Blaze',
		'Brib'
	];

	const onClose = () => {
		show = false;
	};
</script>

{#if show}
	<div class="peek-modal">
		<div class="header">
			<h1>{trans('component.counterModal.counters')}</h1>

			<div class="group">
				<button class="submit-button" type="button" on:click={onClose}>
					{trans('component.counterModal.close')}
				</button>
			</div>
		</div>

		{#each counters as counter}
			<div>
				<h3>{counter}</h3>

				<div class="flex">
					<button class="submit-button" type="button" on:click={onAddCounter(counter)}>
						{trans('component.counterModal.add')}
					</button>

					<button class="submit-button" type="button" on:click={onRemoveCounter(counter)}>
						{trans('component.counterModal.remove')}
					</button>
				</div>
			</div>
		{/each}
	</div>
{/if}

<style lang="postcss">
	.peek-modal {
		/* SIZE */
		@apply w-fit h-screen;
		/* MARGIN & PADDING */
		/* DISPLAY */
		@apply absolute top-0 left-0 overflow-y-auto z-20;
		/* ALIGNMENT */
		/* BORDERS */
		@apply rounded-lg;
		/* COLORS */
		@apply bg-white;
		/* TEXT */
		/* ANIMATION */
		/* EFFECT */

		.header {
			/* SIZE */
			/* MARGIN & PADDING */
			@apply mb-4;
			/* DISPLAY */
			@apply flex;
			/* ALIGNMENT */
			@apply items-center justify-between;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION */
			/* EFFECT */

			.group {
				/* SIZE */
				/* MARGIN & PADDING */
				/* DISPLAY */
				@apply flex;
				/* ALIGNMENT */
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				/* ANIMATION */
				/* EFFECT */
			}
		}

		.peek-cards {
			/* SIZE */
			/* MARGIN & PADDING */
			/* DISPLAY */
			@apply flex flex-col gap-4;
			/* ALIGNMENT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION */
			/* EFFECT */
		}
	}
</style>
