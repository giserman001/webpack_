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


   11. tree-shaking（注意：只支持esModule模块）  去除无用代码   optimization
      > 注意tree-shaking使用时，对于有的模块没有导出内容  只是简单地import  （列如：import '@babel/polyfill',他只是在window上挂载全局的变量和属性。），那样的话，他也会被tree-shaking了,那么如何避免呢，我们只要在package.json文件里添加s属性 "sideEffects": ["@babel/polyfill", "*.css", ....]

      mode: production环境 js已被压缩，开启了tree-shaking 
      mode: development环境 js未被压缩，未开启tree-shaking 

   12. webpack 不同环境配置  webpack-merge   webpack.common.js/webpack.dev.js/webpack.prod.js
      webpack3 中一般会手动设置 DefinePlugin，但是 webpack4 自动帮你设置该插件
      + cross-env 这个模块可以区分环境
      + --mode 环境名字 也可以区分环境 

      ```js
      // 注入业务中区分环境 配合 cross-env这个模块使用
      new Webpack.DefinePlugin({
         'process.env': {
            APP_ENV:JSON.stringify(process.env.NODE_ENV)
         },
      }),
      ```

   13. code-splitting  
      + lodash 挂载全局window下面   ， 并且在webpack里单独打包一个lodash.js文件
         ```js
         import _ from 'lodash'

         window._ = _
         ```
         webpack里面
         ```js
         entry: {
            lodash: './src/lodash.js',
            main: ['./src/index.js']
         }
         ```
         ```js
         async function getComponent() {
            // 异步加载lodash.js-----可以实现懒加载
            const { default: _ } = await import(/* webpackChunkName:"lodash" */ 'lodash')
            console.log(_, 'element')
            var element = document.createElement('div')
            element.innerHTML = _.join(['dell', 'lee'], '_')
            return element
         }
         document.addEventListener('click', () => {
            getComponent().then((element) => {
               document.body.appendChild(element)
            })
         })

         ```

         webpack 在做代码分割时对于引入第三方模块：同步引入（vender-main.js）和异步引入(0.js)分别打包到不同文件里面  业务代码回打包在自己定义的output（main.js）文件里面
         optimization - splitChunks 里面详细配置

         lazy-loading(懒加载--按需加载)两种方式 : import(/* webpackChunkName:"lodash" */ 'lodash')  webpack中的require.ensure()  

         对于chunks理解：不能理解打包前的一个一个模块，它是打包后生成每一个文件就对应一个chunk


   14. 打包分析 preload prefetch   
      生成打包分析文件：  webpack --config ./build/webpack.prod.js --profile --json > compilation-stats.json
      npm: webpack-bundle-analyzer
      其实还有其他方法，webpack官网有说明

      /* webpackPrefetch: true */ 主要文件加载完成之后，带宽空闲时加载代码----预取
      /* webpackPreload: true */ 在当前导航期间可能需要资源 ---- 预加载
      ```js
      import(/* webpackPrefetch: true */ './click').then(({default: func}) => {
         func()
      })
      import(/* webpackPreload: true */ 'ChartingLibrary');
      ```


      webpack在development，开发环境下的默认配置
      ```js
      module.exports = {
         //开发环境下默认启用cache，在内存中对已经构建的部分进行缓存
         //避免其他模块修改，但是该模块未修改时候，重新构建，能够更快的进行增量构建
         //属于空间换时间的做法
         cache: true, 
         output: {
            pathinfo: true //输入代码添加额外的路径注释，提高代码可读性
         },
         devtools: "eval", //sourceMap为eval类型
         plugins: [
            //默认添加NODE_ENV为development
            new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
         ],
         optimization: {
            namedModules: true, //取代插件中的 new webpack.NamedModulesPlugin()
            namedChunks: true
         }
      }
      ```

      production，生产环境下的默认配置
      ```js
      module.exports = {
         performance: {
            hints: 'warning',
            maxAssetSize: 250000, //单文件超过250k，命令行告警
            maxEntrypointSize: 250000, //首次加载文件总和超过250k，命令行告警
         }
         plugins: [
            //默认添加NODE_ENV为production
            new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") })
         ],
         optimization: {
            minimize: true, //取代 new UglifyJsPlugin(/* ... */)
            providedExports: true,
            usedExports: true,
            //识别package.json中的sideEffects以剔除无用的模块，用来做tree-shake
            //依赖于optimization.providedExports和optimization.usedExports
            sideEffects: true,
            //取代 new webpack.optimize.ModuleConcatenationPlugin()
            concatenateModules: true,
            //取代 new webpack.NoEmitOnErrorsPlugin()，编译错误时不打印输出资源。
            noEmitOnErrors: true
         }
      }
      ```

      webpack 公共默认配置
      ```js
      module.exports = {
         context: process.cwd()
         entry: './src',
         output: {
            path: 'dist',
            filename: '[name].js'
         },
         rules: [
            {
               type: "javascript/auto",
               resolve: {}
            },
            {
               test: /\.mjs$/i,
               type: "javascript/esm",
               resolve: {
               mainFields:
               options.target === "web" ||
               options.target === "webworker" ||
               options.target === "electron-renderer"
                  ? ["browser", "main"]
                  : ["main"]
               }
            },
            {
               test: /\.json$/i,
               type: "json"
            },
            {
               test: /\.wasm$/i,
               type: "webassembly/experimental"
            }
         ]
      }
      ```
15. css代码分离 压缩
   MiniCssExtractPlugin： 从js文件中分离
   OptimizeCSSAssetsPlugin： css压缩
   注意点： 在mode: production环境下，默认开启了tree-shaking  那么有可能多import './index.css' 直接干掉（删除）
   此时你需要在package.json中配合 sideEffects字段 做文件过滤
   如： "sideEffects": [
            "*.css",
            "*.scss"
         ],

   高级用法
   + 可以使用optimize . splitchunks . cachegroups将CSS提取到一个CSS文件中
   ```json
      optimization: {
         splitChunks: {
            cacheGroups: {
            styles: {
               name: 'styles',
               test: /\.css$/,
               chunks: 'all',
               enforce: true,
            },
            },
         },
      },
   ```
   + 基于webpack 入口提取CSS：您还可以根据webpack入口的名称提取CSS。如果动态导入路由，但又想根据条目绑定CSS，那么这一点特别有用。这还可以防止使用ExtractTextPlugin时出现的CSS重复问题。
   ```json
   optimization: {
    splitChunks: {
      cacheGroups: {
        fooStyles: {
          name: 'foo',
          test: (m, c, entry = 'foo') =>
            m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true,
        },
        barStyles: {
          name: 'bar',
          test: (m, c, entry = 'bar') =>
            m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
   ```

   16. webpack 与浏览器缓存（Caching）

   我们可以通过hash来防止浏览器缓存： contenthash
   内容变化的chunk在contenthash变化  若文件没有变化 那么contenthash不会变化
   那么contenthash与hash有啥区别呢
   output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].chunk.[contenthash].js',
  }

  runtimeChunk:优化持久化缓存的, runtime 指的是 webpack 的运行环境(具体作用就是模块解析, 加载) 和 模块信息清单, 模块信息清单在每次有模块变更(hash 变更)时都会变更, 所以我们想把这部分代码单独打包出来, 配合后端缓存策略, 这样就不会因为某个模块的变更导致包含模块信息的模块 (通常会被包含在最后一个 bundle 中)缓存失效. optimization.runtimeChunk 就是告诉 webpack 是否要把这部分单独打包出来.

  runtime：包含：在模块交互时，连接模块所需的加载和解析逻辑。包括浏览器中的已加载模块的连接，以及懒加载模块的执行逻辑。
  Manifest：那么，一旦你的应用程序中，形如 index.html 文件、一些 bundle 和各种资源加载到浏览器中，会发生什么？你精心安排的 /src 目录的文件结构现在已经不存在，所以 webpack 如何管理所有模块之间的交互呢？这就是 manifest 数据用途的由来……

  17. shimming 打包兼容处理----垫片----
   + @babel/polyfill 主要为了兼容低版本浏览器
   + // 当我发现有个模块用了$字符串，那么回自动引入jquery这个库
      new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'lodash', // 引用整个lodash
      _join: ['lodash', 'join'] // 只引用lodash里面的join方法
      })

   + 在模块里打印this一般表示当前模块自身对象，并不指向window  （没有配置出来，没找到错误原因）
      需要借助一个loader实现this指向window npm: imports-loader
