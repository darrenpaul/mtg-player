<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(async () => {
		await fetch('/api/authenticated/logout', {
			method: 'GET'
		});

		goto('/login');
	});
</script>

<div>
	<p>Logging out</p>
</div>
