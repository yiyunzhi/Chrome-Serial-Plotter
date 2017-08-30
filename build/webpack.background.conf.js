var path = require('path');

module.exports = {
	entry: {
		background:'./src/background/index.js'
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].js'
	},
	resolve: {

	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [ path.resolve(__dirname, './src') ]
			}
		]
	}
};
