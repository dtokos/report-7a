module.exports = {
	pluginOptions: {
		electronBuilder: {
			mainProcessFile: 'src/host/main.js',
			mainProcessWatch: ['src/host/api.js'],

			rendererProcessFile: 'src/client/main.js',
			preload: 'src/client/preload.js',
		},
	},
};
