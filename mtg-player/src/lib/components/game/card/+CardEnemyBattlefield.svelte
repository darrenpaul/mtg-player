<script lang="ts">
	import type { CardGame } from '$lib/types/card';
	import CardCounter from '$lib/components/game/card/+CardCounter.svelte';
	import CardContextMenu from '$lib/components/game/cardContextMenu/+CardContextMenu.svelte';
	import { trans } from '$lib/locales/translateCopy';
	import { board as boardStore, getCurrentPlayer } from '$lib/stores/boardStore';
	import { user as userStore } from '$lib/stores/userStore';
	import { updateCurrentPlayer } from '$lib/utils/game/player';
	import { game as gameStore } from '$lib/stores/gameStore';
	import { browser } from '$app/environment';

	export let card: CardGame;
	export let player;
	export let responsive: boolean = false;
	export let parentSize: { width: number; height: number };

	let previewing = false;
	let showContextMenu = false;
	let faceIndex = 0;
	let cardImage = '';
	let cardWidth = 146;
	let cardHeight = 204;
	let cardX = card.x;
	let cardY = card.y;

	$: faceIndex = card.faceIndex;
	$: cardImage = card.cardFaces[faceIndex];

	$: {
		if (responsive && browser && card) {
			cardWidth = 73;
			cardHeight = 102;

			if (parentSize.width > 0 && parentSize.height > 0 && card.x > 0 && card.y > 0) {
				const xPercentage = (parentSize.width * 100) / card.clientResolution?.width || 0;
				const yPercentage = (parentSize.height * 100) / card.clientResolution?.height || 0;

				cardX = (card.x * xPercentage) / 100;
				cardY = (card.y * yPercentage) / 100;
			}
		}
	}

	const onCardPreview = () => {
		previewing = true;
	};

	const onMouseExit = () => {
		previewing = false;
		showContextMenu = false;
	};

	const onTakeControl = () => {
		const battlefield = getCurrentPlayer().battlefield;
		card.x = 0;
		card.y = 0;
		const newCards = [...battlefield, card];

		const newPlayerState = updateCurrentPlayer($boardStore.players, $userStore.username, {
			battlefield: newCards
		});

		boardStore.set({ ...$boardStore, players: newPlayerState });

		const newEnemyBattlefield = player.battlefield.filter(
			(battleFieldCard) => battleFieldCard.id !== card.id
		);

		const newEnemyPlayerState = updateCurrentPlayer($boardStore.players, player.username, {
			battlefield: newEnemyBattlefield
		});

		boardStore.set({ ...$boardStore, players: newEnemyPlayerState });

		onSaveCard();
	};

	const onSaveCard = async () => {
		await fetch('/api/game', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: $gameStore.id, board: $boardStore })
		});
	};
</script>

<button
	class="card"
	style={`left:${cardX}px; top:${cardY}px;`}
	on:click={onCardPreview}
	on:contextmenu|preventDefault={() => (showContextMenu = true)}
	on:mouseleave={onMouseExit}
>
	<div class={card.tapped ? 'transform rotate-90' : ''}>
		<img
			id="card"
			class="card-normal"
			width={cardWidth}
			height={cardHeight}
			src={cardImage}
			alt={card.name}
		/>

		<CardCounter counters={card.counters} />
	</div>

	<CardContextMenu show={showContextMenu}>
		<div>
			<button type="button" on:click={onTakeControl}>{trans('component.card.takeControl')}</button>
		</div>
	</CardContextMenu>
</button>

{#if previewing}
	<div class="card-preview">
		<img src={cardImage} alt={card.name} />
	</div>
{/if}

<style lang="postcss">
	.card {
		/* SIZE */
		/* MARGIN & PADDING */
		/* DISPLAY */
		@apply block absolute z-10;
		/* ALIGNMENT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION */
		/* EFFECT */

		.card-normal {
			/* SIZE */
			/* MARGIN & PADDING */
			/* DISPLAY */
			/* ALIGNMENT */
			/* BORDERS */
			@apply rounded-xl;
			/* COLORS */
			/* TEXT */
			/* ANIMATION */
			/* EFFECT */
		}
	}

	.card-preview {
		/* SIZE */
		@apply w-[438px];
		/* MARGIN & PADDING */
		/* DISPLAY */
		@apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden z-50;
		/* ALIGNMENT */
		/* BORDERS */
		@apply rounded-2xl;
		/* COLORS */
		/* TEXT */
		/* ANIMATION */
		/* EFFECT */
		@apply pointer-events-none;
	}
</style>
