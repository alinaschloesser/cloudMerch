const commonConfig = require('./config/webpack.common');
const webpackMerge = require('webpack-merge');

module.exports = (env) => {
	console.log(env);

	const envConfig = require(`./config/webpack.${env.env}.js`);

	return webpackMerge(commonConfig, envConfig);
};