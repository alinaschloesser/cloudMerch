const webpack = require('webpack');
const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const publicPath = '/';

module.exports = {
	devtool: 'eval-source-map',
	entry: [
		'react-hot-loader/patch',
		'webpack-hot-middleware/client',
		'./src/index.js',
	],
	output: {
		filename: '[name].bundle.js',
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