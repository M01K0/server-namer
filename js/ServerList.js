import React, { Component } from 'react';

class ServerList extends Component {
  componentWillMount() {
    fetch('/store/', {
      method: 'get'
    })
    .then((res) => {
      console.log(res);
      return res.json()
    })
    .then((data) => {
      console.log(data);
    })
    .catch(function(err) {
      console.log('err', err);
    });
  }

  render() {
    return (
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
    )
  }
}

export default ServerList
