<script lang="ts">
	import { trans } from '$lib/locales/translateCopy';
	import { FRIENDS_API } from '$lib/routesApi';

	let friendUsername: string = '';

	const onAddFriend = async () => {
		await fetch(FRIENDS_API, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ friendUsername })
		});
	};
</script>

<form on:submit|preventDefault={onAddFriend}>
	<div class="input-group">
		<label for="friendUsername">{trans('component.addFriendForm.friendUsername')}</label>
		<input type="username" id="friendUsername" name="friendUsername" bind:value={friendUsername} />
	</div>

	<button class="submit-button">{trans('component.addFriendForm.addFriend')}</button>
</form>
