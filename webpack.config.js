let {join} = require("path");
let webpack = require('webpack');
let htmlWebpackPlugin = require('html-webpack-plugin');
//let BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');

module.exports = {
	devtool: 'source-map',
	entry: "./js/app.js",
	context: join(__dirname, "src"),
	output: {
		path: join(__dirname, 'build'),
		filename: 'build.js',
		//publicPath: '/'
	},
	module: {
		loaders: [
			{loader: 'babel-loader', test: /\.js$/, exclude: /node_modules/},
			{loader: 'style-loader!css-loader', test: /\.css$/, exclude: /node_modules/},
			{loader: 'style-loader!css-loader!sass-loader', test: /\.scss$/, exclude: /node_modules/},
		]
	},
	devServer: {
		contentBase: join(__dirname, 'build')
	},
	plugins: [
		//new BellOnBundlerErrorPlugin(),
		/*new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),*/
		new htmlWebpackPlugin({
			template: join(__dirname, 'src/index.html'),
			inject: 'body'
		})
	]
}
