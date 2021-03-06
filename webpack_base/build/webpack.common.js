const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
const devConfig = require('./webpack.dev')
const prodConfig = require('./webpack.prod')
console.log(process.env.NODE_ENV, 'NODE_ENV', merge)

const commonConfig = {
  performance: false, // 移除警告
  entry: {
    main: ['./src/index.js'],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    // publicPath: './', // 根路径
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
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],

        // 这里的配置跟我在.babelrc文件配置是一样的
        // options: {
        //   presets: ["@babel/preset-env"]
        // },
      },
    ],
  },
  // plugins 在webpack运行到某一个时刻，会帮你做一些事情  ----生命周期有点像
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'), // 这里写 './index.html' 也是可以的 不知道为什么
      title: 'webpack学习',
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    // 当我发现有个模块用了$字符串，那么回自动引入jquery这个库
    // 不局限于第三方库，自定义库也可以实现，切记
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'lodash', // 引用整个lodash
      _join: ['lodash', 'join'], // 只引用lodash里面的join方法
    }),
  ],
  optimization: {
    runtimeChunk: {
      name: 'runtime', // manifest
    },
    usedExports: true, //导入的模块被使用了，我们才会被打包进去
    splitChunks: {
      chunks: 'all', // 表示是对那些chunks实行代码分割 可能值有：all，async和initial  默认值：async
      // minSize: 30000, // 模块大于30kb我才会代码分割
      // // maxSize: 50000, // 二次分割 lodash 本身1mb  他会分割成两个50kb的lodash
      // minChunks: 1, // 同一个模块被引用次数
      // maxAsyncRequests: 5, // 一个模块同时加载的其他模块数
      // maxInitialRequests: 3, // 入口文件加载的数量
      // automaticNameDelimiter: '~', // 文件名连接符
      // automaticNameMaxLength: 30,
      // name: true,
      // cacheGroups: {
      //   vendors: {
      //     test: /[\\/]node_modules[\\/]/,
      //     priority: -10
      //   },
      //   default: {
      //     minChunks: 2,
      //     priority: -20,
      //     reuseExistingChunk: true
      //   }
      // },
    },
  },
}

module.exports = (env) => {
  if (env && env.production) {
    return merge(commonConfig, prodConfig)
  } else {
    return merge(commonConfig, devConfig)
  }
}
