import React, { Component } from 'react';
import { render } from 'react-dom'
import CreateServer from './CreateServer'
import ServerList from './ServerList'

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
            <CreateServer />
            <ServerList />
          </div>
        </div>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
