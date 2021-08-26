module.exports = {
	pluginOptions: {
		electronBuilder: {
			mainProcessFile: 'src/host/main.js',
			mainProcessWatch: ['src/host/request.js'],

			rendererProcessFile: 'src/client/main.js',
			preload: 'src/client/preload.js',
		},
	},
};
