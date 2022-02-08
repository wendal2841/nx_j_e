const webpackBaseServer = require('./webpack.base.server');
const webpackDevServer = require('./webpack.dev.server');
const webpackProdServer = require('./webpack.prod.server');

module.exports = (config) => {
	const srcPath = config.entry.main[0];

	const baseServerConfig = webpackBaseServer(config, srcPath);

	if (config.mode === 'production') {
		return webpackProdServer(baseServerConfig);
	}

	return webpackDevServer(baseServerConfig);
};
