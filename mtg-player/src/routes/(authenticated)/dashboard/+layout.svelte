<script lang="ts">
	import { browser } from '$app/environment';
	import Navigation from '$lib/components/navigation/+Navigation.svelte';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { user as userStore } from '$lib/stores/userStore';

	export let data;

	if (browser) {
		userStore.set(data.user);
	}
</script>

<Navigation />
<slot />
