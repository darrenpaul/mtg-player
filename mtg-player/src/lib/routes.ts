// PUBLIC
export const REGISTER_ROUTE = {
	path: '/register',
	key: 'register',
	name: 'Register'
};

// PUBLIC
export const LOGIN_ROUTE = {
	path: '/login',
	key: 'login',
	name: 'Login'
};

// PUBLIC
export const LOGOUT_ROUTE = {
	path: '/logout',
	key: 'logout',
	name: 'Logout'
};

// PUBLIC
export const HOME_ROUTE = {
	path: '/',
	key: 'home',
	name: 'Home'
};

// PRIVATE
export const DECKS_ROUTE = {
	path: '/decks',
	key: 'decks',
	name: 'Decks'
};

// PRIVATE
export const DECK_ROUTE = {
	path: (id: string) => `/deck/${id}`,
	key: 'deck',
	name: 'Deck'
};

// PRIVATE
export const GAMES_ROUTE = {
	path: '/games',
	key: 'games',
	name: 'Games'
};

// PRIVATE
export const GAME_ROUTE = {
	path: (id: string) => `/game/${id}`,
	key: 'game',
	name: 'Game'
};
