const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
 const prodConfig = {
  mode: 'production',
  // 开发环境最佳实践：cheap-module-eval-source-map  生产环境最佳实践：cheap-module-source-map
  devtool: 'cheap-module-source-map' // none source-map....
}

module.exports = merge(commonConfig, prodConfig)