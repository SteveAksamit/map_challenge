import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {states: []}

  componentDidMount() {
    fetch('/states')
      .then(res => res.json())
      .then(states => {
        const cleanedStates = this.cleanData(states)
        this.setState({ states: cleanedStates });
      })
  };

  cleanData(states = []){
    const aggregateData = {}
    states.map((state, i) =>{
      const stateCode = state.id;
      if(Object.keys(aggregateData).indexOf(stateCode) === -1){
        aggregateData[stateCode] = {
          name: state.name,
          visits: state.visits,
        }
      }
    })
    console.log(aggregateData)
    return aggregateData;
  }

  render() {
    return (
      <div className="App">
        <h1>States</h1>

      </div>
    );
  }
}

export default App;
