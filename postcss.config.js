module.exports = {
	plugins: {
		'postcss-import': {},
		'postcss-preset-env': {
			stage: 0,
			browsers: ['last 2 versions', '> 5%'],
			features: {
				'color-mod-function': true,
			}
		}
	},
};
