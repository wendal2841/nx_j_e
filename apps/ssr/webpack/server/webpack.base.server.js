const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = (config, srcPath) => ({
	name: 'server',
	target: config.target,
	mode: config.mode,
	entry: path.join(srcPath, './app/server/main.ts'),
	devtool: config.devtool,
	externals: [nodeExternals(), 'react-helmet'],
	output: {
		filename: 'main.js',
		path: config.output.path,
		library: 'app',
		libraryTarget: 'commonjs2',
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
			'process.env': {
				NODE_ENV: JSON.stringify(config.mode),
				LOADABLE_STATS_FILE: JSON.stringify(config.output.path.replace('/server', '/client/loadable-stats.json')),
				CLIENT_OUTPUT_PATH: JSON.stringify(config.output.path.replace('/server', '/client')),
			},
		}),
	],
	resolve: config.resolve,
	watch: config.watch,
	watchOptions: config.watchOptions,
	stats: config.stats,
	performance: config.performance,
});
