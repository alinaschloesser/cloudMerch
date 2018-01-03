const webpack = require('webpack');
const { resolve } = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const publicPath = '/';

const config = {
	devtool: 'eval-source-map',
	entry: [
		'react-hot-loader/patch',
		'webpack-hot-middleware/client',
		'./src/index.js',
	],
	output: {
		filename: '[name].[hash].js',
		publicPath: publicPath,
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader',
				})),
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new ExtractTextPlugin('style.css'),
		new webpack.NamedModulesPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: ({ resource }) => /node_modules/.test(resource),
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),		
		new webpack.HotModuleReplacementPlugin(),		
		new webpack.NoEmitOnErrorsPlugin(),
	],
};

module.exports = config;