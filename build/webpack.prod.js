const { merge } = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const commonConfig = require('./webpack.common.js')

let plugins = []
if(process.env.NODE_ENV === 'analyze'){
  plugins.push(new BundleAnalyzerPlugin())
}
 const prodConfig = {
  mode: 'production',
  // 开发环境最佳实践：cheap-module-eval-source-map  生产环境最佳实践：cheap-module-source-map
  devtool: 'cheap-module-source-map', // none source-map....
  plugins
}

module.exports = merge(commonConfig, prodConfig)