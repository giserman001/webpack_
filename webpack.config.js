const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader', // file-loader 基本一样 但是url-loader在图片小于某一个值时，会把图片转成base64
          options: {
            //默认情况下，生成的文件的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名
            // 但是我们设置options-name属性可以设置图片名字和原图片一样
            name: '[name]_[hash].[ext]', //placeholder 占位符  name： 原名字 hash： MD5哈希值 ext： 原图片扩展名
            outputPath: 'images/',
            limit: 2048 // 2048字节 = 2kb
          }
        }]
      },
      // 字体打包
      {
        test: /\.(eot|ttf|svg|woff)$/,
        use: {
          loader: 'file-loader'
        }
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
            }
          },
          'postcss-loader', // 添加css前缀 -webkit- -moz- ...等  一定要注意顺序
          'sass-loader'
        ]
      }
    ]
  },
  // plugins 在webpack运行到某一个时刻，会帮你做一些事情  ----生命周期有点像
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      // filename: 'test.html',
      title: 'webpack学习'
    }),
  ]
}