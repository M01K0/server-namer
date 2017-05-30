import React, { Component } from 'react';
import { render } from 'react-dom'
import CreateServer from './CreateServer'
import ServerList from './ServerList'

class App extends Component {
  constructor() {
    super()

    this.state = {
      servers: []
    }

    this.refreshData = this.refreshData.bind(this)
  }

  componentWillMount() {
    this.refreshData()
  }

  refreshData() {
    fetch('/store/', {
      method: 'get'
    })
    .then((res) => res.json())
    .then((data) => {
      this.setState({ servers: JSON.parse(data) });
    })
    .catch(function(err) {
      console.log('err', err);
    });
  }

  render() {
    const { servers } = this.state

    return (
      <div className="app">
        <header>
          <div className="container">
            <h2>PARSEC</h2>
          </div>
        </header>
        <div className="main-body">
          <div className="container">
            <CreateServer refreshData={this.refreshData} />
            <ServerList servers={servers} refreshData={this.refreshData} />
          </div>
        </div>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
