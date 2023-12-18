<script lang="ts">
	import CreateGameForm from '$lib/components/createGameForm/+CreateGameForm.svelte';

	export let data;
	let user = data.user;
	let decks = data.decks;
</script>

<CreateGameForm {user} {decks} />
