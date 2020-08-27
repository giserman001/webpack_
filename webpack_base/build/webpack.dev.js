const webpack = require('webpack')
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
  module: {
    rules: [{
        test: /\.scss$/,
        // 注意loader执行顺序  从下往上  从右往左
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 0, // 让import css 也会走'sass-loader'和'postcss-loader'
              // modules: true
            },
          },
          'postcss-loader', // 添加css前缀 -webkit- -moz- ...等  一定要注意顺序
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ]
  },
  // plugins 在webpack运行到某一个时刻，会帮你做一些事情  ----生命周期有点像
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  }
}

module.exports = devConfig