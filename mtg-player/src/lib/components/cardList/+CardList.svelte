<script lang="ts">
	export let cards;
</script>

<div>
	<h1>Decks</h1>

	{#each cards as card}
		<div>
			<p>
				{card.expand.cardId.name}
			</p>

			<img src={card.expand.cardId.images.normal} alt={card.expand.cardId.name} />
		</div>
	{/each}
</div>
