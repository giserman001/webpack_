import React from 'react'
import ReactDOM from 'react-dom'
import $ from './util/index'

const App = () => {
    console.log($)
  return (
    <div>
      <div>entry2</div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))