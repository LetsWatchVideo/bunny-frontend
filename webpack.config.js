const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const __DEV__ = process.env.NODE_ENV === 'development';

const plugins = [
	new webpack.LoaderOptionsPlugin({
		options: {
			tslint: {
				configFile: './.eslintrc'
			}
		}
	}),
	new CopyWebpackPlugin(['static']),
	new webpack.DefinePlugin({
		'process.env.SENTRY_DSN': JSON.stringify(process.env.SENTRY_DSN)
	}),
	new HtmlWebpackPlugin({
		title: 'letswatch',
		template: 'src/index.html'
	}),
	new webpack.ProvidePlugin({
		Tether: 'tether'
	}),
	new MiniCssExtractPlugin({
		filename: 'css/[name].css?[contenthash]',
		chunkFilename: 'css/[name].css?[contenthash]'
	}),
];

if (__DEV__) {
	plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
	mode: __DEV__ ? 'development' : 'production',
	entry: __DEV__
		? [
			// 'webpack-dev-server/client',
			'webpack/hot/only-dev-server',
			'whatwg-fetch',
			'./src/index.js'
		]
		: [
			'whatwg-fetch',
			'./src/index.js'
		],
	module: {
		rules: [{
			enforce: 'pre',
			test: /\.js$/,
			exclude: /node_modules/,
			use: 'eslint-loader'
		},
		{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: 'babel-loader'
		},
		{
			test: /\.css$/,
			use: [{
				loader: MiniCssExtractPlugin.loader,
				options: {
					hmr: process.env.NODE_ENV === 'development'
				}
			},
			'css-loader',
			'postcss-loader'
			]
		}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/', // path that will be considered when requiring your files
		filename: 'js/[name].bundle.js'
	},
	devServer: {
		inline: true,
		contentBase: './dist',
		hot: __DEV__,
		historyApiFallback: true
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all',
					priority: 10,
					reuseExistingChunk: true,
					enforce: true
				}
			}
		}
	},
	plugins,
};
