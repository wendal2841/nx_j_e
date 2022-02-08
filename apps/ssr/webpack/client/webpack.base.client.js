const path = require('path');
const webpack = require('webpack');

module.exports = (config, srcPath) => ({
	name: 'client',
	target: 'web',
	mode: config.mode,
	entry: {
		app: [path.join(srcPath, './app/client/index.tsx')],
	},
	output: {
		path: config.output.path,
		publicPath: '/',
	},
	module: {
		...config.module,
		rules: [
			{
				test: /\.([jt])sx?$/,
				loader: '@nrwl/web/src/utils/web-babel-loader',
				exclude: /node_modules/,
				options: {
					rootMode: 'upward',
					emitDecoratorMetadata: true,
					isModern: true,
					envName: undefined,
					babelrc: true,
					cacheDirectory: true,
					cacheCompression: false,
				},
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(config.mode),
		}),
	],
	resolve: {
		plugins: config.resolve.plugins,
		extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx'],
		modules: ['@nrwl/web/node_modules', 'node_modules'],
		symlinks: true,
		mainFields: ['browser', 'module', 'main'],
	},
	watch: config.watch,
	watchOptions: config.watchOptions,
	stats: config.stats,
	performance: config.performance,
});
