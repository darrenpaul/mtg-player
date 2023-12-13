const game = {
	turn: Number,
	players: [
		{
			player: String,
			deck: String,
			graveyard: Array<string>,
			exile: Array<string>,
			board: [
				{
					id: String
				}
			]
		}
	]
};
