# webpack4 基本配置

### 基本配置

1. webpack 是一个模块打包器(module bundle)，在初期 webpack 只认识 js 模块，随着 webpack 不断发展他可以打包几乎任意模块（css,png,jpg....）
   > 默认情况下 webpack 只认识 js 模块
2. js 模块种类：ESmodule AMD CMD CommonJS
3. webpack 安装与运行
   全局安装 npm i webpack webpack-cli -g
   运行： webpack XXXX(文件路径)

   局部安装 npm i webpack webpack-cli -D
   运行： npx(npm 5.2.0 开始捆绑) webpack XXXX

   > 这里注意 npx 先去本地 node_module 里寻找可执行的 webpack/bin 文件 如果找不到直接去全局找 webpack
   > webpack.config.js 文件名是 webpack 默认配置文件名字

   ```json
   "scripts": {
       "dev": "webpack"
   },
   ```

   scripts 方式运行： npm run dev

   > 这里大家可能有个疑问 为啥不用 npx ? 其实这里运行 webpack 也是先本地寻找 webpack/bin 可执行文件，然后全局寻找 webpack 命令

4. webpack-cli 作用：使我们在命令行里面正确运行 webpack 指令
5. webpack 有个配置选项 mode：设置打包模式 可选值 production（默认 --- js 代码压缩） development（js 代码不压缩）

6. webpack 不能识别非 js 模块，所以要借助 loader 帮忙

7. plugins 在 webpack 运行到某一个时刻，会帮你做一些事情 ----生命周期有点像
   clean-webpack-plugin html-webpack-plugin
   
8. sourcemap: 打包后代码与源代码之间的一个映射关系，这样很容易帮我们调试源代码（准确定位源代码 bug 出现的位置）

9. HMR 在配置时候有两种方式

   - webpack-dev-server + new webpack.HotModuleReplacementPlugin()
   - 使用 webpack-dev-middleware + webpack-hot-middleware + new webpack.HotModuleReplacementPlugin() + express 自定义 express 服务器

   这两种方式都有个缺点：对于 js 无法实现 HMR 需要手动实现：
   如果已经通过 HotModuleReplacementPlugin 启用了模块热替换(Hot Module Replacement)，则它的接口将被暴露在 module.hot 属性下面。通常，用户先要检查这个接口是否可访问，然后再开始使用它。举个例子，你可以这样 accept 一个更新的模块：
   ```js
   if (module.hot) {
     module.hot.accept('./library.js', function () {
       // 使用更新过的 library 模块执行某些操作...
     })
   }
   ```
