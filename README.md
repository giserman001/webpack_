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

   10. babel配置 
      * babel-loader 链接webpack和babel的桥梁   
      * @babel/preset-env: 帮我们转码（es6-es5）的核心。说白了，它就是一大堆babel plugin的集合。babel的一切转码功能都是靠插件完成的。当然，插件要发挥作  用，离不开babel本身的AST抽象能力。也就是babel为插件提供了AST能力，而插件利用该能力，创建/修改AST。
         > 本身babel只能转义es6新语法，对于一些新的es6 api(for..of  map() set() promise() generator....等)无法转义
      * @babel/polyfill 这个包是一个纯运行时的包，不是babel插件。它的作用是直接改写全局变量，从而让运行环境支持经过present-env转码后的代码(新的api)
      @babel/polyfill引入了core-js和regenerator-runtime/runtime两个核心包

      > **在我们设置preset-env的useBuiltIns为false（默认值）时，preset-env不会为我们自动引入polyfill，我们要手动引入@babel/polyfill，并会导致整个core-js和regenerator-runtime/runtime被打包进我们的项目。这时，如果用webpack打包，bundle文件的体积应该是最大的。**

      > **useBuiltIns为entry时，我们手动引入@babel/polyfill，比false好的是，它不会把所有的core-js模块引入，而是只引入targets需要的。虽然引入的模块比直接引入@babel/polyfill少，但总体而言，它还是会引入很多模块。**

      > **使用usage模式，preset-env会自动帮你插入需要的core-js模块，不需要你手动import任何代码。缺点是：babel默认不会检测第三方依赖包代码，知会看当前文件中需要哪些polyfill，所以使用 usage 时，可能会出现引入第三方的代码包未注入模块而引发bug。**

      > ***缺点：直接改写全局变量,污染了全局变量***

      总结：

      写轮子用这种babel配置（不会污染全局变量）：babel-loader + @babel/runtime-corejs2（@babel/runtime-corejs3） + @babel/runtime + @babel/plugin-transform-runtime

      写业务代码babel配置：babel-loader + @babel/preset-env + @babel/polyfill（特定情况下不需要手动引入，主要看@babel/preset-env的选项useBuiltIns的值情况而定）


   11. tree-shaking

