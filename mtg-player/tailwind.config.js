/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				poppins: ['Poppins', 'sans-serif']
			},
			height: {
				'navigation-desktop': '3rem'
			},
			zIndex: {
				navigation: '100',
				'mobile-menu': '200',
				'cart-menu': '300',
				'gdpr-consent': '400',
				notification: '500'
			},
			colors: {
				plains: '#fffacf',
				island: '#a0dbf9',
				swamp: '#c4bab7',
				forest: '#90cda4',
				mountain: '#f8a084'
			}
		}
	},
	plugins: []
};
