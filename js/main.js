import React, { Component } from 'react';
import { render } from 'react-dom'

class App extends Component {
  render() {
    return (
      <div className="app">
        <header>
          <div className="container">
            <h2>PARSEC</h2>
          </div>
        </header>
        <div className="main-body">
          <div className="container">
            <ul className="server-list">
              <li className="server-item">
                <h5>Server Name</h5>
                <p>server description</p>
              </li>

              <li className="server-item">
                <h5>Server Name</h5>
                <p>server description</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
