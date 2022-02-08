const path = require('path');
const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = (config) => ({
	...config,
	devtool: 'cheap-module-source-map',
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
			hot: true,
			cssModules: true,
		}),
		new webpack.ProvidePlugin({
			window: path.resolve(path.join(__dirname, './../window.mock')),
			document: path.resolve(path.join(__dirname, './../document.mock')),
		}),
	],
});
