const webpack = require('webpack')

const config = require('./config/config')

const base = require('./webpack.base.config')

const CleanWebpackPlugin = require('clean-webpack-plugin') // 清除dist文件夹中重复的文件

const CopyWebpackPlugin = require('copy-webpack-plugin') // 拷贝静态文件

var path = require('path')

const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // 用于优化或者压缩CSS资源

const merge = require('webpack-merge')

module.exports = merge(base, {
  devtool: 'source-map',
  // output:{
  //   // 打包后html内引入文件是相对路径还是绝对路径
  //   publicPath: "./"
  // },
  plugins: [
    // 1.清除打包后重复的文件夹
    new CleanWebpackPlugin(config.build.cleanList),
    // 2.压缩JS
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // 3、压缩/优化CSS
    new OptimizeCssAssetsWebpackPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // 4、通过配置了DefinePlugin，那么这里面的标识就相当于全局变量，你的业务代码可以直接使用配置的标识。
    new webpack.DefinePlugin({
      environment: JSON.stringify(process.env.BUILD_ENV) // 判断当前打包环境的全局变量，这里有两种（production， test）
    }),
    // 5、提取不同入口使用共同的CSS、JS，結合base內的vendor-------(用来将公共模块提取出来)
    /*
    CommonsChunkPlugin主要是用来提取第三方库和公共模块，避免首屏加载的bundle文件或者按需加载的bundle文件体积过大，从而导致加载时间过长，
    着实是优化的一把利器。
    */
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vender',
      filename: 'js/[name].js',
      minChunks: function (module,count) {
        //"有正在处理文件" + "这个文件是 .js 后缀" + "这个文件是在 node_modules 中"
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, './node_modules')) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
      filename: 'js/[name].js',
      chunks: ['vender']
    }),
    // 拷贝静态文件
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, './src/static'),
      to: 'static',
      ignore: ['.*']
    }])
  ]
})