// ESmodule、 commonJS、 CMD、 AMD 等规范
// webpack 模块打包器
var avatar = require('./images/avatar.jpg')
console.log(avatar, 'avatar')
const img = new Image()
img.src = avatar.default
document.getElementById('app').appendChild(img)