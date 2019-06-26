const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')

// Splitchunks configuration.
const splitChunks = {
  cacheGroups: {
    default: false,
    commons: {
      test: /[\\/]node_modules[\\/]/,
      name: 'vendor_app',
      chunks: 'all',
      minChunks: 2,
    },
  },
}

module.exports = merge(common, {
   devtool: '',
	 mode: 'production',
	 externals: [
		 'react',
		 'react-dom',
	 ],
	 plugins: [
		 new BundleAnalyzer({
			 analyzerMode: 'static',
			 reportFileName: path.resolve(__dirname, 'report.html'),
		 })
	 ],
   optimization: {
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
				cssProcessorOptions: {
					preset: ['default', { discardComments: { removeAll: true } }]
				}
			}),
    ],
    runtimeChunk: false,
    splitChunks,
  },
})
