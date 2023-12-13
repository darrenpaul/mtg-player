<script lang="ts">
	import { browser } from '$app/environment';
	import { shuffleCards } from '$lib/utils/card/shuffleCards';
	import { getContext, onMount, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	const deckStore = writable([]);
	const cardsInHandStore: Writable<Array<any>> = getContext('cardsInHandStore');
	const boardStore: Writable<Array<any>> = getContext('boardStore');
	const userStore: Writable<Array<any>> = getContext('userStore');

	if (browser) {
		setContext('deckStore', deckStore);
	}

	onMount(() => {
		onFetchDeck();
	});

	const onFetchDeck = async () => {
		console.log($boardStore);
		const deckId = $boardStore.players.find((player) => player.email === $userStore.email).deck;

		if (!deckId) {
			return;
		}
		const response = await fetch(`/api/deck?slug=${deckId}`, {
			method: 'GET'
		});
		const jsonData = await response.json();
		console.log('onFetchDeck ~ jsonData:', jsonData);
		const cards = jsonData.cards.map((card) => {
			return {
				id: card.expand.cardId.id,
				name: card.expand.cardId.name,
				imageUrl: card.expand.cardId.images.small,
				tag: card.tag
			};
		});

		const commander = cards.find((card) => card.tag === 'commander');
		const shuffledCards = shuffleCards(cards);
		deckStore.set(shuffledCards);
	};

	const onDrawCard = () => {
		deckStore.update((deck) => {
			const drawnCard = deck.shift();
			cardsInHandStore.update((cardsInHand) => [...cardsInHand, drawnCard]);
			return deck.filter((card) => card.id !== drawnCard.id);
		});
	};
</script>

<button class="deck" type="button" on:click={onDrawCard}>
	<img
		src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/513b7bfa-42c9-4d08-ad6c-8e5d478c42d3/dalfpib-83f22b02-5802-40b4-901b-3eecf0ca2058.png/v1/fill/w_1024,h_1463,q_80,strp/unofficial_magic_the_gathering_six_color_card_back_by_lordnyriox_dalfpib-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQ2MyIsInBhdGgiOiJcL2ZcLzUxM2I3YmZhLTQyYzktNGQwOC1hZDZjLThlNWQ0NzhjNDJkM1wvZGFsZnBpYi04M2YyMmIwMi01ODAyLTQwYjQtOTAxYi0zZWVjZjBjYTIwNTgucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.OGsglye34mbde4lkXNsDFFCl83jSzl1zNBLep-hhyKY"
	/>
</button>

<style lang="postcss">
	.deck {
		/* SIZE */
		@apply w-[146px] h-[204px];
		/* MARGINS AND PADDING */
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
