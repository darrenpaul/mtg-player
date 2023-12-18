<script lang="ts">
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';

	const onLogin = async () => {
		const response = await fetch('/api/public/login', {
			method: 'POST',
			body: JSON.stringify({
				email,
				password
			})
		});

		if (response.ok) {
			goto('/dashboard');
		}
	};
</script>

<div>
	<h1>Login</h1>

	<form on:submit|preventDefault={onLogin}>
		<div class="input-group">
			<label for="email">Email</label>
			<input type="email" id="email" name="email" bind:value={email} />
		</div>

		<div class="input-group">
			<label for="password">Password</label>
			<input type="password" id="password" name="password" bind:value={password} />
		</div>

		<button>Login</button>
	</form>

	<a href="/register">Register</a>
</div>
