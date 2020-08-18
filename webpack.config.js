const webpack = require('webpack')
const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  // 开发环境最佳实践：cheap-module-eval-source-map  生产环境最佳实践：cheap-module-source-map
  devtool: 'cheap-module-eval-source-map', // none/source-map
  entry: {
    main: ['./src/index.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // 根路径
  },
  devServer: {
    contentBase: './dist',
    open: true,
    port: 8090,
    hot: true, // 开启HMR(Hot Module Replacement) 热更新  需要配合webpack自带插件：new webpack.HotModuleReplacementPlugin()
    hotOnly: true, // 即便hmr失效，也不让浏览器自动刷新
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader', // file-loader 基本一样 但是url-loader在图片小于某一个值时，会把图片转成base64
            options: {
              //默认情况下，生成的文件的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名
              // 但是我们设置options-name属性可以设置图片名字和原图片一样
              name: '[name]_[hash].[ext]', //placeholder 占位符  name： 原名字 hash： MD5哈希值 ext： 原图片扩展名
              outputPath: 'images/',
              limit: 2048, // 2048字节 = 2kb
            },
          },
        ],
      },
      // 字体打包
      {
        test: /\.(eot|ttf|svg|woff)$/,
        use: {
          loader: 'file-loader',
        },
      },
      {
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
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        // 这里的配置跟我在.babelrc文件配置是一样的
        // options: {
        //   presets: ["@babel/preset-env"]
        // },
      },
    ],
  },
  // plugins 在webpack运行到某一个时刻，会帮你做一些事情  ----生命周期有点像
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'webpack学习',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}
