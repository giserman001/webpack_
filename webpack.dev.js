const path = require('path')
var webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const config = require('./config/config')

module.exports = box = merge(base, {
  devtool: 'cheap-module-eval-source-map',
  plugins: [
      new webpack.HotModuleReplacementPlugin(),
  ],
  // mode: 'development',
  devServer: {
    //1、 可指定服务器根目录如：src/root 方便本地查看，前提有该文件夹
    contentBase: path.join(__dirname, 'src'),
    inline: true,
    // 模块更新作用。即修改或模块后，保存会自动更新，页面不用刷新呈现最新的效果。
    hot: true,
    // 如果为 true ，开启虚拟服务器时，为你的代码进行压缩。加快开发流程和优化的作用。
    compress: true,
    clientLogLevel: 'warning',
    // bealen|Oject {rewrites,verbose,disableDotRule} 如果为 true ，页面出错不会弹出 404 页面。并不建议将路由写在这，一般 historyApiFallback: true 就行了。
    historyApiFallback: true,
    // true，则自动打开浏览器。
    open:true,
    // 端口号。默认 8080
    port: config.dev.port,
    //2、 指定本地电脑的IP作为host,方便同一个局域网手机查看效果，请填写自己本机的IP地址或者localhost
    // host: "172.16.9.142",
    host: "localhost",
    /**
     * 如果为 true ，在浏览器上全屏显示编译的errors或warnings。默认 false （关闭）
     * 如果你只想看 error ，不想看 warning。
    */
    overlay: {
      errors: true,
      warnings: false
    },
    proxy: {
      "/api": {
        // 最后这个是要换的
        target: "http://xxx.sss.com:80",
        changeOrigin: true,
        pathRewrite: {
            "^/api": ""
        }
      }
    }
  }
})
console.log(box)