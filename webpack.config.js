var Path = require('path'),
	ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

	// Modules to load on startup
	// Entry point
	entry: [
		'./src/index.html',
		'./src/js/index.jsx'
	],

	// Specify the output path and file name
	output: {
		path: './production',
		filename: '[name].js'
	},

	module: {
		loaders: [

		// transpile jsx -> js
		{
			test: /\.(js|jsx)$/, loader: 'babel-loader',
			query: {
				presets:['react']
			},
			include: [
				Path.resolve(__dirname, 'src/js')
			]
		},

		// .scss -> .css
		{
			test: /\.scss$/,
			loader: 'style!css!sass?outputStyle=expanded'
		},

		// match all css files
		{
			test: /\.css$/,
			loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
			//loader: 'style!css?'
		},

		// Allow loading json as module
		{
			test: /\.json$/,
			loader: 'json'
		},

		// Copy all html and icon files to prod directory
		{
			test: /\.(html|ico|png)$/,
			loader: 'file?name=[name].[ext]'
		},

		// fonts
		{
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        	loader: 'url-loader?limit=10000&mimetype=application/font-woff'
		},
		{
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader'
        },

		// Perform the linting if wanted
		{
			test: /\.(js|jsx)$/,
			loader: 'eslint-loader',
			include: [
				Path.resolve(__dirname, "src/js")
			]
		}
		]
	},
	plugins: [
		new ExtractTextPlugin('main.css')
	],
	resolve: {
		root: [
			Path.resolve(__dirname, 'src/js/main'),
			Path.resolve(__dirname, 'src/js/actions'),
			Path.resolve(__dirname, 'src/js/stores'),
			Path.resolve(__dirname, 'src/js/views'),
			Path.resolve(__dirname, 'src/js/components'),
			Path.resolve(__dirname, 'src/js/utils'),
			Path.resolve(__dirname, 'node_modules'),
			Path.resolve(__dirname),
		],
		extensions: ['', '.js', '.jsx', '.json']
	}
}
