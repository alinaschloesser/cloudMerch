const webpack = require('webpack');
const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const publicPath = '/';

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: {
		app: [
			'react-hot-loader/patch',
			'webpack-hot-middleware/client',
			'./src/index.js',
		],
		vendor: ['react', 'react-dom', 'react-redux', 'redux-thunk', 'react-router'],
	},
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[name].chunk.js',
		path: resolve(__dirname, 'dist'),
		publicPath: publicPath,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['babel-preset-env', 'react'],
					},
				},
			},
			{
				test: /\.css$/,
				use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader',
				})),
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader',
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: 'my-index.ejs',
		}),
		new ExtractTextPlugin('style.css'),
		new webpack.optimize.OccurrenceOrderPlugin(),		
		new webpack.HotModuleReplacementPlugin(),		
		new webpack.NoEmitOnErrorsPlugin(),
	],
};