import React, { Component } from 'react';

class ServerList extends Component {
  render() {
    const { servers } = this.props

    return (
      <ul className="server-list">
        {
          servers.map((server) => {
            return (
              <li className="server-item flex space-between" key={server.id}>
                <div>
                  <h5>{server.name}</h5>
                  <p>server description</p>
                </div>
                <div>
                  <button>delete</button>
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }
}

export default ServerList
