<script lang="ts">
	import CardSearch from '$lib/components/cardSearch/+CardSearch.svelte';
	import CardList from '$lib/components/cardList/+CardList.svelte';
	import CardBatchAdd from '$lib/components/cardBatchAdd/+CardBatchAdd.svelte';

	export let data;
	let deck = data.deck;
	let cards = data.cards;
</script>

<div>
	<h1>Deck</h1>

	<h1>{deck.name}</h1>

	<CardSearch />

	<CardBatchAdd />

	<CardList {cards} />
</div>
