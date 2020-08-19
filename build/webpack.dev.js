const webpack = require('webpack')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
 const devConfig = {
  mode: 'development',
  // 开发环境最佳实践：cheap-module-eval-source-map  生产环境最佳实践：cheap-module-source-map
  devtool: 'cheap-module-eval-source-map', // none source-map....
  devServer: {
    contentBase: './dist',
    open: true,
    port: 8090,
    hot: true, // 开启HMR(Hot Module Replacement) 热更新  需要配合webpack自带插件：new webpack.HotModuleReplacementPlugin()
    // hotOnly: true, // 即便hmr失效，也不让浏览器自动刷新
    proxy: {
      '/api': 'http://localhost:3000',
    }
  },
  // plugins 在webpack运行到某一个时刻，会帮你做一些事情  ----生命周期有点像
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    usedExports: true //导入的模块被使用了，我们才会被打包进去
  }
}

module.exports = merge(commonConfig, devConfig)