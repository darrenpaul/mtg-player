<script lang="ts">
	export let decks;
</script>

<div>
	<h1>Decks</h1>

	{#each decks.items as deck}
		<div>
			<a href={`dashboard/deck/${deck.id}`}>
				{deck.name}
			</a>
		</div>
	{/each}
</div>
