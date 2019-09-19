const path = require('path');
const webpack = require('webpack');
module.exports = {
	webpack(config, { isServer }) {

		if (config.optimization.splitChunks.cacheGroups && config.optimization.splitChunks.cacheGroups.lib) {
			config.optimization.splitChunks.cacheGroups.lib.test = module => {
			  const identifier = module.identifier();
			  return (
				module.size() > 160000 && /node_modules[/\\]/.test(identifier) && !/^.+css-loader\//.test(identifier)
			  );
			};
		}

        if (isServer) {
            config.plugins.push(new webpack.ProvidePlugin({
                'fetch': ['cross-fetch']
            }))
        }

        config.externals = {
            'fetch': 'fetch'
        };
        

        config.plugins.push( new webpack.DefinePlugin({
            self: 'global'
         }));

		if (!isServer) {
			config.node = {
				fs: 'empty'
			}
		}

		return config;
	},
	poweredByHeader: false,
	experimental: {
		terserLoader: true,
		modern: true,
		granularChunks: true,
	},
	future: {
		excludeDefaultMomentLocales: true,
	},
}