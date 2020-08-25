const { merge } = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const commonConfig = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 分离css 不支持HMR
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css 压缩

let plugins = [
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
    ignoreOrder: false, // Enable to remove warnings about conflicting order
  }),
]
if(process.env.NODE_ENV === 'analyze'){
  plugins.push(new BundleAnalyzerPlugin())
}
 const prodConfig = {
  mode: 'production',
  // 开发环境最佳实践：cheap-module-eval-source-map  生产环境最佳实践：cheap-module-source-map
  devtool: 'cheap-module-source-map', // none source-map....
  module: {
    rules: [{
        test: /\.scss$/,
        // 注意loader执行顺序  从下往上  从右往左
        use: [
          MiniCssExtractPlugin.loader,
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
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ]
  },
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
  plugins
}

module.exports = merge(commonConfig, prodConfig)