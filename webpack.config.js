const path = require('path');

module.exports = {
	entry: './app/main',

	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'main.js',
		publicPath: '/js'
	},

	devServer: {
		contentBase: path.join(__dirname, 'public'),
	},

	devtool: 'cheap-eval-source-map' // remove for build
};