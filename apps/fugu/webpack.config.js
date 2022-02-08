const getWebpackConfig = require('@nrwl/react/plugins/webpack');
const autoprefixer = require('autoprefixer');

module.exports = (config) => {
	const webpackConfig = getWebpackConfig(config);

	const { module } = webpackConfig;

	const rules = [
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
		{
			test: /\.css$/,
			use: [
				{ loader: 'style-loader' },
				{
					loader: 'css-loader',
					options: {
						importLoaders: 1,
					},
				},
				{ loader: 'sass-loader' },
			],
			sideEffects: true,
		},
		{
			test: /\.scss$/,
			use: [
				{ loader: 'style-loader' },
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2,
						modules: {
							mode: 'local',
							localIdentName: '[name]_[local]__[hash:base64:5]',
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
				{ loader: 'sass-loader' },
			],
		},
		{
			test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
			loader: 'url-loader',
			options: {
				limit: 10000,
				name: '[name].[hash:7].[ext]',
			},
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
	];

	return {
		...webpackConfig,
		module: {
			...module,
			rules,
		},
	};
};
