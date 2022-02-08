const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = (config) => ({
	...config,
	mode: 'production',
	devtool: undefined,
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
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: {
								localIdentName: '[hash:base64:5]',
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
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
		new MiniCssExtractPlugin({
			filename: '[name].[chunkhash].css',
			chunkFilename: '[name].[chunkhash].css',
		}),
		new LoadablePlugin(),
		new ProgressBarPlugin(),
		new webpack.ProvidePlugin({
			fetch: 'exports-loader?self.fetch!whatwg-fetch',
		}),
	],
});
