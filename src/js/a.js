var sub = require('./b')
var app  = document.createElement('div')
app.innerHTML = '<h1>Hello World</h1>'
app.appendChild(sub())
module.exports = app
