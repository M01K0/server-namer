import React, { Component } from 'react';

const descriptors = ['gaming', 'cloud', 'parsec', 'testing', 'screen', 'wifi', 'stream', 'keyboard', 'connection', 'aws', 'azure']
const getRanWord = () => descriptors[Math.floor(Math.random() * descriptors.length)]
const getRanDescription = (num, description = '') => {
  if (num === 0) return description
  return getRanDescription(num - 1, `${description} ${getRanWord()}`)
}

class CreateServer extends Component {
  constructor() {
    super()

    this.state = {
      creatingNew: false,
      value: ''
    }

    this.toggleForm = this.toggleForm.bind(this)
    this.getRandom = this.getRandom.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.addNewName = this.addNewName.bind(this)
  }

  toggleForm() {
    this.setState({ creatingNew: !this.state.creatingNew })
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
        console.log('err', err)
      })
  }

  handleInput(event) {
    this.setState({ value: event.target.value })
  }

  addNewName(event) {
    event.preventDefault()

    fetch('/store/', {
      method: 'post',
      body: JSON.stringify({
        name: this.state.value,
        description: getRanDescription(Math.floor(Math.random() * 10))
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then((res) => res.json())
      .then((data) => {
        this.props.refreshData()
        this.setState({ value: '', creatingNew: false })
      })
      .catch(function(err) {
        console.log('err', err)
      })
  }

  render() {
    const { creatingNew, value } = this.state

    return (
      <div className="create-server">
        {
          creatingNew
          ? (
            <div className="flex space-between full-width">
              <form className="flex space-between full-width" onSubmit={this.addNewName}>
                <input
                  autoFocus
                  className="full-width margin-right"
                  type="text"
                  value={value}
                  onChange={this.handleInput} />
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
