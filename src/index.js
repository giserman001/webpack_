// require("@babel/polyfill");
// import './index.scss'
// import number from './number'
// import counter from './counter'

// counter()
// number()
// console.log(module, 'module')
// if (module.hot) {
//   module.hot.accept('./number', () => {
//     const numbers = document.getElementById('number')
//     numbers && document.body.removeChild(numbers)
//     number()
//   })
// }

const arr = [new Promise(() => {}), new Promise(() => {})]
arr.map((item) => {
  console.log(item)
})
