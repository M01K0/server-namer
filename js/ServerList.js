import React, { Component } from 'react';

class ServerList extends Component {
  constructor() {
    super()

    this.deleteServer = this.deleteServer.bind(this)
  }

  deleteServer(id) {
    fetch(`/store/${id}`, {
      method: 'delete',
    }).then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.props.refreshData()
      })
      .catch(function(err) {
        console.log('err', err)
      })
  }

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
                  <button onClick={() => this.deleteServer(server.id)}>delete</button>
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
