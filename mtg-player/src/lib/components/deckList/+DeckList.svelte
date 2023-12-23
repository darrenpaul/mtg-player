<script lang="ts">
	import { DECK_ROUTE } from '$lib/routes';
	import type { Deck } from '$lib/types/deck';

	export let decks: Deck[] = [];
</script>

<div>
	<h1>Decks</h1>

	{#each decks as deck (deck.id)}
		<a href={DECK_ROUTE.path(deck.id)}>
			{deck.name}
		</a>
	{/each}
</div>
