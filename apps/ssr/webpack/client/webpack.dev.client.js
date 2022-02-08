const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = (config) => ({
	...config,
	devtool: 'eval-source-map',
	output: {
		...config.output,
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].chunk.js',
	},
	module: {
		...config.module,
		rules: [
			...config.module.rules,
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					ExtractCssChunks.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: {
								localIdentName: '[name]-[local]-[hash:base64:5]',
							},
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [autoprefixer()],
							sourceMap: true,
						},
					},
					'sass-loader',
				],
			},
			{
				test: /\.css$/,
				include: /(node_modules|app)/,
				use: [ExtractCssChunks.loader, 'css-loader'],
			},
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
				},
			},
			{
				test: /\.svg$/,
				exclude: /fonts/,
				use: [
					{
						loader: 'svg-sprite-loader',
						options: {
							symbolId: 'icon-[name]',
						},
					},
					{
						loader: 'svgo-loader',
						options: {
							plugins: [{ removeAttrs: { attrs: '*:fill:none' } }],
						},
					},
				],
			},
		],
	},
	plugins: [
		...config.plugins,
		new ExtractCssChunks({
			ignoreOrder: true,
		}),
		new LoadablePlugin(),
		new ProgressBarPlugin(),
		new webpack.ProvidePlugin({
			fetch: 'exports-loader?self.fetch!whatwg-fetch',
		}),
	],
});
