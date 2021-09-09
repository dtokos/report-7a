module.exports = {
	purge: {content: ['./public/**/*.html', './src/**/*.vue']},
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			width: {
				18: '4.5rem',
			},
			padding: {
				18: '4.5rem',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/forms'),
	],
}
