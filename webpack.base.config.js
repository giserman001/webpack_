let HtmlWebpackPlugins = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin') // 抽离css
var path = require('path')
const config = require('./config/config')
module.exports = {
  entry: {
    main: './src/app.js',
    vender: config.dev.VENDOR
  },
  output: {
    path: path.resolve(__dirname, config.build.outputProjectPath),
    filename: 'js/[name]-[hash].js',
    // publicPath: './app',
    // 找文章理解
    // chunkFilename和webpack.optimize.CommonsChunkPlugin插件的作用差不多，都是用来将公共模块提取出来，
    /*
    * chunkFilename用来打包require.ensure方法中引入的模块,如果该方法中没有引入任何模块则不会生成任何chunk块文件
    * 比如在main.js文件中,require.ensure([],function(require){alert(11);}),这样不会打包块文件
    * 只有这样才会打包生成块文件require.ensure([],function(require){alert(11);require('./greeter')})
    * 或者这样require.ensure(['./greeter'],function(require){alert(11);})
    * chunk的hash值只有在require.ensure中引入的模块发生变化,hash值才会改变
    * 注意:对于不是在ensure方法中引入的模块,此属性不会生效,只能用CommonsChunkPlugin插件来提取
    * */
    chunkFilename: 'js/[name].[chunkhash:5].chunk.js'
  },
  resolve: {
    extensions: ['.js', '.coffee', '.css'],
    alias: {
      '@': './js',
      '#': './style'
    }
  },
  module: {
    rules: [
      //1.1 解析压缩css,css-loader，
      {
        test: /\.css$/,
        // css抽离出来
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use:[
              { loader: "css-loader", options: { importLoaders: 1 }}, //对于css中@import进来的css同样做前缀处理
              { loader: 'postcss-loader', options: { sourceMap: true } }
            ]
        })
      },
      // 1.4 使用stylus-loader 编译 .stylus为CSS
      {
        test:/\.styl$/,
        use:ExtractTextPlugin.extract({
            fallback:"style-loader",
            use:[
              {loader: "css-loader"},
              // "postcss-loader", // 添加浏览器前缀
              {loader: 'postcss-loader', options: { sourceMap: true }},
              {loader: "stylus-loader"}
            ]
        })
      },
      //2 处理图片,图片路径需是相对路径才能看到效果(一般不需要)
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000,
              // 默认打包到输出文件夹下的image文件夹
              name:'images/[name].[hash:7].[ext]'
            }
          }
        ]
      },
      //3 编译js或者es6
      {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      //4 处理字体（如：引入字体图标）
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              // fonts/打包到dist下的fonts文件夹
              name: 'fonts/[name].[hash:7].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    //5、提取css到单独的文件夹
    new ExtractTextPlugin({
      //加上/css就会输出到css文件夹下面
      filename: 'css/app_[hash].css',
      // filename:'app_[chunkhash].css',
      disable: false,
      allChunks: true
    }),
    new HtmlWebpackPlugins({
      title: 'test页面',
      filename: 'index.html?version=[hash]',
      template: config.dev.indexHtml,
      favicon:'./images/favicon.ico',
      inject: true|'body',
      minify: {
        //移除HTML中的注释
        removeComments: true,
        //删除空白符与换行符
        collapseWhitespace: false,
        collapseWhitespace:true
      },
    })
  ]
}