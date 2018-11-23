var path = require('path')

module.exports = {
  dev: {
    //项目开发html模板
    indexHtml: 'index.template.html',
    // 端口号
    port: 4200,
    // 本地服务根目录
    serverRoot: './src',
    // 第三方库使用（如：JQ）
    VENDOR: [
      'jquery'
    ]
  },
  build: {
    author: 'LIUYA',
    // 打包到指定文件夹下面
    outputProjectPath: './build',
    //生产环境 内再次打包需要删除的选项
    cleanList: [path.resolve(__dirname, '../build')]
  }
}