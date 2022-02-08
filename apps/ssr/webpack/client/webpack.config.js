const webpackBaseClient = require('./webpack.base.client');
const webpackDevClient = require('./webpack.dev.client');
const webpackProdClient = require('./webpack.prod.client');

module.exports = (config) => {
	const srcPath = config.entry.main[0];

	const baseServerClient = webpackBaseClient(config, srcPath);

	if (config.mode === 'production') {
		return webpackProdClient(baseServerClient);
	}

	return webpackDevClient(baseServerClient);
};
