var config  = {
	entry:[
		'./app/App.js'
	],
	output:{
		path:__dirname,
		filename:'./assets/js/bundle.js'
	},
	module:{
		loaders:[
			{
				test:/\.jsx?$/,
				loader:'babel',
				exclude:/node_modules/,
				query:{
					presets : ['es2015','react']
				}
			}
		]
	}
};

module.exports = config;