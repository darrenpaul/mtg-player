<script lang="ts">
	import { trans } from '$lib/locales/translateCopy';

	export let show: boolean = false;
	export let onSave: () => void;
	let insertIndex: number = 0;

	const onClose = () => {
		show = false;
	};
</script>

{#if show}
	<div class="library-drop-modal">
		<div class="header">
			<h1>{trans('component.modal.peek')}</h1>

			<div class="group">
				<button class="submit-button" type="button" on:click={onClose}>
					{trans('component.modal.close')}
				</button>
			</div>
		</div>

		<form class="-form" on:submit|preventDefault={onSave}>
			<div class="input-group">
				<label for="insert-index">{trans('component.modal.insertXCardsFrom')}</label>
				<input type="number" id="insert-index" name="insertIndex" bind:value={insertIndex} />
			</div>

			<div class="row mb-4">
				<div class="-radio-item">
					<input
						checked
						id="library-drop-modal-radio-1"
						type="radio"
						value={trans('component.modal.top')}
						name="insertPosition"
						class="-radio-input"
					/>
					<label for="library-drop-modal-radio-1" class="-radio-label">
						{trans('component.modal.top')}
					</label>
				</div>

				<div class="-radio-item">
					<input
						id="library-drop-modal-radio-2"
						type="radio"
						value={trans('component.modal.bottom')}
						name="insertPosition"
						class="-radio-input"
					/>
					<label for="library-drop-modal-radio-2" class="-radio-label">
						{trans('component.modal.bottom')}
					</label>
				</div>
			</div>

			<button class="submit-button w-full">
				{trans('component.modal.save')}
			</button>
		</form>
	</div>
{/if}

<style lang="postcss">
	.library-drop-modal {
		/* SIZE */
		@apply w-96;
		/* MARGIN & PADDING */
		/* DISPLAY */
		@apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-auto z-50;
		/* ALIGNMENT */
		/* BORDERS */
		@apply border-2 rounded-lg;
		/* COLORS */
		@apply bg-white border-black;
		/* TEXT */
		/* ANIMATION */
		/* EFFECT */
		@apply shadow;

		.header {
			/* SIZE */
			/* MARGIN & PADDING */
			@apply p-4 mb-4;
			/* DISPLAY */
			@apply flex;
			/* ALIGNMENT */
			@apply items-center justify-between;
			/* BORDERS */
			@apply bg-black text-white;
			/* COLORS */
			/* TEXT */
			/* ANIMATION */
			/* EFFECT */

			.group {
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

		.-form {
			/* SIZE */
			/* MARGIN & PADDING */
			@apply p-4 pt-0;
			/* DISPLAY */
			/* ALIGNMENT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION */
			/* EFFECT */
		}

		.row {
			/* SIZE */
			/* MARGIN & PADDING */
			/* DISPLAY */
			@apply grid grid-cols-2 gap-4;
			/* ALIGNMENT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION */
			/* EFFECT */
		}

		.-radio-item {
			/* SIZE */
			/* MARGIN & PADDING */
			@apply ps-4;
			/* DISPLAY */
			@apply flex items-center;
			/* ALIGNMENT */
			/* BORDERS */
			@apply border rounded;
			/* COLORS */
			@apply border-gray-200;
			/* TEXT */
			/* ANIMATION */
			/* EFFECT */

			.-radio-input {
				/* SIZE */
				@apply w-4 h-4;
				/* MARGIN & PADDING */
				/* DISPLAY */
				/* ALIGNMENT */
				/* BORDERS */
				@apply focus:ring-0;
				/* COLORS */
				@apply text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500;
				/* TEXT */
				/* ANIMATION */
				/* EFFECT */
			}

			.-radio-label {
				/* SIZE */
				@apply w-full;
				/* MARGIN & PADDING */
				@apply py-4 ms-2;
				/* DISPLAY */
				/* ALIGNMENT */
				/* BORDERS */
				/* COLORS */
				@apply text-gray-900;
				/* TEXT */
				@apply text-sm font-medium;
				/* ANIMATION */
				/* EFFECT */
			}
		}
	}
</style>
