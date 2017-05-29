import React, { Component } from 'react';
import { render } from 'react-dom'

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>PARSEC</h1>
        <p>hi world</p>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
