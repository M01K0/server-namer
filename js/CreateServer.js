import React, { Component } from 'react';

class CreateServer extends Component {
  constructor() {
    super()

    this.state = {
      creatingNew: false,
      value: ''
    }

    this.toggleForm = this.toggleForm.bind(this);
    this.getRandom = this.getRandom.bind(this);
  }

  toggleForm() {
    this.setState({
      creatingNew: !this.state.creatingNew
    })
  }

  getRandom() {
    fetch('/server-name/', {
      method: 'get'
    }).then((res) => res.json())
      .then((data) => {
        this.setState({
          value: data.name
        })
      })
      .catch(function(err) {
        console.log('err', err);
      });
  }

  render() {
    const { creatingNew, value } = this.state

    return (
      <div className="create-server">
        {
          creatingNew
          ? (
            <div className="flex space-between full-width">
              <form className="flex space-between full-width">
                <input className="full-width margin-right" type="text" value={value}/>
                <button className="margin-right">Add</button>
              </form>
              <button onClick={this.getRandom} className="margin-right">Randomize</button>
              <button onClick={this.toggleForm}>Cancel</button>
            </div>
          )
          : <button onClick={this.toggleForm}>+ New Server</button>
        }

      </div>
    )
  }
}

export default CreateServer
