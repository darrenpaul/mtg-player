<script lang="ts">
	import DeckList from '$lib/components/deckList/+DeckList.svelte';
	import { trans } from '$lib/locales/translateCopy';

	export let data;
	let name = '';
	let decks = [];

	$: {
		decks = data?.decks ?? [];
	}

	const onCreateDeck = async () => {
		const response = await fetch('/api/deck', {
			method: 'POST',
			body: JSON.stringify({ name })
		});
		const json = await response.json();
	};
</script>

<div class="decks-page">
	<div class="header">
		<h1>{trans('page.decks.myDecks')}</h1>

		<a class="submit-button" href="/decks/new">{trans('page.decks.createDeck')}</a>
	</div>

	<DeckList {decks} />
</div>

<style lang="postcss">
	.decks-page {
		/* SIZE */
		/* MARGIN & PADDING */
		/* DISPLAY */
		/* ALIGNMENT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION */
		/* EFFECT */

		.header {
			/* SIZE */
			/* MARGIN & PADDING */
			/* DISPLAY */
			@apply flex;
			/* ALIGNMENT */
			@apply items-center justify-between;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION */
			/* EFFECT */
		}
	}
</style>
