import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {states: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(states => this.setState({ states }));
  }

  render() {
    return (
      <div className="App">
        <h1>States</h1>
        {this.state.states.map(state =>
          <div key={state.id}>{state.name}, {state.visits}</div>
        )}
      </div>
    );
  }
}

export default App;
