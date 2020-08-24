// import _ from 'lodash'
// async function getComponent() {
//   // 异步加载lodash.js-----可以实现懒加载
//   const { default: _ } = await import(/* webpackChunkName:"lodash" */ 'lodash')
//   console.log(_, 'element')
//   var element = document.createElement('div')
//   element.innerHTML = _.join(['dell', 'lee'], '_')
//   return element
// }
// document.addEventListener('click', () => {
//   getComponent().then((element) => {
//     document.body.appendChild(element)
//   })
// })

document.addEventListener('click', () => {
  import('./click').then(({default: func}) => {
    func()
  })
})


