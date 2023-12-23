<script lang="ts">
	import { trans } from '$lib/locales/translateCopy';
	import { updateCurrentPlayer } from '$lib/utils/game/player';
	import { board as boardStore, getCurrentPlayer } from '$lib/stores/boardStore';
	import { user as userStore } from '$lib/stores/userStore';
	import { game as gameStore } from '$lib/stores/gameStore';
	import { saveActivity } from '$lib/stores/gameLogStore';

	let player = getCurrentPlayer();
	let health = 0;
	let commanderDamage = 0;

	$: player = getCurrentPlayer();
	$: health = player.health;
	$: commanderDamage = player.commanderDamage;

	const onRemoveHealth = () => {
		health = health - 1;
		const newPlayerState = updateCurrentPlayer($boardStore.players, $userStore.username, {
			health: health
		});

		boardStore.set({ ...$boardStore, players: newPlayerState });

		onSaveBoard();
	};

	const onAddHealth = () => {
		health = health + 1;
		const newPlayerState = updateCurrentPlayer($boardStore.players, $userStore.username, {
			health: health
		});

		boardStore.set({ ...$boardStore, players: newPlayerState });

		onSaveBoard();
	};

	const onRemoveCommanderHealth = () => {
		commanderDamage = commanderDamage - 1;
		const newPlayerState = updateCurrentPlayer($boardStore.players, $userStore.username, {
			commanderDamage: commanderDamage
		});

		boardStore.set({ ...$boardStore, players: newPlayerState });

		onSaveBoard();
	};

	const onAddCommanderHealth = () => {
		commanderDamage = commanderDamage + 1;
		const newPlayerState = updateCurrentPlayer($boardStore.players, $userStore.username, {
			commanderDamage: commanderDamage
		});

		boardStore.set({ ...$boardStore, players: newPlayerState });

		onSaveBoard();
	};

	const onSaveBoard = async () => {
		await fetch('/api/game', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: $gameStore.id, board: $boardStore })
		});
	};

	const onRollD20 = () => {
		const roll = Math.floor(Math.random() * 20) + 1;
		saveActivity(`Rolled D20: ${roll}`);
	};
</script>

<div class="health">
	<div class="group">
		<p>{trans('component.health.currentHealth')}</p>
		<button class="health-button" type="button" on:click={onRemoveHealth}>-</button>
		<p class="health-text">{health}</p>
		<button class="health-button" type="button" on:click={onAddHealth}>+</button>
	</div>

	<div class="group">
		<p>{trans('component.health.commanderDamage')}</p>
		<button class="health-button" type="button" on:click={onRemoveCommanderHealth}>-</button>
		<p class="health-text">{commanderDamage}</p>
		<button class="health-button" type="button" on:click={onAddCommanderHealth}>+</button>
	</div>

	<div class="group">
		<button class="submit-button" type="button" on:click={onRollD20}>
			{trans('component.health.rollD20')}
		</button>
	</div>
</div>

<style lang="postcss">
	.health {
		/* SIZE */
		@apply h-20;
		/* MARGINS AND PADDING */
		@apply p-4;
		/* LAYOUT */
		@apply flex gap-8;
		/* BORDERS */
		@apply border-2;
		/* COLORS */
		@apply border-black bg-black text-white;
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.group {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex items-center gap-4;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.health-text {
			/* SIZE */
			@apply w-10;
			/* MARGINS AND PADDING */
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			@apply text-2xl text-center;
			/* ANIMATION AND EFFECTS */
		}

		.health-button {
			/* SIZE */
			@apply w-[40px] h-[40px];
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex items-center justify-center;
			/* BORDERS */
			@apply rounded-full;
			/* COLORS */
			@apply bg-neutral-600;
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
