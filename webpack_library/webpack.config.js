const path = require('path')
module.exports = {
    mode: 'production',
    entry: './src/index.js',
    externals: ['lodash'], // 忽略这个包，不打包了 ['lodash']
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'library.js',
        library: 'library',
        libraryTarget: 'umd'
    }
}