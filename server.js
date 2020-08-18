const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleWare = require("webpack-hot-middleware")
const webpackConfig = require('./webpack.config.js')

// webpack编译器
const compile = webpack(webpackConfig)

webpackConfig.entry.main.unshift("webpack-hot-middleware/client?reload=true?http://localhost:3030/"); 

// 启动服务器

const app = express()

app.use(webpackDevMiddleware(compile, {
    publicPath: webpackConfig.output.publicPath
}))
app.use(webpackHotMiddleWare(compile, {
    heartbeat: 2000
}));

// 监听端口
app.listen(3030, () => {
  console.log('server is running 3030')
})
