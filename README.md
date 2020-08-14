1. webpack 是一个模块打包器(module bundle)，在初期 webpack 只认识 js 模块，随着 webpack 不断发展他可以打包几乎任意模块（css,png,jpg....）
   > 默认情况下webpack只认识js模块
2. js模块种类：ESmodule AMD CMD CommonJS
3. webpack 安装与运行
    全局安装 npm i webpack webpack-cli -g
    运行： webpack XXXX(文件路径)

    局部安装 npm i webpack webpack-cli -D
    运行： npx(npm 5.2.0开始捆绑) webpack XXXX  
    >这里注意 npx 先去本地node_module里寻找可执行的webpack/bin文件 如果找不到直接去全局找webpack
    webpack.config.js文件名是webpack默认配置文件名字

    ```json
    "scripts": {
        "dev": "webpack"
    },
    ```
    scripts方式运行： npm run dev
    > 这里大家可能有个疑问 为啥不用npx ? 其实这里运行webpack也是先本地寻找webpack/bin可执行文件，然后全局寻找webpack命令
4. webpack-cli作用：使我们在命令行里面正确运行webpack指令
5. webpack有个配置选项mode：设置打包模式 可选值 production（默认 --- js代码压缩）  development（js代码不压缩） 

6. webpack不能识别非js模块，所以要借助loader帮忙
    

