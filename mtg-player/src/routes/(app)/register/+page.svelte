<script lang="ts">
	let username = '';
	let email = '';
	let password = '';

	const onRegister = async () => {
		const response = await fetch('/api/public/register', {
			method: 'POST',
			body: JSON.stringify({
				username,
				email,
				password
			})
		});
	};
</script>

<div>
	<h1>Register</h1>

	<form on:submit|preventDefault={onRegister}>
		<div class="input-group">
			<label for="username">Username</label>
			<input type="username" id="username" name="username" bind:value={username} />
		</div>

		<div class="input-group">
			<label for="email">Email</label>
			<input type="email" id="email" name="email" bind:value={email} />
		</div>

		<div class="input-group">
			<label for="password">Password</label>
			<input type="password" id="password" name="password" bind:value={password} />
		</div>

		<button>Register</button>
	</form>
</div>
