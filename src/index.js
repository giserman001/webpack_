// import _ from 'lodash'
// var element = document.createElement('div')
// element.innerHTML = _.join(['dell', 'lee'], '_')
// document.body.appendChild(element)
console.log(process.env.NODE_ENV)

function getComponent() {
  // 异步加载lodash.js-----可以实现懒加载
  return import(/* webpackChunkName:"lodash" */ 'lodash').then(({ default: _ }) => {
    var element = document.createElement('div')
    element.innerHTML = _.join(['dell', 'lee'], '_')
    return element
  })
}
document.addEventListener('click', () => {
  getComponent().then((element) => {
    document.body.appendChild(element)
  })
})


